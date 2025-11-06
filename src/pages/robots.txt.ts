export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /

Sitemap: https://www.meseriaslocal.ro/sitemap.xml
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
