# Test Plan - Pagini Solicitări

## Checklist pentru Testing

### 1. Pagina de Listă (`/solicitari`)

#### Funcționalitate
- [ ] Pagina se încarcă fără erori
- [ ] Se afișează toate lucrările deschise din baza de date
- [ ] Hero section afișează numărul corect de lucrări
- [ ] Statisticile sunt afișate corect (număr lucrări, 0% comision, 24h răspuns)
- [ ] Cardurile de lucrări sunt afișate în grid responsive
- [ ] Badge-ul "NOU" apare pentru lucrările din ultimele 24h
- [ ] Informațiile sunt complete pe fiecare card:
  - Titlu
  - Descriere (truncated)
  - Tip meserie (badge)
  - Urgență (badge)
  - Număr imagini (badge)
  - Locație
  - Buget
- [ ] Link-urile către paginile de detalii funcționează
- [ ] Breadcrumbs funcționează corect

#### SEO
- [ ] Meta title conține numărul de lucrări
- [ ] Meta description este relevantă
- [ ] Structured data (ItemList) este prezentă
- [ ] Canonical URL este corect
- [ ] Open Graph tags sunt complete

#### Design
- [ ] Layout responsive pe mobile
- [ ] Layout responsive pe tablet
- [ ] Layout responsive pe desktop
- [ ] Hover effects funcționează pe carduri
- [ ] Animații sunt smooth
- [ ] Culorile sunt consistente cu design-ul

### 2. Pagina de Detalii (`/solicitari/[slug]`)

#### Funcționalitate
- [ ] Pagina se încarcă cu slug SEO-friendly
- [ ] Pagina se încarcă cu UUID complet (backward compatibility)
- [ ] Redirect funcționează pentru UUID-uri vechi
- [ ] Se afișează toate detaliile lucrării:
  - Titlu
  - Status
  - Data publicării
  - Descriere completă
  - Imagini (dacă există)
  - Meserie
  - Dimensiune proiect
  - Tip lucrare
  - Urgență
  - Buget
- [ ] Galeria de imagini funcționează
- [ ] Sidebar cu buget este vizibil
- [ ] CTA pentru aplicare redirecționează către Remix
- [ ] Breadcrumbs funcționează
- [ ] Butonul "Înapoi la listă" funcționează

#### SEO
- [ ] Meta title conține titlul lucrării
- [ ] Meta description este relevantă
- [ ] Structured data (JobPosting) este prezentă
- [ ] Canonical URL este corect
- [ ] Open Graph tags sunt complete

#### Design
- [ ] Layout cu 2 coloane pe desktop
- [ ] Layout stacked pe mobile
- [ ] Sidebar sticky funcționează
- [ ] Imagini se încarcă lazy
- [ ] Hover effects pe imagini
- [ ] Culorile badge-urilor sunt corecte

### 3. Sitemap (`/sitemap.xml`)

#### Funcționalitate
- [ ] Sitemap se generează fără erori
- [ ] Conține pagina principală de solicitări
- [ ] Conține toate paginile individuale de solicitări
- [ ] URL-urile sunt corecte
- [ ] Prioritățile sunt setate corect
- [ ] Lastmod este prezent pentru solicitări
- [ ] XML-ul este valid

### 4. Homepage (`/`)

#### Funcționalitate
- [ ] Secțiunea "Lucrări Active" este vizibilă
- [ ] Cardurile sample sunt afișate corect
- [ ] Link către `/solicitari` funcționează
- [ ] Design este consistent cu restul paginii

### 5. Navbar

#### Funcționalitate
- [ ] Link "Solicitări" este vizibil
- [ ] Link redirecționează către pagina corectă
- [ ] Active state funcționează pe pagina de solicitări

### 6. Integrare cu Remix

#### Funcționalitate
- [ ] Redirect către Remix pentru deblocare contact
- [ ] URL-ul conține slug-ul corect
- [ ] Variabila de mediu PUBLIC_APP_URL este setată

### 7. Performanță

#### Metrici
- [ ] Pagina de listă se încarcă în < 2s
- [ ] Pagina de detalii se încarcă în < 2s
- [ ] Imagini sunt lazy loaded
- [ ] Cache headers sunt setate corect
- [ ] Lighthouse score > 90

### 8. Accesibilitate

#### Checklist
- [ ] Toate imaginile au alt text
- [ ] Heading hierarchy este corectă
- [ ] Link-urile au text descriptiv
- [ ] Contrast text/background este suficient
- [ ] Keyboard navigation funcționează
- [ ] Screen reader friendly

## Comenzi de Test

### Development
```bash
cd apps/web-astro
npm run dev
```

### Build
```bash
cd apps/web-astro
npm run build
```

### Preview
```bash
cd apps/web-astro
npm run preview
```

## URL-uri de Test

### Local
- Lista: http://localhost:4321/solicitari
- Detalii: http://localhost:4321/solicitari/renovare-apartament-abc123
- Sitemap: http://localhost:4321/sitemap.xml
- Homepage: http://localhost:4321/

### Production
- Lista: https://www.meseriaslocal.ro/solicitari
- Detalii: https://www.meseriaslocal.ro/solicitari/[slug]
- Sitemap: https://www.meseriaslocal.ro/sitemap.xml

## Test Cases pentru Slug-uri

### Valid Slugs
- `renovare-apartament-abc123` ✓
- `instalare-sistem-def456` ✓
- `zugravit-casa-ghi789` ✓

### UUID Slugs (Backward Compatibility)
- `550e8400-e29b-41d4-a716-446655440000` ✓ (should redirect)

### Invalid Slugs
- `invalid` ✗ (should redirect to /solicitari)
- `too-short-ab` ✗ (should redirect to /solicitari)
- `` ✗ (should redirect to /solicitari)

## Erori Comune

### 1. Supabase Connection Error
**Simptom:** Pagina nu se încarcă sau afișează eroare
**Soluție:** Verifică variabilele de mediu `PUBLIC_SUPABASE_URL` și `PUBLIC_SUPABASE_ANON_KEY`

### 2. Imagini Nu Se Încarcă
**Simptom:** Imagini lipsă sau broken
**Soluție:** Verifică URL-urile imaginilor în baza de date

### 3. Redirect Loop
**Simptom:** Pagina se reîncarcă continuu
**Soluție:** Verifică logica de redirect în `[slug].astro`

### 4. Sitemap Nu Se Generează
**Simptom:** 404 pe `/sitemap.xml`
**Soluție:** Verifică că fișierul `sitemap.xml.ts` este în `src/pages/`

## Raportare Bugs

Când raportezi un bug, include:
1. URL-ul exact
2. Browser și versiune
3. Screenshot sau video
4. Pași pentru reproducere
5. Comportament așteptat vs actual
6. Console errors (dacă există)

## Success Criteria

Testarea este considerată reușită când:
- ✅ Toate checklist-urile sunt bifate
- ✅ Nu există erori în console
- ✅ Lighthouse score > 90
- ✅ Toate URL-urile funcționează
- ✅ Design-ul este consistent
- ✅ SEO este optimizat
