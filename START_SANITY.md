# 🚀 Cum să Pornești Sanity Studio

## Metoda 1: Din Terminal

### Pasul 1: Deschide Terminal
- **Mac:** Apasă `Cmd + Space`, scrie "Terminal", Enter
- **Windows:** Apasă `Win + R`, scrie "cmd", Enter
- **VS Code:** Apasă `` Ctrl + ` `` (backtick)

### Pasul 2: Navighează la Folder
```bash
cd sanity-studio
```

### Pasul 3: Pornește Studio
```bash
npm run dev
```

### Pasul 4: Deschide în Browser
Vei vedea un mesaj ca:
```
Local:   http://localhost:3333
```

Deschide în browser: **http://localhost:3333**

---

## Metoda 2: Din VS Code (Dacă folosești VS Code)

### Pasul 1: Deschide Terminal în VS Code
- Apasă `` Ctrl + ` `` (backtick) sau
- Menu: Terminal → New Terminal

### Pasul 2: Rulează Comenzile
```bash
cd sanity-studio
npm run dev
```

### Pasul 3: Click pe Link
VS Code va afișa un link clickable: `http://localhost:3333`
Click pe el pentru a deschide Sanity Studio.

---

## 🔐 Login în Sanity Studio

Când deschizi pentru prima dată, vei vedea:

```
┌─────────────────────────────────┐
│                                 │
│     🎨 Sanity Studio           │
│                                 │
│     [Login with Google]         │
│     [Login with GitHub]         │
│     [Login with Email]          │
│                                 │
└─────────────────────────────────┘
```

Alege metoda cu care te-ai înregistrat pe Sanity.

---

## 📝 După Login

Vei vedea dashboard-ul Sanity Studio:

```
┌─────────────────────────────────────────────┐
│ Sanity Studio                               │
├─────────────────────────────────────────────┤
│                                             │
│  📄 Service Pages (Pagini Servicii)        │
│  📝 Blog Posts                              │
│  📂 Blog Categories                         │
│  👤 Authors                                 │
│                                             │
└─────────────────────────────────────────────┘
```

Click pe **"Service Pages"** pentru a vedea toate paginile tale.

---

## 🎯 Găsește Pagina Ta

1. Click pe **"Service Pages"** în sidebar
2. Vei vedea lista de pagini:
   ```
   📄 Zugraveli București
   📄 Electricieni Cluj
   📄 Instalatori Timișoara
   ...
   ```
3. Click pe pagina pe care vrei să o editezi

---

## ✏️ Editează Conținutul

Vei vedea formularul de editare cu câmpuri:

```
┌─────────────────────────────────────────┐
│ Title: Zugraveli București              │
├─────────────────────────────────────────┤
│ Trade Slug: zugraveli-vopsitorii        │
├─────────────────────────────────────────┤
│ City Slug: bucuresti                    │
├─────────────────────────────────────────┤
│ Content: [Editor mare aici]             │
│                                         │
│  [B] [I] [U] [H2▼] [•] [1.]           │
│  ┌─────────────────────────────────┐   │
│  │ Cauți zugrav bun în București?  │   │
│  │ Zugravi București...             │   │
│  └─────────────────────────────────┘   │
│                                         │
├─────────────────────────────────────────┤
│ FAQ Section: [+] Add item               │
├─────────────────────────────────────────┤
│ Price Ranges: [+] Add item              │
└─────────────────────────────────────────┘

                    [Publish] [Save Draft]
```

---

## 💾 Salvează Modificările

### Opțiune 1: Save Draft (Salvează Draft)
- Salvează modificările dar NU le publică
- Bun pentru work in progress

### Opțiune 2: Publish (Publică)
- Salvează ȘI publică modificările
- Modificările vor apărea pe site în 1-2 minute

---

## 🔄 Rebuild Site-ul (Dacă e Necesar)

După ce publici în Sanity, site-ul trebuie să facă rebuild pentru a vedea modificările.

### Opțiunea 1: Așteaptă Rebuild Automat
Dacă ai configurat webhook-uri, site-ul se va rebuilda automat în 2-5 minute.

### Opțiunea 2: Rebuild Manual (Vercel)
1. Du-te pe **vercel.com**
2. Găsește proiectul tău
3. Click pe **"Deployments"**
4. Click pe **"Redeploy"**

---

## 🎨 Verifică Modificările

După rebuild:
1. Deschide pagina ta pe site
2. Apasă **Ctrl+F5** (hard refresh) pentru a șterge cache-ul
3. Verifică că modificările apar corect

---

## 🛑 Oprește Sanity Studio

Când ai terminat:
1. În terminal, apasă **Ctrl+C**
2. Confirmă cu **Y** (Yes)

---

## 🆘 Probleme Comune

### ❌ "npm: command not found"
**Soluție:** Trebuie să instalezi Node.js
- Du-te pe **nodejs.org**
- Descarcă și instalează versiunea LTS
- Restart terminal

### ❌ "Port 3333 is already in use"
**Soluție:** Sanity Studio deja rulează
- Deschide **http://localhost:3333** în browser
- SAU oprește procesul vechi și pornește din nou

### ❌ "Cannot find module..."
**Soluție:** Instalează dependențele
```bash
cd sanity-studio
npm install
npm run dev
```

### ❌ "Authentication failed"
**Soluție:** 
- Verifică că ai cont pe **sanity.io**
- Încearcă să te loghezi din nou
- Verifică că ai acces la proiect

---

## 📞 Need Help?

Dacă întâmpini probleme, spune-mi și te ajut! 🚀

---

## 🎯 Next Steps

După ce pornești Sanity Studio:
1. ✅ Login
2. ✅ Găsește pagina ta
3. ✅ Editează conținutul
4. ✅ Aplică formatarea (vezi **GHID_FORMATARE_SANITY.md**)
5. ✅ Publică
6. ✅ Verifică pe site

Succes! 🎉
