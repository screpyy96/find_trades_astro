# IndexNow - Quick Start Guide

## 🎯 Ce trebuie să faci ACUM

### Pasul 1: Verifică site-ul în Bing Webmaster Tools

1. **Mergi la**: https://www.bing.com/webmasters
2. **Login** cu contul Microsoft (sau creează unul)
3. **Add a site**: `www.meseriaslocal.ro`
4. **Alege metoda de verificare**: "HTML File"
5. **Upload fișierul**: Deja ai `80ed490583fd4cb8b5705e6e8cb33fec.txt` în `public/`
6. **Click "Verify"**
7. **Așteaptă** confirmarea (1-5 minute)

### Pasul 2: Submit sitemap în Bing

După verificare:
1. În Bing Webmaster Tools, mergi la **Sitemaps**
2. Add sitemap: `https://www.meseriaslocal.ro/sitemap.xml`
3. Click **Submit**

### Pasul 3: Rulează scriptul IndexNow

```bash
node scripts/submit-indexnow.mjs
```

Ar trebui să vezi:
```
✅ Found 4978 URLs in sitemap
✅ Batch 1/1 submitted successfully!
```

## 📊 Ce se întâmplă după

- **24-48 ore**: Paginile încep să apară în Bing
- **1-2 săptămâni**: Indexare completă în Bing
- **Automat**: Yandex, Seznam.cz, Naver primesc și ei notificarea

## 🔄 Când să rulezi din nou

Rulează scriptul după:
- ✅ Deploy cu conținut nou
- ✅ Adăugare servicii noi
- ✅ Adăugare orașe noi
- ✅ Blog posts noi
- ✅ Actualizări importante SEO

**Limită**: Max 10,000 URL-uri per zi. Ai ~4978, deci ești OK.

## 📈 Monitorizare

### Bing Webmaster Tools
- **Dashboard**: Vezi câte pagini sunt indexate
- **URL Inspection**: Testează pagini individuale
- **Index Explorer**: Vezi toate paginile indexate

### Google (separat)
IndexNow NU funcționează pentru Google. Pentru Google:
1. **Google Search Console**: https://search.google.com/search-console
2. Submit sitemap: `https://www.meseriaslocal.ro/sitemap.xml`
3. Request indexing manual pentru paginile importante

## ⚡ Pro Tips

1. **Automatizare**: Adaugă în CI/CD după fiecare deploy
   ```json
   // package.json
   "scripts": {
     "postbuild": "node scripts/submit-indexnow.mjs"
   }
   ```

2. **Prioritizare**: Paginile cu priority 0.95 în sitemap sunt cele mai importante (service + city)

3. **Tracking**: Monitorizează în Bing Webmaster Tools câte pagini sunt indexate săptămânal

## 🚨 Probleme comune

**403 Error**: Site-ul nu e verificat → Vezi Pasul 1
**Timeout**: API-ul e lent → Retry după 5 minute
**No URLs found**: Sitemap-ul nu e accesibil → Check `https://www.meseriaslocal.ro/sitemap.xml`

## 📞 Need Help?

Check `INDEXNOW_SETUP.md` pentru detalii complete.
