# IndexNow Setup - Indexare Instant

## Ce este IndexNow?

IndexNow este un protocol care notifică instant motoarele de căutare (Bing, Yandex, etc.) când ai conținut nou sau actualizat. Paginile tale vor fi indexate în câteva ore în loc de zile/săptămâni.

## Setup Complet ✅

### 1. Key File (DONE)
- ✅ Fișier creat: `public/80ed490583fd4cb8b5705e6e8cb33fec.txt`
- ✅ Accesibil la: https://www.meseriaslocal.ro/80ed490583fd4cb8b5705e6e8cb33fec.txt

### 2. API Endpoint (DONE)
- ✅ Endpoint creat: `/api/indexnow`
- ✅ Poate fi folosit pentru a submite URL-uri programatic

### 3. Submit Script (DONE)
- ✅ Script creat: `scripts/submit-indexnow.mjs`
- ✅ Actualizat să submită TOATE URL-urile din sitemap (~4978 URL-uri)

### 4. Site Verification (REQUIRED) ⚠️
- ⚠️ Trebuie să verifici site-ul în Bing Webmaster Tools
- ⚠️ Sau în Yandex Webmaster
- Fără verificare, IndexNow returnează 403 error

## Cum să folosești

### IMPORTANT: Verifică site-ul mai întâi! ⚠️

Înainte de a submite URL-uri, trebuie să verifici site-ul în:

**Bing Webmaster Tools** (recomandat):
1. Mergi la: https://www.bing.com/webmasters
2. Add site: `www.meseriaslocal.ro`
3. Verifică folosind fișierul IndexNow key (deja ai `80ed490583fd4cb8b5705e6e8cb33fec.txt`)
4. Așteaptă confirmarea (câteva minute)

**SAU Yandex Webmaster**:
1. Mergi la: https://webmaster.yandex.com
2. Add site: `www.meseriaslocal.ro`
3. Verifică folosind fișierul key
4. Așteaptă confirmarea

### După verificare, rulează scriptul:

```bash
node scripts/submit-indexnow.mjs
```

Scriptul va:
- Fetch automat toate URL-urile din sitemap (~4978 URL-uri)
- Le submite în batch-uri de 10,000 (limita IndexNow)
- Așteaptă 1 secundă între batch-uri pentru rate limiting

### Opțiunea 2: Submit prin API

```bash
curl -X POST https://www.meseriaslocal.ro/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{
    "urls": [
      "/servicii/amenajari-interioare/zugraveli-vopsitorii/bucuresti/",
      "/servicii/instalatii-utilitati/instalatii-sanitare/cluj-napoca/"
    ]
  }'
```

### Opțiunea 3: Submit direct la IndexNow

```bash
curl -X POST https://api.indexnow.org/indexnow \
  -H "Content-Type: application/json" \
  -d '{
    "host": "www.meseriaslocal.ro",
    "key": "80ed490583fd4cb8b5705e6e8cb33fec",
    "keyLocation": "https://www.meseriaslocal.ro/80ed490583fd4cb8b5705e6e8cb33fec.txt",
    "urlList": [
      "https://www.meseriaslocal.ro/servicii/amenajari-interioare/zugraveli-vopsitorii/bucuresti/"
    ]
  }'
```

## Când să folosești IndexNow

1. **După deploy** - Rulează scriptul pentru a notifica toate paginile
2. **Conținut nou** - Când adaugi servicii noi, orașe noi, sau blog posts
3. **Actualizări importante** - Când modifici conținut SEO important

## Limite

- **10,000 URL-uri per zi** per host
- **Batch size**: Max 10,000 URL-uri per request
- **Rate limiting**: Recomandabil 1 request per secundă

## Verificare

După ce ai verificat site-ul în Bing/Yandex Webmaster Tools și ai rulat scriptul:

1. **Bing Webmaster Tools**: https://www.bing.com/webmasters
   - Verifică în "URL Inspection" dacă paginile sunt indexate
   - Vezi statistici de indexare în dashboard

2. **Yandex Webmaster**: https://webmaster.yandex.com
   - Verifică statusul indexării
   - Vezi rapoarte de crawling

Paginile ar trebui să apară în index în **24-48 ore**.

### Statistici curente:
- **Total URL-uri în sitemap**: ~4978
- **Breakdown**:
  - Static pages: 3
  - Service categories: ~10
  - Service pages (no city): ~50
  - Service + City pages: ~2500
  - Blog posts: varies
  - PRO tradesman profiles: varies

## Motoare de căutare suportate

- ✅ Bing
- ✅ Yandex
- ✅ Seznam.cz
- ✅ Naver
- ⚠️ Google (nu suportă IndexNow, folosește Google Search Console)

## Pentru Google

Google nu suportă IndexNow. Pentru indexare rapidă la Google:

1. **Google Search Console**: https://search.google.com/search-console
2. Submit sitemap: `https://www.meseriaslocal.ro/sitemap.xml`
3. Request indexing manual pentru paginile importante
4. Așteaptă 2-7 zile pentru indexare completă

## Automatizare (opțional)

Poți adăuga un cron job pentru a submite automat după fiecare deploy:

```bash
# În package.json
"scripts": {
  "postbuild": "node scripts/submit-indexnow.mjs"
}
```

Sau în CI/CD (GitHub Actions, Vercel, etc.):

```yaml
- name: Submit to IndexNow
  run: node scripts/submit-indexnow.mjs
```

## Troubleshooting

### Error: Site Verification Not Completed (403)
**Cauză**: Site-ul nu e verificat în Bing/Yandex Webmaster Tools

**Soluție**:
1. Verifică site-ul în Bing Webmaster Tools: https://www.bing.com/webmasters
2. Folosește fișierul key pentru verificare (`80ed490583fd4cb8b5705e6e8cb33fec.txt`)
3. Așteaptă confirmarea (câteva minute)
4. Rulează din nou scriptul

### Error: Key file not found
- Verifică că `public/80ed490583fd4cb8b5705e6e8cb33fec.txt` există
- Verifică că e accesibil la URL-ul public

### Error: Invalid host
- Verifică că folosești `www.meseriaslocal.ro` (cu www)
- Verifică că URL-urile sunt complete și corecte

### No response / Timeout
- IndexNow API poate fi lent uneori
- Retry după câteva minute
- Verifică că nu ai depășit limita de 10,000 URL-uri/zi

### Error: Too many URLs
- Limita IndexNow: 10,000 URL-uri per request
- Scriptul împarte automat în batch-uri
- Limita zilnică: 10,000 URL-uri per host
- Dacă ai >10k URL-uri, rulează scriptul în zile consecutive
