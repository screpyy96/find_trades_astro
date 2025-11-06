# Web Astro - SEO Site

Static site for SEO-optimized service pages built with Astro.

## Features

- Static site generation (SSG) for optimal performance
- SEO-optimized service + city pages
- Sanity CMS integration for content overrides
- Trailing slash URLs
- Sitemap and robots.txt
- Vercel deployment with edge caching

## Development

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Environment Variables

Copy `.env.example` to `.env` and fill in:

- `SANITY_PROJECT_ID` - Your Sanity project ID
- `SANITY_DATASET` - Sanity dataset (usually 'production')
- `SANITY_TOKEN` - Sanity read token

## Deployment

Deploy to Vercel:
- Domain: `meseriaslocal.ro` or `www.meseriaslocal.ro`
- Framework: Astro
- Build command: `pnpm build`
- Output directory: `dist`

## DNS Configuration

Point your domain to this Vercel project:
- `meseriaslocal.ro` → Vercel project
- `www.meseriaslocal.ro` → Vercel project (recommended)

Update `robots.txt` to reference the correct sitemap URL.
