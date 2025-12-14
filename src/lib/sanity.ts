import { createClient } from '@sanity/client';
import type { PortableTextBlock } from '@portabletext/types';

const sanityClient = createClient({
  projectId: '7094dn36',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

export interface ServicePage {
  _id: string;
  _type?: string;
  title: string;
  slug: { current: string };
  tradeSlug: string;
  citySlug: string;
  tradeName?: string;
  cityName?: string;
  categoryName?: string;
  categorySlug?: string;
  isPublished: boolean;
  publishedAt?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  seoTitle?: string;
  seoDescription?: string;
  metaDescription?: string;
  seoKeywords?: string[];
  content?: PortableTextBlock[];
  faqSection?: Array<{
    question: string;
    answer: string;
  }>;
  priceRanges?: Array<{
    service: string;
    minPrice: number;
    maxPrice: number;
  }>;
  localTips?: Array<{
    title: string;
    description: string;
  }>;
  relatedServices?: Array<{
    serviceName: string;
    serviceSlug: string;
  }>;
  schema?: any; // JSON-LD schema override
}

const servicePageProjection = `{
  _id,
  _type,
  title,
  slug,
  tradeSlug,
  citySlug,
  tradeName,
  cityName,
  categoryName,
  categorySlug,
  isPublished,
  publishedAt,
  heroTitle,
  heroSubtitle,
  heroDescription,
  seoTitle,
  seoDescription,
  metaDescription,
  seoKeywords,
  content,
  faqSection,
  priceRanges,
  localTips,
  relatedServices
}`;

export async function getAllServicePages(): Promise<ServicePage[]> {
  const query = `*[_type == "servicePage" && isPublished == true] | order(publishedAt desc) ${servicePageProjection}`;
  
  return sanityClient.fetch(query);
}

export async function getServicePageBySlug(slug: string): Promise<ServicePage | null> {
  const query = `*[_type == "servicePage" && slug.current == $slug && isPublished == true][0] ${servicePageProjection}`;
  
  return sanityClient.fetch(query, { slug });
}

export async function getServiceCityPage(tradeSlug: string, citySlug: string): Promise<ServicePage | null> {
  // Normalize slugs to lowercase for case-insensitive matching
  const normalizedTradeSlug = tradeSlug.toLowerCase();
  const normalizedCitySlug = citySlug.toLowerCase();
  
  if (import.meta.env.DEV) {
    console.log('🔍 getServiceCityPage Debug:');
    console.log('  tradeSlug:', tradeSlug, '-> normalized:', normalizedTradeSlug);
    console.log('  citySlug:', citySlug, '-> normalized:', normalizedCitySlug);
  }
  
  // First try: Match by tradeSlug and citySlug fields
  const queryByFields = `*[
    _type == "servicePage" &&
    lower(tradeSlug) == $tradeSlug &&
    lower(citySlug) == $citySlug &&
    isPublished == true
  ] | order(coalesce(publishedAt, _updatedAt) desc) [0] ${servicePageProjection}`;
  
  let result = await sanityClient.fetch(queryByFields, { 
    tradeSlug: normalizedTradeSlug, 
    citySlug: normalizedCitySlug 
  });
  
  if (import.meta.env.DEV) {
    console.log('  First query result:', result);
  }
  
  // Second try: If not found, try matching by slug pattern (for legacy data)
  // Pattern: slug contains both tradeSlug and citySlug
  if (!result) {
    const queryBySlugPattern = `*[
      _type == "servicePage" &&
      slug.current match "*" + $tradeSlug + "*" &&
      isPublished == true
    ] ${servicePageProjection}`;
    
    const results = await sanityClient.fetch(queryBySlugPattern, { 
      tradeSlug: normalizedTradeSlug
    });
    
    // Filter results to find one that matches citySlug (if citySlug field exists)
    // or matches city in slug pattern
    if (results && results.length > 0) {
      result = results.find((r: any) => {
        // Check if citySlug field matches
        if (r.citySlug && r.citySlug.toLowerCase() === normalizedCitySlug) {
          return true;
        }
        // Check if slug contains city
        if (r.slug?.current && r.slug.current.toLowerCase().includes(normalizedCitySlug)) {
          return true;
        }
        return false;
      });
      // Don't fallback to first result - return null if no exact match
    }
  }
  
  // Third try: fallback to general (no-city) content ONLY if it's truly general
  // This allows city pages to inherit general service content when no city-specific content exists
  if (!result) {
    const generalPage = await fetchGeneralServicePage(normalizedTradeSlug);
    
    // Only use general page if it truly has no citySlug (is a general page)
    if (generalPage && !generalPage.citySlug) {
      result = generalPage;
    }
  }
  
  if (import.meta.env.DEV) {
    console.log('  Final result being returned:', result);
    console.log('  seoTitle in result:', result?.seoTitle);
    console.log('  seoDescription in result:', result?.seoDescription);
    
    // Debug: Check all zugravi pages in Sanity
    if (normalizedTradeSlug.includes('zugrav')) {
      console.log('🔍 Checking all zugravi pages in Sanity...');
      const allZugraviQuery = `*[_type == "servicePage" && lower(tradeSlug) match "*zugrav*" && isPublished == true] {
        _id, title, tradeSlug, citySlug, seoTitle, seoDescription, heroTitle
      }`;
      const allZugravi = await sanityClient.fetch(allZugraviQuery);
      console.log('  All zugravi pages:', allZugravi);
    }
  }
  
  return result;
}

async function fetchGeneralServicePage(normalizedTradeSlug: string) {
  const queryGeneralServicePage = `*[
    lower(tradeSlug) == $tradeSlug &&
    isPublished == true &&
    (
      (_type == "servicePage" && (!defined(citySlug) || citySlug == "")) ||
      _type == "servicePageNoCity"
    )
  ] | order(coalesce(publishedAt, _updatedAt) desc) [0] ${servicePageProjection}`;
  
  return sanityClient.fetch(queryGeneralServicePage, { tradeSlug: normalizedTradeSlug });
}

// Get service page content without city (for service overview pages)
// Returns a page for this service without a specific city (general service page)
export async function getServicePage(tradeSlug: string): Promise<ServicePage | null> {
  const normalizedTradeSlug = tradeSlug.toLowerCase();
  
  if (import.meta.env.DEV) {
    console.log('🔍 getServicePage Debug:');
    console.log('  tradeSlug:', tradeSlug, '-> normalized:', normalizedTradeSlug);
  }
  
  // ONLY look for general pages (without citySlug)
  // Do NOT fallback to city-specific pages to avoid content mixing
  const result = await fetchGeneralServicePage(normalizedTradeSlug);
  
  if (import.meta.env.DEV) {
    console.log('  fetchGeneralServicePage result:', result);
    console.log('  seoTitle in result:', result?.seoTitle);
    console.log('  seoDescription in result:', result?.seoDescription);
    
    // Debug: Check all service pages in Sanity
    console.log('🔍 Checking all service pages in Sanity...');
    const allServicePagesQuery = `*[_type == "servicePage" && isPublished == true] {
      _id, title, tradeSlug, citySlug, seoTitle, seoDescription, heroTitle
    }`;
    const allServicePages = await sanityClient.fetch(allServicePagesQuery);
    console.log('  All service pages:', allServicePages);
  }
  
  return result;
}

// Blog Types
export interface BlogPost {
  _id: string;
  _type: 'blogPost';
  title: string;
  slug: { current: string };
  excerpt: string;
  content: PortableTextBlock[];
  featuredImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
  author?: {
    name: string;
    avatar?: {
      asset: {
        _ref: string;
      };
    };
    bio?: string;
    socialLinks?: {
      twitter?: string;
      linkedin?: string;
      website?: string;
    };
  };
  category?: {
    name: string;
    slug: { current: string };
  };
  tags?: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime?: number;
  isFeatured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export interface BlogCategory {
  _id: string;
  _type: 'blogCategory';
  name: string;
  slug: { current: string };
  description: string;
  postCount?: number;
}

// Blog Queries
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost" && publishedAt <= $now] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    featuredImage,
    "author": author->{name, avatar},
    "category": category->{name, slug},
    tags,
    publishedAt,
    updatedAt,
    readingTime,
    isFeatured,
    metaTitle,
    metaDescription
  }`;
  
  return sanityClient.fetch(query, { now: new Date().toISOString() });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `*[
    _type == "blogPost" &&
    slug.current == $slug &&
    publishedAt <= $now &&
    !(_id in path("drafts.**"))
  ] | order(coalesce(updatedAt, _updatedAt) desc)[0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    featuredImage,
    "author": author->{name, avatar, bio, socialLinks},
    "category": category->{name, slug},
    tags,
    publishedAt,
    updatedAt,
    readingTime,
    isFeatured,
    metaTitle,
    metaDescription
  }`;
  
  return sanityClient.fetch(query, { slug, now: new Date().toISOString() });
}

export async function getFeaturedBlogPosts(limit = 3): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost" && isFeatured == true && publishedAt <= $now] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    "author": author->{name, avatar},
    "category": category->{name, slug},
    publishedAt,
    readingTime
  }`;
  
  return sanityClient.fetch(query, { now: new Date().toISOString(), limit });
}

export async function getAllBlogCategories(): Promise<BlogCategory[]> {
  const query = `*[_type == "blogCategory"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    "postCount": count(*[_type == "blogPost" && references(^._id) && publishedAt <= $now])
  }`;
  
  return sanityClient.fetch(query, { now: new Date().toISOString() });
}

export async function getBlogCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  const query = `*[_type == "blogCategory" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    "postCount": count(*[_type == "blogPost" && references(^._id) && publishedAt <= $now])
  }`;

  return sanityClient.fetch(query, { slug, now: new Date().toISOString() });
}

export async function getBlogPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost" && category->slug.current == $categorySlug && publishedAt <= $now] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    "author": author->{name, avatar},
    "category": category->{name, slug},
    publishedAt,
    readingTime
  }`;
  
  return sanityClient.fetch(query, { categorySlug, now: new Date().toISOString() });
}

// Helper to get image URL
export function getImageUrl(image: any): string | null {
  if (!image || !image.asset || !image.asset._ref) {
    return null;
  }
  
  const ref = image.asset._ref;
  const [, id, dimensions, format] = ref.split('-');
  
  return `https://cdn.sanity.io/images/7094dn36/production/${id}-${dimensions}.${format}`;
}

export { sanityClient };
