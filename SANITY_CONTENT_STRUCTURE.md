# Structura Conținut Sanity - Ghid Complet

## Problema Rezolvată ✅

**Problema:** Când creai o pagină pentru un oraș în Sanity (ex: Zugraveli București), conținutul apărea și pe pagina generală de serviciu (fără oraș).

**Cauza:** Funcția `getServicePage()` avea un fallback care lua prima pagină cu oraș dacă nu găsea pagină generală.

**Soluție:** Am eliminat fallback-ul periculos. Acum sistemul respectă strict separarea între:
- Pagini generale de serviciu (fără oraș)
- Pagini specifice pentru oraș

---

## Structura Paginilor

### 1. Pagină Generală de Serviciu
**URL:** `/servicii/[categorie]/[serviciu]/`  
**Exemplu:** `/servicii/instalatii-sanitare/zugraveli-vopsitorii/`

**În Sanity:**
- `tradeSlug`: "zugraveli-vopsitorii" ✅
- `citySlug`: **LASĂ GOL** sau **NU COMPLETA** ⚠️

**Când se folosește:**
- Pagina principală a serviciului
- Listează toate orașele disponibile
- Conținut general despre serviciu

---

### 2. Pagină Specifică pentru Oraș
**URL:** `/servicii/[categorie]/[serviciu]/[oras]/`  
**Exemplu:** `/servicii/instalatii-sanitare/zugraveli-vopsitorii/bucuresti/`

**În Sanity:**
- `tradeSlug`: "zugraveli-vopsitorii" ✅
- `citySlug`: "bucuresti" ✅

**Când se folosește:**
- Pagina specifică pentru un oraș
- Conținut localizat (prețuri locale, sfaturi locale, etc.)
- Informații relevante pentru orașul respectiv

---

## Cum Funcționează Query-urile

### Pentru Pagina Generală (`getServicePage`)
```typescript
// Caută DOAR pagini fără oraș
*[
  _type == "servicePage" &&
  lower(tradeSlug) == "zugraveli-vopsitorii" &&
  (!defined(citySlug) || citySlug == "") &&
  isPublished == true
]
```

**Rezultat:**
- ✅ Găsește: Pagini cu `citySlug` gol
- ❌ NU găsește: Pagini cu `citySlug` completat (București, Cluj, etc.)

---

### Pentru Pagina de Oraș (`getServiceCityPage`)
```typescript
// 1. Caută pagină specifică pentru oraș
*[
  _type == "servicePage" &&
  lower(tradeSlug) == "zugraveli-vopsitorii" &&
  lower(citySlug) == "bucuresti" &&
  isPublished == true
]

// 2. Dacă nu găsește, fallback la pagina generală (fără oraș)
*[
  _type == "servicePage" &&
  lower(tradeSlug) == "zugraveli-vopsitorii" &&
  (!defined(citySlug) || citySlug == "") &&
  isPublished == true
]
```

**Rezultat:**
- ✅ Prioritate: Pagină specifică pentru București
- ✅ Fallback: Pagină generală (dacă nu există pagină pentru București)
- ❌ NU ia: Pagini pentru alte orașe (Cluj, Timișoara, etc.)

---

## Exemple Practice

### ✅ Corect: Pagină pentru București

**În Sanity Studio:**
```
Titlu: Zugraveli București - Ghid Complet 2025
tradeSlug: zugraveli-vopsitorii
citySlug: bucuresti
```

**Rezultat:**
- Apare pe: `/servicii/instalatii-sanitare/zugraveli-vopsitorii/bucuresti/`
- NU apare pe: `/servicii/instalatii-sanitare/zugraveli-vopsitorii/`

---

### ✅ Corect: Pagină Generală

**În Sanity Studio:**
```
Titlu: Zugraveli - Găsește Meseriași Verificați
tradeSlug: zugraveli-vopsitorii
citySlug: [LASĂ GOL]
```

