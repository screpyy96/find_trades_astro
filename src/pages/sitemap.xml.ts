import { trades } from '../data/trades.js';
import { cities } from '../data/cities.js';
import { categories } from '../data/categories.js';
import { getCollection } from 'astro:content';

// Prerender this page at build time instead of on every request
export const prerender = true;

function xmlEscape(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function ensureTrailingSlash(url: string): string {
  return url.endsWith('/') ? url : `${url}/`;
}

const baseUrl = 'https://www.findtrades.app';

// Get all blog posts
const blogPosts = await getCollection('blog', ({ data }) => {
  return data.publishDate <= new Date();
});

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${ensureTrailingSlash(baseUrl)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Main Pages -->
  <url>
    <loc>${ensureTrailingSlash(baseUrl)}services/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${ensureTrailingSlash(baseUrl)}blog/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${ensureTrailingSlash(baseUrl)}about/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <url>
    <loc>${ensureTrailingSlash(baseUrl)}contact/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>

  <!-- Tradesmen Directory -->
  <url>
    <loc>${ensureTrailingSlash(baseUrl)}tradesmen/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Companies Directory -->
  <url>
    <loc>${ensureTrailingSlash(baseUrl)}companies/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Legal & Info Pages -->
  <url>
    <loc>${ensureTrailingSlash(baseUrl)}faq/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${ensureTrailingSlash(baseUrl)}privacy/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${ensureTrailingSlash(baseUrl)}terms/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${ensureTrailingSlash(baseUrl)}gdpr/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${ensureTrailingSlash(baseUrl)}support/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>

  <!-- Blog Posts -->
  ${blogPosts.map(post => `
  <url>
    <loc>${ensureTrailingSlash(baseUrl)}blog/${post.slug}/</loc>
    <lastmod>${post.data.publishDate.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${post.data.featured ? '0.8' : '0.7'}</priority>
  </url>`).join('')}

  <!-- Service Pages -->
  ${trades.map(trade => `
  <url>
    <loc>${ensureTrailingSlash(baseUrl)}services/${xmlEscape(trade.slug)}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}

  <!-- Service Category Pages -->
  ${categories.map(cat => `
  <url>
    <loc>${ensureTrailingSlash(baseUrl)}services/${xmlEscape(cat.slug)}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}

  <!-- Service City Pages — London first (highest search volume) -->
  ${trades.map(trade => `
  <url>
    <loc>${ensureTrailingSlash(baseUrl)}services/${xmlEscape(trade.slug)}/london/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}

  <!-- Service City Pages — Other top cities -->
  ${trades.flatMap(trade => 
    cities.slice(1, 10).filter(city => city.slug !== 'london').map(city => `
  <url>
    <loc>${ensureTrailingSlash(baseUrl)}services/${xmlEscape(trade.slug)}/${xmlEscape(city.slug)}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')
  ).join('')}
</urlset>`;

export function GET() {
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
