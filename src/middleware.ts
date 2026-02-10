import { defineMiddleware } from 'astro:middleware';
import { trades } from './data/trades';

/**
 * Middleware to return 410 Gone BEFORE Astro's trailingSlash 308 redirect.
 * 
 * Problem: Astro's trailingSlash: 'always' sends 308 before our route logic
 * can return 410 for dead pages. Google sees 308, not 410.
 * 
 * Solution: Check if the service slug exists in our trades data. If not,
 * return 410 immediately — no 308 redirect, no DB query needed.
 */

// Build a Set of valid trade slugs for O(1) lookup
const VALID_TRADE_SLUGS = new Set(trades.map(t => t.slug));

// Generate category slug same way as the app does
function generateCategorySlug(category: string): string {
  return category.toLowerCase()
    .replace(/\s+&\s+/g, '-')
    .replace(/&/g, '')
    .replace(/\s+/g, '-')
    .replace(/ș/g, 's')
    .replace(/ț/g, 't')
    .replace(/ă/g, 'a')
    .replace(/â/g, 'a')
    .replace(/î/g, 'i');
}

// Build a Set of valid category slugs
const VALID_CATEGORY_SLUGS = new Set(
  trades.map(t => generateCategorySlug(t.category))
);

const GONE_410_HTML = `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>410 - Pagină ștearsă | Meserias Local</title>
  <meta name="robots" content="noindex, nofollow">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(180deg, #1a1d2e 0%, #252a3d 100%);
      min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px;
    }
    .container { text-align: center; max-width: 500px; }
    .code { font-size: 120px; font-weight: bold; color: #f59e0b; line-height: 1; margin-bottom: 20px; }
    h1 { color: white; font-size: 24px; margin-bottom: 16px; }
    p { color: #94a3b8; font-size: 16px; margin-bottom: 32px; line-height: 1.6; }
    .btn {
      display: inline-block; padding: 14px 28px;
      background: linear-gradient(to right, #f59e0b, #ea580c);
      color: white; text-decoration: none; border-radius: 12px; font-weight: 600;
    }
    .links { margin-top: 24px; display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    .links a { color: #60a5fa; text-decoration: none; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="code">410</div>
    <h1>Această pagină nu mai există</h1>
    <p>Pagina pe care o căutai a fost ștearsă permanent. Te invităm să explorezi serviciile noastre.</p>
    <a href="/" class="btn">Mergi la pagina principală</a>
    <div class="links">
      <a href="/servicii/">Services</a>
      <a href="/tradesmen/">Tradesmen</a>
      <a href="/blog/">Blog</a>
    </div>
  </div>
</body>
</html>`;

function return410() {
  return new Response(GONE_410_HTML, {
    status: 410,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

export const onRequest = defineMiddleware(async ({ request }, next) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  // Normalize: strip trailing slash for matching
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

  // 1. Service/city pages: /servicii/{categorie}/{serviciu}/{oras}
  //    If the service slug doesn't exist in trades, return 410 immediately
  const serviceCityMatch = normalized.match(/^\/servicii\/([^/]+)\/([^/]+)\/([^/]+)$/);
  if (serviceCityMatch) {
    const [, categorie, serviciu] = serviceCityMatch;
    if (!VALID_TRADE_SLUGS.has(serviciu)) {
      return return410();
    }
    // Also check if category is valid
    if (!VALID_CATEGORY_SLUGS.has(categorie)) {
      return return410();
    }
  }

  // 2. Service pages without city: /servicii/{categorie}/{serviciu}
  //    Same check — if trade slug is invalid, 410
  const serviceMatch = normalized.match(/^\/servicii\/([^/]+)\/([^/]+)$/);
  if (serviceMatch) {
    const [, categorie, serviciu] = serviceMatch;
    if (!VALID_TRADE_SLUGS.has(serviciu)) {
      return return410();
    }
    if (!VALID_CATEGORY_SLUGS.has(categorie)) {
      return return410();
    }
  }

  // 3. Category pages: /servicii/{categorie}
  //    If category doesn't exist, 410
  const categoryMatch = normalized.match(/^\/servicii\/([^/]+)$/);
  if (categoryMatch) {
    const [, categorie] = categoryMatch;
    if (!VALID_CATEGORY_SLUGS.has(categorie)) {
      return return410();
    }
  }

  // 4. URLs with junk query params Google crawls
  if (url.search.includes('search_term_string') || url.search.includes('%7Bsearch_term_string%7D')) {
    return return410();
  }

  // 5. Old blog URLs with Romanian diacritics
  if (pathname.startsWith('/blog/')) {
    try {
      const decoded = decodeURIComponent(pathname);
      if (/[ăîâșțĂÎÂȘȚ]/.test(decoded)) {
        return return410();
      }
    } catch {
      return return410();
    }
  }

  // 6. Service URLs with encoded spaces or uppercase (old invalid format)
  if (pathname.startsWith('/servicii/')) {
    try {
      const decoded = decodeURIComponent(pathname);
      const pathAfterServices = decoded.replace(/^\/servicii\//, '');
      if (/[A-Z]/.test(pathAfterServices) || /\s/.test(pathAfterServices)) {
        return return410();
      }
    } catch {
      return return410();
    }
  }

  return next();
});
