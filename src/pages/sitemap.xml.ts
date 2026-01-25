import { romanianCities } from '../lib/romanian-cities.js';
import { trades } from '../data/trades.js';
import { createClient } from '@sanity/client';
import groq from 'groq';

type SanityBlogPost = {
  slug: string;
  updated?: string | null;
};

type SanityBlogCategory = {
  slug: string;
  _updatedAt?: string | null;
};

type SanityBlogAuthor = {
  slug: string;
  _updatedAt?: string | null;
};

const sanityClient = createClient({
  projectId: '7094dn36',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-01-01',
});

// Prerender this page at build time instead of on every request
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

  // ========================================
  // 0️⃣ FETCH DYNAMIC CONTENT FROM SANITY
  // ========================================
  const [blogPosts, blogCategories, blogAuthors] = await Promise.all([
    sanityClient.fetch<SanityBlogPost[]>(
      groq`*[_type == "blogPost" && defined(slug.current) && publishedAt < now()]|order(publishedAt desc){
        "slug": slug.current,
        "updated": coalesce(_updatedAt, publishedAt)
      }`
    ),
    sanityClient.fetch<SanityBlogCategory[]>(
      groq`*[_type == "blogCategory" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
    ),
    sanityClient.fetch<SanityBlogAuthor[]>(
      groq`*[_type == "blogAuthor" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
    ),
  ]);

  // ========================================
  // 1️⃣ STATIC PAGES (ONLY PUBLIC PAGES)
  // ========================================
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/servicii/', priority: '0.9', changefreq: 'daily' },
    { url: '/companii/', priority: '0.8', changefreq: 'daily' },
    { url: '/blog/', priority: '0.7', changefreq: 'daily' },
    { url: '/electrician-bucuresti/', priority: '1.0', changefreq: 'weekly' },
    { url: '/amenajari-interioare-bucuresti/', priority: '1.0', changefreq: 'weekly' },
    { url: '/renovari-acoperisuri-deva/', priority: '1.0', changefreq: 'weekly' },
    { url: '/constructii-amenajari-braila/', priority: '1.0', changefreq: 'weekly' },
    { url: '/faq/', priority: '0.7', changefreq: 'monthly' },
    { url: '/suport/', priority: '0.6', changefreq: 'monthly' },
    { url: '/zidarie-tencuiala-bucuresti/', priority: '1.0', changefreq: 'weekly' },
    { url: '/carotare-timisoara/', priority: '1.0', changefreq: 'weekly' },
    { url: '/constructii-case-bucuresti/', priority: '1.0', changefreq: 'weekly' },
    { url: '/montaj-gresie-faianta-salaj/', priority: '1.0', changefreq: 'weekly' },
    // NOTE: /meseriasi and /solicitari are NOT included - they're dynamic user content
  ];

  staticPages.forEach(page => {
    const loc = ensureTrailingSlash(`${baseUrl}${page.url}`);
    urls.push(`  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
  });

  // ========================================
  // 2️⃣ BLOG CONTENT
  // ========================================
  blogPosts
    ?.filter(post => post?.slug)
    .forEach(post => {
      const lastMod = post.updated ? new Date(post.updated).toISOString() : currentDate;
      const loc = ensureTrailingSlash(`${baseUrl}/blog/${post.slug}`);
      urls.push(`  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
    });

  // NOTE: Blog categories and authors are NOT included in sitemap
  // - Categories are just filtering pages, not unique content
  // - Authors are not standalone pages
  // Only individual blog posts are indexed for better crawl budget

  // ========================================
  // 3️⃣ SERVICE PAGES (SEO LANDING PAGES)
  // ========================================
  if (trades && trades.length > 0) {
    const categories = Array.from(
      new Set(
        trades
          .map(trade => trade.category)
          .filter((category): category is string => Boolean(category))
      )
    );

    // Service categories (e.g., /servicii/constructii/)
    categories.forEach(category => {
      if (!category || !category.trim()) return;
      const categorySlug = slugify(category).toLowerCase();
      if (!categorySlug) return;

      const loc = ensureTrailingSlash(`${baseUrl}/servicii/${categorySlug}`);
      urls.push(`  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
    });

    // Service pages without city (e.g., /servicii/constructii/zugrav/)
    trades.forEach(trade => {
      if (!trade.category || !trade.category.trim()) return;

      const categorySlug = slugify(trade.category).toLowerCase();
      const slugToUse = trade.slug && trade.slug.trim() ? trade.slug : slugify(trade.name);
      const tradeSlug = slugToUse.toLowerCase();

      if (!categorySlug || !tradeSlug) return;

      const loc = ensureTrailingSlash(`${baseUrl}/servicii/${categorySlug}/${tradeSlug}`);
      urls.push(`  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`);
    });

    // Service + City combinations (Top 50 cities - HIGHEST PRIORITY for long-tail SEO)
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

  // ========================================
  // 4️⃣ PRO TRADESMEN PROFILES (PUBLIC SEO PAGES)
  // ========================================
  try {
    // Import Supabase client and SEO utils
    const { createClient } = await import('@supabase/supabase-js');
    const { generateWorkerSeoSlug } = await import('../utils/seo-urls.js');
    
    // Use import.meta.env instead of process.env for Astro
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      const supabaseClient = createClient(supabaseUrl, supabaseKey);
      
      // Get PRO users with active subscriptions
      const { data: proSubscriptions, error: subsError } = await supabaseClient
        .from('user_subscriptions')
        .select('user_id, plan_id, status')
        .eq('status', 'active')
        .eq('plan_id', 'pro');
      
      console.log('🔍 Sitemap PRO subscriptions:', {
        count: proSubscriptions?.length || 0,
        error: subsError,
        subscriptions: proSubscriptions
      });
      
      if (proSubscriptions && proSubscriptions.length > 0) {
        const proUserIds = proSubscriptions.map(sub => sub.user_id);
        
        // Get ALL worker profiles with PRO subscriptions (remove verified filter to debug)
        const { data: proWorkers, error: workersError } = await supabaseClient
          .from('profiles')
          .select('id, name, address, is_verified, role')
          .in('id', proUserIds)
          .eq('role', 'worker')
          .not('name', 'is', null);
        
        console.log('🔍 Sitemap ALL PRO workers:', {
          count: proWorkers?.length || 0,
          error: workersError,
          workers: proWorkers?.map(w => ({ 
            id: w.id, 
            name: w.name, 
            verified: w.is_verified,
            role: w.role 
          }))
        });
        
        // Filter verified workers for sitemap
        const verifiedProWorkers = proWorkers?.filter(w => w.is_verified === true) || [];
        
        console.log('🔍 Verified PRO workers for sitemap:', {
          count: verifiedProWorkers.length,
          workers: verifiedProWorkers.map(w => ({ id: w.id, name: w.name }))
        });
        
        if (verifiedProWorkers.length > 0) {
          const verifiedProUserIds = verifiedProWorkers.map(w => w.id);
          
          // Get worker trades for SEO slug generation
          const { data: workerTradesData } = await supabaseClient
            .from('worker_trades')
            .select('profile_id, trade_ids')
            .in('profile_id', verifiedProUserIds);
          
          console.log('🔍 Worker trades data:', {
            count: workerTradesData?.length || 0,
            data: workerTradesData
          });
          
          // Get all trade details
          const allTradeIds = new Set<number>();
          workerTradesData?.forEach(wt => {
            if (wt.trade_ids && Array.isArray(wt.trade_ids)) {
              wt.trade_ids.forEach(id => allTradeIds.add(id));
            }
          });
          
          let tradesData: any[] = [];
          if (allTradeIds.size > 0) {
            const { data: trades } = await supabaseClient
              .from('trades')
              .select('id, name, slug')
              .in('id', Array.from(allTradeIds));
            tradesData = trades || [];
          }
          
          console.log('🔍 Trades data:', {
            count: tradesData.length,
            tradeIds: Array.from(allTradeIds)
          });
          
          // Create maps for efficient lookup
          const tradeMap = new Map(tradesData.map(t => [t.id, t]));
          const workerTradesMap = new Map(
            workerTradesData?.map(wt => [wt.profile_id, wt.trade_ids]) || []
          );
          
          verifiedProWorkers.forEach(worker => {
            if (worker.name && worker.name.trim()) {
              // Get worker's trades for SEO slug
              const tradeIds = workerTradesMap.get(worker.id) || [];
              const workerTrades = (Array.isArray(tradeIds) ? tradeIds : [])
                .map(id => tradeMap.get(id))
                .filter(Boolean);
              
              // Generate SEO slug
              const seoSlug = generateWorkerSeoSlug(worker, workerTrades);
              const loc = ensureTrailingSlash(`${baseUrl}/meseriasi/${seoSlug}`);
              
              console.log('✅ Adding PRO worker to sitemap:', {
                name: worker.name,
                slug: seoSlug,
                tradesCount: workerTrades.length
              });
              
              urls.push(`  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
            }
          });
          
          console.log('✅ Total PRO workers added to sitemap:', verifiedProWorkers.length);
        }
      }
    }
  } catch (error) {
    console.error('❌ Error fetching PRO tradesmen for sitemap:', error);
    // Continue without PRO tradesmen if there's an error
  }

  // ========================================
  // NOTE: EXCLUDED FROM SITEMAP
  // ========================================
  // - /meseriasi/* - Regular tradesman profiles (noindex, private) - EXCEPT PRO users above
  // - /solicitari/* - Job posts (noindex, private)
  // - /dashboard/* - User dashboards (noindex, private)
  // - /cere-oferta - Form page (noindex)
  // - /login, /register - Auth pages (noindex)

  // ========================================
  // 5️⃣ ENTERPRISE COMPANY PROFILES (PUBLIC SEO PAGES)
  // ========================================
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const { generateWorkerSeoSlug } = await import('../utils/seo-urls.js');
    
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      const supabaseClient = createClient(supabaseUrl, supabaseKey);
      
      // Get Enterprise users with active subscriptions (using ilike to handle whitespace)
      const { data: enterpriseSubscriptions } = await supabaseClient
        .from('user_subscriptions')
        .select('user_id')
        .eq('status', 'active')
        .ilike('plan_id', 'enterprise%');
      
      if (enterpriseSubscriptions && enterpriseSubscriptions.length > 0) {
        const enterpriseUserIds = enterpriseSubscriptions.map(sub => sub.user_id);
        
        const { data: enterpriseCompanies } = await supabaseClient
          .from('profiles')
          .select('id, name, address')
          .in('id', enterpriseUserIds)
          .eq('role', 'worker')
          .not('name', 'is', null);
        
        if (enterpriseCompanies && enterpriseCompanies.length > 0) {
          const companyIds = enterpriseCompanies.map(c => c.id);
          
          const { data: companyTradesData } = await supabaseClient
            .from('worker_trades')
            .select('profile_id, trade_ids')
            .in('profile_id', companyIds);
          
          const allTradeIds = new Set<number>();
          companyTradesData?.forEach(ct => {
            if (ct.trade_ids && Array.isArray(ct.trade_ids)) {
              ct.trade_ids.forEach(id => allTradeIds.add(id));
            }
          });
          
          let tradesData: any[] = [];
          if (allTradeIds.size > 0) {
            const { data: trades } = await supabaseClient
              .from('trades')
              .select('id, name, slug')
              .in('id', Array.from(allTradeIds));
            tradesData = trades || [];
          }
          
          const tradeMap = new Map(tradesData.map(t => [t.id, t]));
          const companyTradesMap = new Map(
            companyTradesData?.map(ct => [ct.profile_id, ct.trade_ids]) || []
          );
          
          enterpriseCompanies.forEach(company => {
            if (company.name && company.name.trim()) {
              const tradeIds = companyTradesMap.get(company.id) || [];
              const companyTrades = (Array.isArray(tradeIds) ? tradeIds : [])
                .map(id => tradeMap.get(id))
                .filter(Boolean);
              
              const seoSlug = generateWorkerSeoSlug(company, companyTrades);
              const loc = ensureTrailingSlash(`${baseUrl}/companii/${seoSlug}`);
              
              urls.push(`  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
            }
          });
        }
      }
    }
  } catch (error) {
    console.error('❌ Error fetching Enterprise companies for sitemap:', error);
  }

  // ========================================
  // 6️⃣ GENERATE SITEMAP
  // ========================================
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
