import { validateEnvironment } from '../lib/env-validation';

// Use environment variables from .env
const envConfig = validateEnvironment();
const WEB_URL = envConfig.config.web.url;

export async function GET() {
  const robotsTxt = `
# FindTrades - Public Website (www.findtrades.app)

User-agent: *
Allow: /

# Block private/dynamic user content from indexing (except PRO profiles in sitemap)
# Note: PRO tradesman profiles are included in sitemap.xml for indexing
Disallow: /solicitari/

# Block admin and dashboard areas (if any)
Disallow: /dashboard/
Disallow: /admin/

# Block API endpoints
Disallow: /api/

# Block authentication pages
Disallow: /login
Disallow: /register
Disallow: /auth/
Disallow: /login?redirectTo=

# Block form pages and query parameters (not useful for SEO)
Disallow: /request-quote
Disallow: /request-quote?

# Block app subdomain paths if crawled here
Disallow: /app.findtrades.app/

# Allow important resources
Allow: /services/
Allow: /tradesmen/
Allow: /blog/
Allow: /companies/
Allow: /sitemap.xml
Allow: /robots.txt

# Sitemap location
Sitemap: ${WEB_URL}/sitemap.xml
Sitemap: ${WEB_URL}/sitemap-cities.xml
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
