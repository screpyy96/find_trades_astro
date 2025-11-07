# Analytics Configuration

## Overview

Aplicația Astro include suport pentru Google Tag Manager (GTM) și Microsoft Clarity pentru analytics și tracking.

## Features

- ✅ **Lazy Loading**: Scripturile se încarcă doar după interacțiunea utilizatorului
- ✅ **Privacy-First**: Respectă consimțământul pentru cookie-uri
- ✅ **Production Only**: Analytics se încarcă doar în producție
- ✅ **Performance Optimized**: Nu blochează rendering-ul inițial
- ✅ **Error Handling**: Gestionează cazurile când ad-blockere blochează scripturile

## Setup

### 1. Configurare Environment Variables

Adaugă următoarele variabile în fișierul `.env`:

```bash
# Google Tag Manager
PUBLIC_GTM_ID=GTM-XXXXXXX

# Microsoft Clarity
PUBLIC_CLARITY_ID=your_clarity_id
```

**Important**: Folosește prefixul `PUBLIC_` pentru ca variabilele să fie disponibile în client-side.

### 2. Obținere GTM ID

1. Mergi la [Google Tag Manager](https://tagmanager.google.com/)
2. Creează un cont și container nou (sau folosește unul existent)
3. Copiază GTM ID-ul (format: `GTM-XXXXXXX`)
4. Adaugă-l în `.env` ca `PUBLIC_GTM_ID`

### 3. Obținere Clarity ID

1. Mergi la [Microsoft Clarity](https://clarity.microsoft.com/)
2. Creează un proiect nou
3. Copiază Project ID-ul
4. Adaugă-l în `.env` ca `PUBLIC_CLARITY_ID`

## How It Works

### Loading Strategy

1. **Initial Load**: Scripturile NU se încarcă imediat
2. **User Interaction**: După scroll, click sau keypress
3. **Consent Check**: Verifică dacă utilizatorul a dat consimțământ
4. **Delayed Load**: Folosește `setTimeout` pentru a nu bloca rendering-ul

### Cookie Consent

Scripturile verifică următoarele pentru consimțământ:
- `localStorage.getItem('cookie-consent')`
- `localStorage.getItem('analytics-consent')`
- `document.cookie` conține `analytics=true`

### Production Only

Analytics se încarcă doar când:
- `import.meta.env.PROD === true`
- Nu este localhost sau development

## Testing

### Development

În development, analytics **NU** se va încărca. Pentru a testa:

```bash
# Build pentru production
npm run build

# Preview build-ul
npm run preview
```

### Verificare GTM

1. Deschide DevTools → Network
2. Caută request către `googletagmanager.com`
3. Verifică că `dataLayer` există în console: `window.dataLayer`

### Verificare Clarity

1. Deschide DevTools → Network
2. Caută request către `clarity.ms`
3. Verifică în Clarity dashboard că sesiunea apare

## Integration cu Cookie Consent

Pentru a integra cu un banner de cookie consent:

```javascript
// Când utilizatorul acceptă cookies
localStorage.setItem('analytics-consent', 'true');
// sau
document.cookie = 'analytics=true; max-age=31536000; path=/';

// Apoi reîncarcă pagina sau trigger manual
window.location.reload();
```

## Troubleshooting

### Analytics nu se încarcă

1. **Verifică environment variables**:
   ```bash
   echo $PUBLIC_GTM_ID
   echo $PUBLIC_CLARITY_ID
   ```

2. **Verifică că ești în production**:
   - Build cu `npm run build`
   - Preview cu `npm run preview`

3. **Verifică consola pentru erori**:
   - Deschide DevTools → Console
   - Caută warning-uri despre GTM sau Clarity

### Ad Blockers

Ad blockere pot bloca GTM și Clarity. Acest lucru este normal și scripturile sunt configurate să gestioneze această situație fără erori.

## Performance Impact

- **Initial Load**: 0 KB (scripturile nu se încarcă imediat)
- **After Interaction**: ~50-100 KB (GTM + Clarity)
- **Render Blocking**: None (async + defer)

## Privacy Compliance

- ✅ GDPR Compliant (cu cookie consent)
- ✅ Nu se încarcă fără interacțiune
- ✅ Respectă Do Not Track (dacă implementat)
- ✅ Nu blochează funcționalitatea site-ului

## Similar cu Remix

Implementarea este similară cu cea din aplicația Remix:
- Lazy loading după user interaction
- Cookie consent check
- Production only
- Error handling pentru ad blockers
