import { validateEnvironment } from '../lib/env-validation';

// Use environment variables from .env
const envConfig = validateEnvironment();
const WEB_URL = envConfig.config.web.url;

export async function GET() {
  const robotsTxt = `
# FindTrades - Public Website (www.findtrades.app)

User-agent: *
Allow: /

# Block private/dynamic user content from indexing
Disallow: /solicitari/

# Block admin and dashboard areas
Disallow: /dashboard/
Disallow: /admin/

# Block API endpoints
Disallow: /api/

# Block authentication pages
Disallow: /login
Disallow: /register
Disallow: /auth/

# Block form pages and query parameters
Disallow: /request-quote
Disallow: /request-quote?

# Allow important resources
Allow: /services/
Allow: /tradesmen/
Allow: /blog/
Allow: /sitemap.xml
Allow: /robots.txt

# Sitemap location
Sitemap: ${WEB_URL}/sitemap.xml
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
