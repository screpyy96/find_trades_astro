# Deployment Guide - Pagini Solicitări

## Pre-Deployment Checklist

### 1. Verificare Cod
- [ ] Toate fișierele sunt create și salvate
- [ ] Nu există erori TypeScript
- [ ] Testele locale funcționează
- [ ] Build-ul local reușește

### 2. Variabile de Mediu
Asigură-te că următoarele variabile sunt setate în producție:

```env
PUBLIC_SUPABASE_URL=your_production_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
PUBLIC_APP_URL=https://app.meseriaslocal.ro
```

### 3. Baza de Date
- [ ] Tabelul `jobs` există și are datele corecte
- [ ] Coloanele necesare sunt prezente:
  - `id` (UUID)
  - `title` (text)
  - `description` (text)
  - `status` (text)
  - `budget` (numeric)
  - `address` (text)
  - `tradeType` (text)
  - `urgency` (text)
  - `images` (array)
  - `created_at` (timestamp)
  - `jobType` (text)
  - `projectSize` (text)
  - `city` (text)
  - `client_id` (UUID)

## Deployment Steps

### Step 1: Build Local
```bash
cd apps/web-astro
npm run build
```

Verifică că build-ul reușește fără erori.

### Step 2: Test Preview
```bash
npm run preview
```

Testează paginile în modul preview:
- http://localhost:4321/solicitari
- http://localhost:4321/solicitari/[test-slug]
- http://localhost:4321/sitemap.xml

### Step 3: Commit Changes
```bash
git add .
git commit -m "feat: add solicitari pages to Astro app"
git push origin main
```

### Step 4: Deploy to Production
Dacă folosești Vercel, Netlify sau alt serviciu:

#### Vercel
```bash
vercel --prod
```

#### Netlify
```bash
netlify deploy --prod
```

#### Manual Deploy
1. Build local: `npm run build`
2. Upload folder `dist/` la hosting
3. Configurează redirects dacă e necesar

### Step 5: Verificare Post-Deployment

#### URLs de Verificat
- [ ] https://www.meseriaslocal.ro/solicitari
- [ ] https://www.meseriaslocal.ro/solicitari/[slug-real]
- [ ] https://www.meseriaslocal.ro/sitemap.xml
- [ ] https://www.meseriaslocal.ro/ (verifică secțiunea "Lucrări Active")

#### Verificări SEO
- [ ] Google Search Console - submit sitemap
- [ ] Verifică indexarea în Google
- [ ] Verifică meta tags cu https://metatags.io/
- [ ] Verifică structured data cu https://search.google.com/test/rich-results

#### Verificări Performanță
- [ ] Lighthouse audit (score > 90)
- [ ] PageSpeed Insights
- [ ] GTmetrix
- [ ] WebPageTest

## Post-Deployment Tasks

### 1. Monitoring
Configurează monitoring pentru:
- Erori 404 pe pagini de solicitări
- Timp de încărcare
- Erori JavaScript
- Erori API Supabase

### 2. Analytics
Adaugă tracking pentru:
- Vizualizări pagină listă solicitări
- Vizualizări pagină detalii solicitări
- Click-uri pe "Vezi Detalii"
- Click-uri pe "Deblochează Contact"

### 3. SEO
- Submit sitemap la Google Search Console
- Submit sitemap la Bing Webmaster Tools
- Verifică indexarea după 24-48 ore
- Monitorizează poziții în search

### 4. Social Media
Anunță noile pagini pe:
- Facebook
- LinkedIn
- Twitter
- Instagram

## Rollback Plan

Dacă ceva nu funcționează:

### Quick Rollback
```bash
git revert HEAD
git push origin main
```

### Manual Rollback
1. Revert la commit-ul anterior
2. Rebuild și redeploy
3. Verifică că totul funcționează

## Common Issues

### Issue 1: 404 pe Pagini de Solicitări
**Cauză:** Routing-ul nu este configurat corect
**Soluție:** 
- Verifică că fișierele sunt în `src/pages/solicitari/`
- Verifică configurația de routing în `astro.config.mjs`

### Issue 2: Supabase Connection Error
**Cauză:** Variabile de mediu lipsă sau incorecte
**Soluție:**
- Verifică `.env` în producție
- Verifică că variabilele sunt prefixate cu `PUBLIC_`

### Issue 3: Imagini Nu Se Încarcă
**Cauză:** URL-uri incorecte sau CORS issues
**Soluție:**
- Verifică URL-urile în baza de date
- Configurează CORS în Supabase Storage

### Issue 4: Sitemap Nu Se Generează
**Cauză:** Eroare în `sitemap.xml.ts`
**Soluție:**
- Verifică logs pentru erori
- Testează local cu `npm run build`

## Performance Optimization

### 1. Caching
Configurează cache headers pentru:
- Pagini statice: `Cache-Control: public, max-age=3600`
- Sitemap: `Cache-Control: public, max-age=3600`
- Imagini: `Cache-Control: public, max-age=31536000`

### 2. CDN
Folosește CDN pentru:
- Imagini
- Assets statice
- Fonts

### 3. Image Optimization
- Folosește format WebP pentru imagini
- Lazy load imagini
- Responsive images cu srcset

## Security

### 1. Environment Variables
- Nu expune API keys în cod
- Folosește doar `PUBLIC_` prefix pentru variabile client-side
- Rotează keys periodic

### 2. CORS
- Configurează CORS corect în Supabase
- Permite doar domenii de încredere

### 3. Rate Limiting
- Implementează rate limiting pentru API calls
- Monitorizează abuse

## Maintenance

### Weekly Tasks
- [ ] Verifică erori în logs
- [ ] Verifică performanță
- [ ] Verifică indexare SEO

### Monthly Tasks
- [ ] Review analytics
- [ ] Optimizare performanță
- [ ] Update dependencies
- [ ] Security audit

## Support

Pentru probleme sau întrebări:
- Email: support@meseriaslocal.ro
- Slack: #web-astro channel
- GitHub Issues: https://github.com/your-repo/issues

## Success Metrics

Deployment-ul este considerat reușit când:
- ✅ Toate paginile se încarcă fără erori
- ✅ SEO este optimizat (Lighthouse > 90)
- ✅ Analytics tracking funcționează
- ✅ Nu există erori în logs
- ✅ Performanța este bună (< 2s load time)
- ✅ Sitemap este indexat de Google