**Rezultat:**
- Apare pe: `/servicii/instalatii-sanitare/zugraveli-vopsitorii/`
- Apare ca fallback pe: Toate paginile de oraș care nu au conținut specific

---

### ❌ Greșit: Amesteci Conținutul

**Greșeala:**
```
Pagină 1:
- tradeSlug: zugraveli-vopsitorii
- citySlug: bucuresti

Pagină 2:
- tradeSlug: zugraveli-vopsitorii
- citySlug: [GOL]  ← Nu există!
```

**Problema:**
- Pagina generală `/servicii/.../zugraveli-vopsitorii/` nu are conținut
- Folosește fallback-ul automat (conținut generat)
- Pagina de București funcționează corect

**Soluție:**
- Creează o pagină generală cu `citySlug` gol
- Sau lasă pagina generală să folosească fallback-ul automat

---

## Workflow Recomandat

### Opțiunea 1: Conținut Specific pentru Fiecare Oraș
```
1. Creează pagină generală (citySlug gol)
   → Conținut general despre serviciu
   
2. Creează pagini pentru orașe importante
   → București: conținut specific
   → Cluj: conținut specific
   → Timișoara: conținut specific
   
3. Orașele fără pagină specifică
   → Folosesc automat pagina generală ca fallback
```

### Opțiunea 2: Doar Orașe Importante
```
1. NU creezi pagină generală
   → Pagina generală folosește fallback automat
   
2. Creezi pagini doar pentru orașe mari
   → București: conținut specific
   → Cluj: conținut specific
   
3. Toate celelalte orașe
   → Folosesc fallback automat (conținut generat)
```

---

## Verificare în Development

Când rulezi site-ul local, vezi în consolă:

### Pentru Pagina Generală:
```
🔍 Sanity getServicePage (no city):
  Input tradeSlug: zugraveli-vopsitorii
  Result: ✅ Found
  Found citySlug: N/A (general page)
  Is general page: true
```

### Pentru Pagina de Oraș:
```
🔍 Sanity getServiceCityPage:
  Input tradeSlug: zugraveli-vopsitorii
  Input citySlug: bucuresti
  Result: ✅ Found
  Found tradeSlug: zugraveli-vopsitorii
  Found citySlug: bucuresti
```

### Când Nu Găsește Conținut:
```
⚠️ No Sanity content for zugraveli-vopsitorii/cluj-napoca
   Falling back to generated SEO content.
```

---

## Checklist Înainte de Publicare

- [ ] Pagina generală are `citySlug` **GOL**
- [ ] Paginile de oraș au `citySlug` **COMPLETAT**
- [ ] Toate paginile au `isPublished = true`
- [ ] Verificat în development că nu se amestecă conținutul
- [ ] Testat că fallback-ul funcționează pentru orașe fără conținut

---

## Întrebări Frecvente

**Q: Pot avea aceeași pagină pentru mai multe orașe?**  
A: Nu direct. Trebuie să creezi câte o pagină pentru fiecare oraș. Sau lasă orașele să folosească pagina generală ca fallback.

**Q: Ce se întâmplă dacă nu creez pagină generală?**  
A: Pagina generală va folosi conținut generat automat (SEO fallback). Funcționează perfect!

**Q: Pot avea conținut diferit pentru București vs Cluj?**  
A: Da! Creezi două pagini separate:
- Una cu `citySlug: bucuresti`
- Una cu `citySlug: cluj-napoca`

**Q: Cum șterg o pagină?**  
A: În Sanity Studio, setează `isPublished = false` sau șterge documentul complet.

---

## Suport Tehnic

Dacă întâmpini probleme:
1. Verifică console-ul în development mode
2. Asigură-te că `tradeSlug` și `citySlug` sunt corecte
3. Verifică că pagina are `isPublished = true`
4. Verifică că nu ai duplicate (aceeași combinație tradeSlug + citySlug)
