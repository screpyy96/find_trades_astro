import { romanianCities } from '../lib/romanian-cities.js';
import { trades } from '../data/trades.js';

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

  // Service + City combinations (Top 50 cities)
  if (trades && trades.length > 0) {
    const priorityCities = romanianCities.slice(0, 50);
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
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>`);
      });
    });
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
