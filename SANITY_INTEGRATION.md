# Integrare Sanity CMS - Pagini Servicii

## Prezentare Generală

Am integrat Sanity CMS pentru a gestiona conținut dinamic pentru paginile de servicii. Acest lucru permite editarea ușoară a conținutului SEO fără a modifica codul.

## Fișiere Create

### 1. Client Sanity (`src/lib/sanity.ts`)
- Configurare client Sanity cu project ID și dataset
- Funcții pentru a prelua toate paginile de servicii
- Funcții pentru a prelua o pagină specifică după slug
- Type definitions pentru ServicePage

### 2. Pagina Index Servicii (`src/pages/servicii/index.astro`)
- Afișează toate categoriile de servicii din Supabase
- Afișează ghidurile din Sanity (dacă există)
- Hero section cu statistici
- Secțiuni SEO cu FAQ și beneficii
- Design similar cu pagina de pe Remix

### 3. Pagina Individuală Serviciu (`src/pages/servicii/[slug].astro`)
- Afișează conținutul complet dintr-o pagină Sanity
- Suport pentru:
  - Hero personalizat
  - Conținut rich text (Portable Text)
  - Prețuri orientative
  - Sfaturi locale
  - FAQ
  - Servicii conexe
- Static Site Generation (SSG) pentru performanță

### 4. Pagina Ghiduri (`src/pages/servicii/ghiduri/index.astro`)
- Listează toate ghidurile grupate pe orașe
- Link-uri către fiecare ghid individual

## Structura Sanity

Schema `servicePage` include:
- **Informații de bază**: title, tradeSlug, citySlug
- **Hero**: heroTitle, heroSubtitle, heroDescription
- **SEO**: metaDescription, seoKeywords
- **Conținut**: content (Portable Text)
- **Extra**: faqSection, priceRanges, localTips, relatedServices

## Cum să Folosești

### 1. Creează Conținut în Sanity Studio

Accesează Sanity Studio (probabil la `http://localhost:3333` sau URL-ul tău de producție):

```bash
cd meserias-local-web/sanity-studio
npm run dev
```

### 2. Creează o Pagină Nouă

1. Click pe "🔧 Pagini Servicii (SEO)"
2. Click "Create" → "Service Page"
3. Completează câmpurile:
   - **Titlu**: "Electrician București - Ghid Complet 2025"
   - **Meserie**: Selectează din listă (ex: electrician-urgente)
   - **Oraș**: Selectează din listă (ex: bucuresti)
   - **Hero Title**: Titlu pentru hero section
   - **Hero Description**: Descriere scurtă
   - **Content**: Scrie conținutul complet cu H2, H3, liste, etc.
   - **FAQ**: Adaugă întrebări frecvente
   - **Prețuri**: Adaugă prețuri orientative (opțional)

4. Marchează "Publicat" și salvează

### 3. Vizualizează pe Site

Pagina va fi disponibilă la:
- `/servicii/[slug-generat]/` - pentru pagina individuală
- `/servicii/` - va apărea în secțiunea "Ghiduri și Informații Detaliate"
- `/servicii/ghiduri/` - va apărea în lista completă de ghiduri

## Avantaje

✅ **SEO Optimizat**: Conținut rich, meta descriptions, structured data
✅ **Ușor de Editat**: Editare vizuală în Sanity Studio
✅ **Performanță**: Static Site Generation (SSG)
✅ **Flexibil**: Suport pentru FAQ, prețuri, sfaturi locale
✅ **Scalabil**: Adaugă oricâte pagini vrei fără cod

## Deployment

### Build Time
Paginile sunt generate la build time pentru performanță maximă:

```bash
pnpm build --filter web-astro
```

### Rebuild Automat
Pentru a actualiza conținutul, trebuie să faci rebuild. Poți configura:
- Webhook-uri Sanity → trigger rebuild automat
- Scheduled rebuilds (ex: o dată pe oră)
- Manual rebuild când publici conținut nou

## Exemple de Conținut

### Exemplu 1: Electrician București
```
Title: Electrician București - Servicii Electrice Profesionale 2025
Trade: electrician-urgente
City: bucuresti
Hero Title: Găsește Electrician în București
Hero Description: Electricieni verificați, disponibili 24/7...
Content: [Rich text cu secțiuni despre servicii, prețuri, zone acoperite]
FAQ: [Întrebări despre urgențe, prețuri, garanții]
```

### Exemplu 2: Instalator Cluj
```
Title: Instalator Cluj-Napoca - Instalații Sanitare și Termice
Trade: instalator-urgente
City: cluj-napoca
Hero Title: Instalator Profesionist în Cluj-Napoca
Content: [Ghid complet despre instalații]
Price Ranges: [Prețuri pentru diferite servicii]
Local Tips: [Sfaturi specifice pentru Cluj]
```

## Troubleshooting

### Paginile nu apar
- Verifică că `isPublished` este `true` în Sanity
- Verifică că ai făcut rebuild după publicare
- Verifică console-ul pentru erori

### Conținutul nu se afișează corect
- Verifică că ai completat câmpurile obligatorii
- Verifică formatarea Portable Text
- Verifică că slug-ul este unic

### Erori de build
- Verifică că Sanity client ID și dataset sunt corecte
- Verifică că ai instalat `@sanity/client` și `@portabletext/types`
- Verifică că toate câmpurile au type definitions corecte

## Integrare Blog

Am adăugat și suport complet pentru blog din Sanity:

### Pagini Blog Create

1. **`/blog/`** - Lista tuturor articolelor
   - Afișează articole recomandate (featured)
   - Afișează toate categoriile
   - Grid cu toate articolele

2. **`/blog/[slug]/`** - Articol individual
   - Afișare completă articol cu Portable Text
   - Imagine featured
   - Informații autor
   - Tags
   - Breadcrumbs

3. **`/blog/categorie/[slug]/`** - Articole pe categorie
   - Filtrare după categorie
   - Grid cu articole

### Funcții Sanity pentru Blog

- `getAllBlogPosts()` - Toate articolele publicate
- `getBlogPostBySlug(slug)` - Un articol specific
- `getFeaturedBlogPosts(limit)` - Articole recomandate
- `getAllBlogCategories()` - Toate categoriile
- `getBlogPostsByCategory(categorySlug)` - Articole dintr-o categorie
- `getImageUrl(image)` - Helper pentru URL-uri imagini

## Next Steps

- [x] Adaugă suport pentru blog din Sanity
- [x] Creează pagini pentru articole și categorii
- [ ] Adaugă mai multe pagini de servicii în Sanity
- [ ] Configurează webhook-uri pentru rebuild automat
- [ ] Adaugă imagini pentru servicii
- [ ] Optimizează SEO cu structured data
- [ ] Adaugă internal linking automat între pagini
