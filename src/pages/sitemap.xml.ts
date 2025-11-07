import { romanianCities } from '../lib/romanian-cities.js';
import { trades } from '../data/trades.js';

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

export async function GET() {
  const baseUrl = 'https://www.meseriaslocal.ro';
  const currentDate = new Date().toISOString();
  const urls: string[] = [];

  // ========================================
  // 1️⃣ STATIC PAGES
  // ========================================
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'hourly' },
    { url: '/servicii', priority: '0.95', changefreq: 'daily' },
    { url: '/meseriasi', priority: '0.9', changefreq: 'daily' },
    { url: '/solicitari', priority: '0.9', changefreq: 'daily' },
    { url: '/blog', priority: '0.8', changefreq: 'daily' },
  ];

  staticPages.forEach(page => {
    urls.push(`  <url>
    <loc>${xmlEscape(`${baseUrl}${page.url}`)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
  });

  // ========================================
  // 2️⃣ SERVICE CATEGORIES
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

      urls.push(`  <url>
    <loc>${xmlEscape(`${baseUrl}/servicii/${categorySlug}`)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`);
    });

    // ========================================
    // 3️⃣ SERVICE PAGES (without city)
    // ========================================
    trades.forEach(trade => {
      if (!trade.category || !trade.category.trim()) return;

      const categorySlug = slugify(trade.category).toLowerCase();
      const slugToUse = trade.slug && trade.slug.trim() ? trade.slug : slugify(trade.name);
      const tradeSlug = slugToUse.toLowerCase();

      if (!categorySlug || !tradeSlug) return;

      urls.push(`  <url>
    <loc>${xmlEscape(`${baseUrl}/servicii/${categorySlug}/${tradeSlug}`)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>`);
    });

    // ========================================
    // 4️⃣ SERVICE + CITY COMBINATIONS (Top 100 cities)
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

        const url = `${baseUrl}/servicii/${categorySlug}/${tradeSlug}/${citySlug}`;
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
      'Cache-Control': 'public, max-age=1800',
      'X-Robots-Tag': 'noindex',
    },
  });
}
