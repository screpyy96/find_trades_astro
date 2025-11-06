# Pagini de Solicitări - Astro

## Prezentare Generală

Am creat paginile de solicitări în aplicația Astro, similar cu cele din Remix, pentru a oferi o experiență consistentă utilizatorilor.

## Pagini Create

### 1. `/solicitari` - Lista de Solicitări
**Fișier:** `apps/web-astro/src/pages/solicitari/index.astro`

**Funcționalități:**
- Afișează toate lucrările deschise din baza de date
- Hero section cu statistici (număr de lucrări, 0% comision, timp de răspuns)
- Grid responsive cu carduri pentru fiecare lucrare
- Badge "NOU" pentru lucrările postate în ultimele 24h
- Informații afișate:
  - Titlu și descriere
  - Tip meserie (badge)
  - Urgență (badge)
  - Număr de imagini (badge)
  - Locație
  - Buget
- Link către pagina de detalii
- SEO optimizat cu meta tags și structured data
- Breadcrumbs pentru navigare

### 2. `/solicitari/[slug]` - Detalii Solicitare
**Fișier:** `apps/web-astro/src/pages/solicitari/[slug].astro`

**Funcționalități:**
- Afișează detaliile complete ale unei lucrări
- Layout cu 2 coloane (conținut principal + sidebar)
- Secțiuni:
  - Header cu titlu, status și data publicării
  - Descriere completă a proiectului
  - Galerie de imagini (dacă există)
  - Detalii suplimentare (meserie, dimensiune, tip lucrare, urgență)
  - Sidebar cu buget și CTA pentru aplicare
- Sistem de slug-uri SEO-friendly:
  - Format: `titlu-oras-shortid` (ex: `renovare-apartament-abc123`)
  - Suport pentru UUID-uri complete (backward compatibility)
  - Extragere automată a short ID (primele 6 caractere)
- Redirect către aplicația Remix pentru deblocare contact
- SEO optimizat cu structured data (JobPosting schema)
- Breadcrumbs pentru navigare

## Integrare cu Sitemap

Am actualizat `apps/web-astro/src/pages/sitemap.xml.ts` pentru a include:
- Pagina principală de solicitări (`/solicitari/`)
- Toate paginile individuale de solicitări (până la 100 cele mai recente)
- Metadata `lastmod` pentru paginile de solicitări

## Generare URL-uri SEO

Funcțiile helper pentru generarea URL-urilor:

```typescript
// Generează slug SEO-friendly
function generateJobUrl(job: any): string {
  const parts: string[] = [];
  
  // Adaugă titlu (max 3 cuvinte)
  if (job.title) {
    const titleWords = job.title.trim().split(/\s+/).slice(0, 3);
    const titleSlug = titleWords.join(' ')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    if (titleSlug) parts.push(titleSlug);
  }
  
  if (parts.length === 0) parts.push('lucrare');
  
  // Adaugă short ID (6 caractere)
  const shortId = job.id.replace(/-/g, '').substring(0, 6);
  parts.push(shortId);
  
  return `/solicitari/${parts.join('-')}`;
}

// Extrage ID din slug
function extractJobIdFromSlug(slug: string): string | null {
  // Verifică dacă e UUID complet
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
  if (isUuid) return slug;
  
  // Extrage short ID (ultimele 6 caractere)
  const parts = slug.split('-');
  const shortId = parts[parts.length - 1];
  
  if (!shortId || shortId.length !== 6) return null;
  return shortId;
}
```

## Design și Styling

- Design consistent cu restul aplicației Astro
- Gradient hero similar cu alte pagini
- Carduri cu hover effects și animații
- Badges colorate pentru diferite tipuri de informații
- Layout responsive (mobile-first)
- Culori:
  - Emerald/Green pentru status "Deschis"
  - Blue pentru meserie
  - Amber pentru urgență
  - Purple pentru imagini
  - Orange/Amber pentru buget

## Navigare

- Link în navbar: "Solicitări" (deja existent)
- Breadcrumbs pe ambele pagini
- Buton "Înapoi la listă" pe pagina de detalii
- Link către aplicația Remix pentru acțiuni autentificate

## SEO

### Meta Tags
- Title optimizat cu număr de lucrări
- Description cu informații relevante
- Keywords pentru fiecare lucrare
- Open Graph tags
- Canonical URLs

### Structured Data
- ItemList schema pentru lista de solicitări
- JobPosting schema pentru fiecare solicitare
- Informații complete despre locație, dată, organizație

## Performanță

- Server-side rendering (SSR) pentru conținut dinamic
- Lazy loading pentru imagini
- Cache headers pentru sitemap
- Limit de 100 lucrări pentru performanță optimă
- Imagini optimizate cu `loading="lazy"`

## Integrare cu Remix

Paginile Astro servesc ca landing pages publice, iar pentru acțiuni autentificate (deblocare contact, salvare job, etc.), utilizatorii sunt redirecționați către aplicația Remix:

```typescript
const APP_URL = import.meta.env.PUBLIC_APP_URL || 'https://app.meseriaslocal.ro';

// Redirect pentru deblocare contact
<a href={`${APP_URL}/solicitari/${slug}`}>
  Deblochează Contact
</a>
```

## Variabile de Mediu Necesare

```env
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
PUBLIC_APP_URL=https://app.meseriaslocal.ro
```

## Testing

Pentru a testa paginile:

1. Pornește serverul de dezvoltare:
```bash
cd apps/web-astro
npm run dev
```

2. Accesează:
- Lista: `http://localhost:4321/solicitari`
- Detalii: `http://localhost:4321/solicitari/[slug]`
- Sitemap: `http://localhost:4321/sitemap.xml`

## Viitor

Îmbunătățiri posibile:
- Filtrare și sortare pe pagina de listă
- Paginare pentru mai mult de 100 lucrări
- Search în timp real
- Hartă interactivă cu locații
- Sistem de favorite (necesită autentificare)
- Notificări pentru lucrări noi
