export async function GET() {
  const robotsTxt = `
# Meserias Local - Public Website (www.meseriaslocal.ro)

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
Disallow: /cere-oferta
Disallow: /cere-oferta?

# Block app subdomain paths if crawled here
Disallow: /app.meseriaslocal.ro/

# Allow important resources
Allow: /servicii/
Allow: /meseriasi/
Allow: /blog/
Allow: /companii/
Allow: /sitemap.xml
Allow: /robots.txt

# Sitemap location
Sitemap: https://www.meseriaslocal.ro/sitemap.xml
Sitemap: https://www.meseriaslocal.ro/sitemap-cities.xml
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
