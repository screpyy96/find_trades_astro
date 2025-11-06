import { services, cities } from '@meseriaslocal/data';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Only create client if we have real credentials
const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

type SitemapPage = {
  url: string;
  priority: string;
  lastmod?: string;
};

export async function GET() {
  const baseUrl = 'https://www.meseriaslocal.ro';
  
  // Static pages
  const staticPages: SitemapPage[] = [
    { url: `${baseUrl}/`, priority: '1.0' },
    { url: `${baseUrl}/meseriasi/`, priority: '0.9' },
    { url: `${baseUrl}/solicitari/`, priority: '0.9' },
  ];
  
  // Dynamic service pages
  const servicePages: SitemapPage[] = [];
  for (const service of services) {
    for (const city of cities) {
      servicePages.push({
        url: `${baseUrl}/servicii/${service.categorySlug}/${service.slug}/${city.slug}/`,
        priority: '0.8',
      });
    }
  }
  
  // Dynamic job pages
  const jobPages: SitemapPage[] = [];
  
  if (supabase) {
    try {
      const { data: jobs } = await supabase
        .from('jobs')
        .select('id, title, address, created_at')
        .eq('status', 'open')
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (jobs) {
      for (const job of jobs) {
        // Generate slug
        const parts: string[] = [];
        if (job.title) {
          const titleWords = job.title.trim().split(/\s+/).slice(0, 3);
          const titleSlug = titleWords.join(' ')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
          if (titleSlug) parts.push(titleSlug);
        }
        if (parts.length === 0) parts.push('lucrare');
        const shortId = job.id.replace(/-/g, '').substring(0, 6);
        parts.push(shortId);
        
        jobPages.push({
          url: `${baseUrl}/solicitari/${parts.join('-')}/`,
          priority: '0.7',
          lastmod: new Date(job.created_at).toISOString().split('T')[0],
        });
      }
    }
    } catch (error) {
      console.error('Error fetching jobs for sitemap:', error);
    }
  }
  
  const allPages = [...staticPages, ...servicePages, ...jobPages];
  
  // If more than 50k URLs, split into multiple sitemaps
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>${page.lastmod ? `
    <lastmod>${page.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
