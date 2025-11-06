# Ghid Deployment Vercel - Meserias Local Web

## ✅ Status: Pregătit pentru Deploy

Proiectul Astro este acum complet pregătit pentru deployment pe Vercel. Toate erorile TypeScript au fost rezolvate.

## 📋 Checklist Pre-Deploy

- [x] Toate erorile TypeScript rezolvate
- [x] Build-ul rulează cu succes (`npm run build`)
- [x] Adapter Vercel configurat în `astro.config.mjs`
- [x] Fișier `vercel.json` pentru configurare headers
- [x] Verificări null pentru Supabase client
- [x] Script-uri JSON-LD marcate cu `is:inline`

## 🚀 Pași pentru Deploy

### 1. Conectare la Vercel

```bash
# Instalează Vercel CLI (dacă nu e deja instalat)
npm i -g vercel

# Login în Vercel
vercel login

# Deploy din directorul apps/web-astro
cd apps/web-astro
vercel
```

### 2. Configurare Variabile de Mediu în Vercel

Accesează dashboard-ul Vercel și adaugă următoarele variabile de mediu:

#### Variabile Obligatorii:

**IMPORTANT**: Setează aceste variabile în Vercel Dashboard → Settings → Environment Variables

```env
# Supabase (obligatoriu pentru funcționarea site-ului)
PUBLIC_SUPABASE_URL=https://rcnpakhabqbqmnvuwjzo.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjbnBha2hhYnFicW1udnV3anpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1ODI3ODcsImV4cCI6MjA0NDE1ODc4N30.IalgVgBGKcLkuypZqiuC99MMSYPDJ3vz7X4trWKiOiE

# Cross-app navigation (opțional - dacă nu sunt setate, folosește fallback-uri)
PUBLIC_APP_URL=https://app.meseriaslocal.ro
PUBLIC_WEB_URL=https://www.meseriaslocal.ro
```

**Notă**: Dacă nu setezi `PUBLIC_APP_URL`, navbar-ul va folosi automat `https://app.meseriaslocal.ro` în production și `http://localhost:3000` în development.

#### Variabile Opționale (pentru Sanity CMS):

```env
SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=production
SANITY_TOKEN=your_sanity_token
```

### 3. Configurare Build Settings în Vercel

În dashboard-ul Vercel, setează:

- **Framework Preset**: Astro
- **Root Directory**: `apps/web-astro`
- **Build Command**: `npm run build`
- **Output Directory**: `dist` (default pentru Astro)
- **Install Command**: `npm install`

### 4. Configurare Domeniu

După primul deploy, configurează domeniul custom:

1. Mergi la Settings → Domains
2. Adaugă `www.meseriaslocal.ro`
3. Configurează DNS records conform instrucțiunilor Vercel

## 🔧 Configurații Importante

### astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.meseriaslocal.ro',
  output: 'server',
  trailingSlash: 'ignore',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    })
  ],
  build: {
    format: 'directory'
  }
});
```

### vercel.json

```json
{
  "trailingSlash": true,
  "headers": [
    {
      "source": "/(.*)\\.( js|css|png|jpg|jpeg|webp|avif|svg|woff|woff2)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)\\.html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, s-maxage=604800, stale-while-revalidate=2592000"
        }
      ]
    }
  ]
}
```

## 🛠️ Rezolvări Aplicate

### 1. Verificări Null pentru Supabase

Toate fișierele care folosesc clientul Supabase au fost actualizate cu verificări null:

```typescript
// Înainte (eroare TypeScript)
const { data: jobs } = await supabase.from('jobs').select('*');

// După (corect)
if (!supabase) {
  return Astro.redirect('/error', 500);
}
const { data: jobs } = await supabase.from('jobs').select('*');
```

### 2. Script-uri JSON-LD

Toate script-urile JSON-LD au fost marcate cu `is:inline`:

```astro
<!-- Înainte (warning) -->
<script type="application/ld+json" set:html={...} />

<!-- După (corect) -->
<script is:inline type="application/ld+json" set:html={...} />
```

### 3. Fișiere Modificate

- ✅ `src/pages/solicitari/index.astro`
- ✅ `src/pages/solicitari/[slug].astro`
- ✅ `src/pages/meseriasi/[slug].astro`
- ✅ `src/pages/meseriasi/index.astro`
- ✅ `src/pages/servicii/index.astro`
- ✅ `src/pages/servicii/[categorie]/[serviciu]/index.astro`
- ✅ `src/pages/servicii/[categorie]/[serviciu]/[oras]/index.astro`
- ✅ `src/lib/supabase.ts`

## 📊 Build Statistics

Ultimul build de succes:
- **Timp total**: ~216 secunde
- **Pagini generate**: 1000+ (static + server)
- **Erori**: 0
- **Warnings**: 0 (critice)

## 🔍 Verificare Post-Deploy

După deploy, verifică:

1. **Homepage**: https://www.meseriaslocal.ro
2. **Servicii**: https://www.meseriaslocal.ro/servicii
3. **Solicitări**: https://www.meseriaslocal.ro/solicitari
4. **Meseriași**: https://www.meseriaslocal.ro/meseriasi

### Test URLs:

```bash
# Homepage
curl -I https://www.meseriaslocal.ro

# API Health Check (dacă există)
curl https://www.meseriaslocal.ro/api/health

# Verifică headers
curl -I https://www.meseriaslocal.ro/servicii
```

## 🐛 Troubleshooting

### Eroare: "Supabase client not initialized"

**Cauză**: Variabilele de mediu nu sunt setate corect în Vercel.

**Soluție**:
1. Verifică că `PUBLIC_SUPABASE_URL` și `PUBLIC_SUPABASE_ANON_KEY` sunt setate
2. Redeploy după adăugarea variabilelor

### Eroare: Build timeout

**Cauză**: Prea multe pagini statice generate.

**Soluție**:
1. Limitează numărul de pagini în `getStaticPaths()`
2. Consideră hybrid rendering pentru unele rute

### Eroare: 404 pe rute dinamice

**Cauză**: Configurare incorectă a `output` în `astro.config.mjs`.

**Soluție**:
- Asigură-te că `output: 'server'` este setat pentru SSR

## 📝 Note Importante

1. **Supabase Keys**: Cheile sunt publice (ANON_KEY) și pot fi expuse în frontend
2. **Rate Limiting**: Consideră implementarea rate limiting pentru API-uri
3. **Caching**: Headers de cache sunt configurate pentru performanță optimă
4. **Analytics**: Vercel Web Analytics este activat automat

## 🔄 Continuous Deployment

Vercel va face auto-deploy la fiecare push pe branch-ul principal:

- **Production**: `main` branch → www.meseriaslocal.ro
- **Preview**: alte branches → preview URLs

## 📞 Support

Pentru probleme cu deployment-ul:
1. Verifică logs în Vercel Dashboard
2. Rulează `vercel logs` în CLI
3. Verifică [Astro Vercel Adapter Docs](https://docs.astro.build/en/guides/deploy/vercel/)

---

**Status**: ✅ Pregătit pentru Production Deploy
**Ultima verificare**: 6 Noiembrie 2024
**Build Status**: Success ✓
