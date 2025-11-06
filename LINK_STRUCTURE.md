# Structura Link-urilor pentru Servicii

## Link-uri Corecte

### 1. Pagina Index Servicii (`/servicii/`)
Link-urile către servicii individuale:
```
/servicii/{categorySlug}/{tradeSlug}/
```

**Exemplu:**
- `/servicii/instalatii-utilitati/instalatii-sanitare/`
- `/servicii/amenajari-interioare/zugraveli-vopsitorii/`

### 2. Homepage - Servicii Populare
Link-urile către servicii:
```
/servicii/{categorySlug}/{tradeSlug}/
```

### 3. Pagina Serviciu Individual (`/servicii/{categorySlug}/{tradeSlug}/`)
Aici utilizatorul poate:
- Vedea informații despre serviciu
- Selecta orașul dorit
- Link-urile către orașe: `/servicii/{categorySlug}/{tradeSlug}/{citySlug}/`

### 4. Pagina Serviciu + Oraș (`/servicii/{categorySlug}/{tradeSlug}/{citySlug}/`)
Pagina finală cu informații specifice pentru oraș

## Fluxul Utilizatorului

1. **Homepage** → Click pe serviciu → `/servicii/{categorySlug}/{tradeSlug}/`
2. **Pagina Servicii** → Click pe serviciu → `/servicii/{categorySlug}/{tradeSlug}/`
3. **Pagina Serviciu** → Selectează oraș → `/servicii/{categorySlug}/{tradeSlug}/{citySlug}/`

## ❌ Link-uri Greșite (NU folosi)

```
/servicii/{categorySlug}/{tradeSlug}/bucuresti/  ❌ (nu pune orașul direct)
```

## ✅ Link-uri Corecte

```
/servicii/{categorySlug}/{tradeSlug}/  ✅ (lasă utilizatorul să aleagă orașul)
```

## Implementare în Cod

### Astro
```astro
<!-- Corect -->
<a href={`/servicii/${service.categorySlug}/${service.slug}/`}>
  {service.name}
</a>

<!-- Greșit -->
<a href={`/servicii/${service.categorySlug}/${service.slug}/bucuresti/`}>
  {service.name}
</a>
```

### Generare categorySlug
```javascript
const categorySlug = category.toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/ș/g, 's')
  .replace(/ț/g, 't')
  .replace(/ă/g, 'a')
  .replace(/â/g, 'a')
  .replace(/î/g, 'i');
```

## Date din Supabase

Trades table conține:
- `slug` - slug-ul serviciului (ex: `instalatii-sanitare`)
- `category` - numele categoriei (ex: `Instalații și Utilități`)
- `name` - numele serviciului (ex: `Instalații Sanitare`)

Pentru a genera link-ul corect:
1. Ia `categorySlug` din pachetul `@meseriaslocal/data` SAU generează din `category`
2. Ia `slug` din trade
3. Construiește: `/servicii/${categorySlug}/${slug}/`
