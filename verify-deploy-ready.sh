#!/bin/bash

# Script pentru verificarea pregătirii deployment-ului pe Vercel
# Rulează: chmod +x verify-deploy-ready.sh && ./verify-deploy-ready.sh

echo "🔍 Verificare pregătire deployment Vercel..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# 1. Verifică dacă există fișierele necesare
echo "📁 Verificare fișiere necesare..."

if [ -f "astro.config.mjs" ]; then
    echo -e "${GREEN}✓${NC} astro.config.mjs există"
else
    echo -e "${RED}✗${NC} astro.config.mjs lipsește"
    ((ERRORS++))
fi

if [ -f "vercel.json" ]; then
    echo -e "${GREEN}✓${NC} vercel.json există"
else
    echo -e "${YELLOW}⚠${NC} vercel.json lipsește (opțional)"
    ((WARNINGS++))
fi

if [ -f "package.json" ]; then
    echo -e "${GREEN}✓${NC} package.json există"
else
    echo -e "${RED}✗${NC} package.json lipsește"
    ((ERRORS++))
fi

if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env există"
else
    echo -e "${YELLOW}⚠${NC} .env lipsește (variabilele trebuie setate în Vercel)"
    ((WARNINGS++))
fi

echo ""

# 2. Verifică variabilele de mediu din .env
echo "🔐 Verificare variabile de mediu..."

if [ -f ".env" ]; then
    if grep -q "PUBLIC_SUPABASE_URL" .env; then
        echo -e "${GREEN}✓${NC} PUBLIC_SUPABASE_URL este setat"
    else
        echo -e "${RED}✗${NC} PUBLIC_SUPABASE_URL lipsește"
        ((ERRORS++))
    fi

    if grep -q "PUBLIC_SUPABASE_ANON_KEY" .env; then
        echo -e "${GREEN}✓${NC} PUBLIC_SUPABASE_ANON_KEY este setat"
    else
        echo -e "${RED}✗${NC} PUBLIC_SUPABASE_ANON_KEY lipsește"
        ((ERRORS++))
    fi

    if grep -q "PUBLIC_APP_URL" .env; then
        echo -e "${GREEN}✓${NC} PUBLIC_APP_URL este setat"
    else
        echo -e "${YELLOW}⚠${NC} PUBLIC_APP_URL lipsește"
        ((WARNINGS++))
    fi
fi

echo ""

# 3. Verifică dependențele
echo "📦 Verificare dependențe..."

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules există"
else
    echo -e "${YELLOW}⚠${NC} node_modules lipsește - rulează 'npm install'"
    ((WARNINGS++))
fi

# Verifică dacă @astrojs/vercel este instalat
if grep -q "@astrojs/vercel" package.json; then
    echo -e "${GREEN}✓${NC} @astrojs/vercel este în package.json"
else
    echo -e "${RED}✗${NC} @astrojs/vercel lipsește din package.json"
    ((ERRORS++))
fi

echo ""

# 4. Rulează TypeScript check
echo "🔍 Verificare TypeScript..."

if npm run typecheck > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} TypeScript check passed"
else
    echo -e "${RED}✗${NC} TypeScript check failed - rulează 'npm run typecheck' pentru detalii"
    ((ERRORS++))
fi

echo ""

# 5. Încearcă build
echo "🏗️  Testare build..."

if npm run build > /tmp/build.log 2>&1; then
    echo -e "${GREEN}✓${NC} Build successful"
    
    # Verifică dacă dist există
    if [ -d "dist" ]; then
        echo -e "${GREEN}✓${NC} Directorul dist a fost generat"
    else
        echo -e "${RED}✗${NC} Directorul dist lipsește"
        ((ERRORS++))
    fi
    
    # Verifică dacă .vercel/output există
    if [ -d ".vercel/output" ]; then
        echo -e "${GREEN}✓${NC} Directorul .vercel/output a fost generat"
    else
        echo -e "${YELLOW}⚠${NC} Directorul .vercel/output lipsește"
        ((WARNINGS++))
    fi
else
    echo -e "${RED}✗${NC} Build failed - vezi /tmp/build.log pentru detalii"
    echo ""
    echo "Ultimele 20 linii din build log:"
    tail -20 /tmp/build.log
    ((ERRORS++))
fi

echo ""

# 6. Verifică configurația Astro
echo "⚙️  Verificare configurație Astro..."

if grep -q "output: 'server'" astro.config.mjs; then
    echo -e "${GREEN}✓${NC} Output mode: server (SSR activat)"
elif grep -q "output: 'hybrid'" astro.config.mjs; then
    echo -e "${GREEN}✓${NC} Output mode: hybrid"
else
    echo -e "${YELLOW}⚠${NC} Output mode: static (consideră SSR pentru rute dinamice)"
    ((WARNINGS++))
fi

if grep -q "adapter: vercel" astro.config.mjs; then
    echo -e "${GREEN}✓${NC} Vercel adapter configurat"
else
    echo -e "${RED}✗${NC} Vercel adapter nu este configurat"
    ((ERRORS++))
fi

echo ""

# Sumar final
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 SUMAR VERIFICARE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ Totul este perfect! Proiectul este pregătit pentru deploy.${NC}"
    echo ""
    echo "Următorii pași:"
    echo "1. Rulează: vercel"
    echo "2. Setează variabilele de mediu în Vercel Dashboard"
    echo "3. Deploy: vercel --prod"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠ $WARNINGS warning(s) găsite${NC}"
    echo "Proiectul poate fi deploiat, dar verifică warning-urile."
    exit 0
else
    echo -e "${RED}✗ $ERRORS eroare(i) găsite${NC}"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠ $WARNINGS warning(s) găsite${NC}"
    fi
    echo ""
    echo "Rezolvă erorile înainte de deploy!"
    exit 1
fi
