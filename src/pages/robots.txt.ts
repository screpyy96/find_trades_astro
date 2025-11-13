export async function GET() {
  const robotsTxt = `
# Meserias Local - Public Website (www.meseriaslocal.ro)

User-agent: *
Allow: /

# Block private/dynamic user content from indexing
Disallow: /meseriasi/
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

# Block form pages (not useful for SEO)
Disallow: /cere-oferta

# Allow important resources
Allow: /servicii/
Allow: /blog/
Allow: /sitemap.xml
Allow: /robots.txt

# Sitemap location
Sitemap: https://www.meseriaslocal.ro/sitemap.xml
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
