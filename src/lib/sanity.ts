import { createClient } from '@sanity/client';
import type { PortableTextBlock } from '@portabletext/types';

const sanityClient = createClient({
  projectId: '7094dn36',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

export interface ServicePage {
  _id: string;
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

export async function getAllServicePages(): Promise<ServicePage[]> {
  const query = `*[_type == "servicePage" && isPublished == true] | order(publishedAt desc) {
    _id,
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
    metaDescription,
    seoKeywords,
    content,
    faqSection,
    priceRanges,
    localTips,
    relatedServices
  }`;
  
  return sanityClient.fetch(query);
}

export async function getServicePageBySlug(slug: string): Promise<ServicePage | null> {
  const query = `*[_type == "servicePage" && slug.current == $slug && isPublished == true][0] {
    _id,
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
    metaDescription,
    seoKeywords,
    content,
    faqSection,
    priceRanges,
    localTips,
    relatedServices
  }`;
  
  return sanityClient.fetch(query, { slug });
}

export async function getServiceCityPage(tradeSlug: string, citySlug: string): Promise<ServicePage | null> {
  // Normalize slugs to lowercase for case-insensitive matching
  const normalizedTradeSlug = tradeSlug.toLowerCase();
  const normalizedCitySlug = citySlug.toLowerCase();
  
  // First try: Match by tradeSlug and citySlug fields
  const queryByFields = `*[_type == "servicePage" && lower(tradeSlug) == $tradeSlug && lower(citySlug) == $citySlug && isPublished == true][0] {
    _id,
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
    metaDescription,
    seoKeywords,
    content,
    faqSection,
    priceRanges,
    localTips,
    relatedServices
  }`;
  
  let result = await sanityClient.fetch(queryByFields, { 
    tradeSlug: normalizedTradeSlug, 
    citySlug: normalizedCitySlug 
  });
  
  // Second try: If not found, try matching by slug pattern (for legacy data)
  // Pattern: slug contains both tradeSlug and citySlug
  if (!result) {
    const queryBySlugPattern = `*[_type == "servicePage" && slug.current match "*" + $tradeSlug + "*" && isPublished == true] {
      _id,
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
      metaDescription,
      seoKeywords,
      content,
      faqSection,
      priceRanges,
      localTips,
      relatedServices
    }`;
    
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
      }) || results[0]; // Fallback to first result if no city match
    }
  }
  
  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 Sanity getServiceCityPage:');
    console.log('  Input tradeSlug:', tradeSlug, '→', normalizedTradeSlug);
    console.log('  Input citySlug:', citySlug, '→', normalizedCitySlug);
    console.log('  Result:', result ? '✅ Found' : '❌ Not found');
    if (result) {
      console.log('  Found slug:', result.slug?.current);
      console.log('  Found tradeSlug:', result.tradeSlug);
      console.log('  Found citySlug:', result.citySlug);
    }
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
  const query = `*[_type == "blogPost" && slug.current == $slug && publishedAt <= $now][0] {
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
