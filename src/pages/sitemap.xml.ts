import { romanianCities } from '../lib/romanian-cities.js';
import { trades } from '../data/trades.js';
import { createClient } from '@sanity/client';
import groq from 'groq';

type SanityBlogPost = {
  slug: string;
  updated?: string | null;
};

type SanityBlogCategory = {
  slug: string;
  _updatedAt?: string | null;
};

type SanityBlogAuthor = {
  slug: string;
  _updatedAt?: string | null;
};

const sanityClient = createClient({
  projectId: '7094dn36',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-01-01',
});

// Prerender this page at build time instead of on every request
export const prerender = true;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function xmlEscape(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function ensureTrailingSlash(url: string): string {
  const normalized = url.endsWith('/') ? url : `${url}/`;
  return normalized.replace(/([^:]\/+)\/+/g, '$1/');
}

export async function GET() {
  const baseUrl = 'https://www.meseriaslocal.ro';
  const currentDate = new Date().toISOString();
  const urls: string[] = [];

  // ========================================
  // 0️⃣ FETCH DYNAMIC CONTENT FROM SANITY
  // ========================================
  const [blogPosts, blogCategories, blogAuthors] = await Promise.all([
    sanityClient.fetch<SanityBlogPost[]>(
      groq`*[_type == "blogPost" && defined(slug.current) && publishedAt < now()]|order(publishedAt desc){
        "slug": slug.current,
        "updated": coalesce(_updatedAt, publishedAt)
      }`
    ),
    sanityClient.fetch<SanityBlogCategory[]>(
      groq`*[_type == "blogCategory" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
    ),
    sanityClient.fetch<SanityBlogAuthor[]>(
      groq`*[_type == "blogAuthor" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
    ),
  ]);

  // ========================================
  // 1️⃣ STATIC PAGES
  // ========================================
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'hourly' },
    { url: '/servicii/', priority: '0.95', changefreq: 'daily' },
    { url: '/blog/', priority: '0.8', changefreq: 'daily' },
  ];

  staticPages.forEach(page => {
    const loc = ensureTrailingSlash(`${baseUrl}${page.url}`);
    urls.push(`  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
  });

  // ========================================
  // 2️⃣ BLOG POSTS
  // ========================================
  blogPosts
    ?.filter(post => post?.slug)
    .forEach(post => {
      const lastMod = post.updated ? new Date(post.updated).toISOString() : currentDate;
      const loc = ensureTrailingSlash(`${baseUrl}/blog/${post.slug}`);
      urls.push(`  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
    });

  blogCategories
    ?.filter(category => category?.slug)
    .forEach(category => {
      const lastMod = category._updatedAt ? new Date(category._updatedAt).toISOString() : currentDate;
      const loc = ensureTrailingSlash(`${baseUrl}/blog/categorie/${category.slug}`);
      urls.push(`  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`);
    });

  blogAuthors
    ?.filter(author => author?.slug)
    .forEach(author => {
      const lastMod = author._updatedAt ? new Date(author._updatedAt).toISOString() : currentDate;
      const loc = ensureTrailingSlash(`${baseUrl}/blog/autor/${author.slug}`);
      urls.push(`  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`);
    });

  // ========================================
  // 3️⃣ SERVICE CATEGORIES
  // ========================================
  if (trades && trades.length > 0) {
    const categories = Array.from(
      new Set(
        trades
          .map(trade => trade.category)
          .filter((category): category is string => Boolean(category))
      )
    );

    categories.forEach(category => {
      if (!category || !category.trim()) return;
      const categorySlug = slugify(category).toLowerCase();
      if (!categorySlug) return;

      const loc = ensureTrailingSlash(`${baseUrl}/servicii/${categorySlug}`);
      urls.push(`  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`);
    });

    // ========================================
    // 4️⃣ SERVICE PAGES (without city)
    // ========================================
    trades.forEach(trade => {
      if (!trade.category || !trade.category.trim()) return;

      const categorySlug = slugify(trade.category).toLowerCase();
      const slugToUse = trade.slug && trade.slug.trim() ? trade.slug : slugify(trade.name);
      const tradeSlug = slugToUse.toLowerCase();

      if (!categorySlug || !tradeSlug) return;

      const loc = ensureTrailingSlash(`${baseUrl}/servicii/${categorySlug}/${tradeSlug}`);
      urls.push(`  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>`);
    });

    // ========================================
    // 5️⃣ SERVICE + CITY COMBINATIONS (Top 100 cities)
    // ========================================
    const priorityCities = romanianCities.slice(0, 100);
    const seenUrls = new Set<string>();

    trades.forEach(trade => {
      if (!trade.category || !trade.category.trim()) return;

      const categorySlug = slugify(trade.category).toLowerCase();
      const slugToUse = trade.slug && trade.slug.trim() ? trade.slug : slugify(trade.name);
      const tradeSlug = slugToUse.toLowerCase();

      if (!categorySlug || !tradeSlug) return;

      priorityCities.forEach((city: string) => {
        const citySlug = slugify(city).toLowerCase();
        if (!citySlug) return;

        const url = ensureTrailingSlash(`${baseUrl}/servicii/${categorySlug}/${tradeSlug}/${citySlug}`);
        if (seenUrls.has(url)) return;
        seenUrls.add(url);

        urls.push(`  <url>
    <loc>${xmlEscape(url)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`);
      });
    });
  }

  // ========================================
  // 5️⃣ GENERATE SITEMAP
  // ========================================
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
      'X-Robots-Tag': 'noindex',
    },
  });
}
