/**
 * SEO Fallback Content Generator
 * Generates high-quality, SEO-optimized fallback content for service-city pages
 */

interface FallbackContentParams {
  serviceName: string;
  cityName: string;
  category: string;
  categorySlug: string;
  serviceSlug: string;
  citySlug: string;
  nearbyCities: string[];
  similarServices: string[];
}

interface FallbackContent {
  h1: string;
  title: string;
  description: string;
  content: string;
  schema: any;
  canonical: string;
}

// Category-specific data for better content
const categoryData: Record<string, { 
  benefits: string[]; 
  services: string[]; 
  tips: string[];
  priceRange: string;
}> = {
  'constructii & structuri': {
    benefits: ['Experiență în proiecte rezidențiale și comerciale', 'Materiale de calitate și echipamente profesionale', 'Respectarea normelor de siguranță și construcție', 'Garanție pentru lucrările executate'],
    services: ['Consultanță tehnică gratuită', 'Evaluare și deviz detaliat', 'Execuție conform standardelor', 'Curățenie după finalizare'],
    tips: ['Verifică autorizațiile necesare', 'Cere deviz detaliat înainte', 'Stabilește termene clare în contract', 'Păstrează comunicarea deschisă'],
    priceRange: '500 - 5000+ RON'
  },
  'instalatii & utilitati': {
    benefits: ['Instalatori autorizați ANRE/ISCIR', 'Intervenții rapide în caz de urgență', 'Verificări și certificate de conformitate', 'Garanție extinsă pentru lucrări'],
    services: ['Diagnosticare și depanare', 'Montaj și înlocuire echipamente', 'Verificări periodice', 'Întreținere preventivă'],
    tips: ['Verifică autorizația instalatorului', 'Cere certificat de garanție', 'Programează verificări periodice', 'Păstrează facturile pentru garanție'],
    priceRange: '100 - 2000 RON'
  },
  'amenajari interioare': {
    benefits: ['Design personalizat pentru spațiul tău', 'Finisaje de calitate superioară', 'Atenție la detalii și estetică', 'Transformare completă a spațiului'],
    services: ['Consultanță design interior', 'Zugrăveli și vopsitorii', 'Montaj parchet și gresie', 'Amenajare completă'],
    tips: ['Stabilește un buget realist', 'Alege materiale de calitate', 'Planifică în avans culorile', 'Verifică portofoliul meseriașului'],
    priceRange: '200 - 3000 RON'
  },
  'amenajari exterioare & gradina': {
    benefits: ['Proiecte personalizate pentru exterior', 'Plante și materiale de calitate', 'Sisteme de irigații eficiente', 'Întreținere sezonieră disponibilă'],
    services: ['Amenajare peisagistică', 'Montaj pavaje și alei', 'Garduri și porți', 'Sisteme de irigații'],
    tips: ['Planifică în funcție de sezon', 'Alege plante potrivite climei', 'Prevede sistem de drenaj', 'Întreține regulat spațiul verde'],
    priceRange: '300 - 5000 RON'
  },
  'default': {
    benefits: ['Profesioniști cu experiență dovedită', 'Prețuri competitive și transparente', 'Răspuns rapid la solicitări', 'Garanție pentru servicii'],
    services: ['Evaluare gratuită', 'Execuție profesională', 'Materiale de calitate', 'Suport post-execuție'],
    tips: ['Compară mai multe oferte', 'Verifică recenziile', 'Cere contract scris', 'Stabilește termene clare'],
    priceRange: '100 - 2000 RON'
  }
};

/**
 * Get category data or default
 */
function getCategoryData(category: string) {
  const normalizedCategory = category.toLowerCase();
  for (const [key, data] of Object.entries(categoryData)) {
    if (normalizedCategory.includes(key) || key.includes(normalizedCategory)) {
      return data;
    }
  }
  return categoryData['default'];
}

/**
 * Helper function to capitalize first letter of each word
 */
function capitalizeFirst(str: string): string {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

/**
 * Generate H1 title - optimized for SEO
 */
function generateH1(serviceName: string, cityName: string): string {
  return `${capitalizeFirst(serviceName)} ${cityName} – Meseriași Verificați`;
}

/**
 * Generate Meta Title (50-60 characters ideal)
 */
function generateMetaTitle(serviceName: string, cityName: string): string {
  const capitalizedService = capitalizeFirst(serviceName);
  return `${capitalizedService} ${cityName} | Oferte Gratuite | Meserias Local`;
}

/**
 * Generate Meta Description (150-160 characters)
 */
function generateMetaDescription(serviceName: string, cityName: string): string {
  return `Servicii ${serviceName.toLowerCase()} în ${cityName}. ✓ Meseriași verificați ✓ Oferte gratuite în 2-4h ✓ Prețuri transparente ✓ Recenzii reale. Cere ofertă!`;
}

/**
 * Generate SEO-optimized HTML content with proper structure
 */
function generateFallbackHtml(params: FallbackContentParams): string {
  const { serviceName, cityName, category, categorySlug, serviceSlug } = params;
  
  const serviceLower = serviceName.toLowerCase();
  const serviceCapitalized = capitalizeFirst(serviceName);
  const catData = getCategoryData(category);
  
  let html = '';
  
  // Section 1: Introduction with H2
  html += `<h2 class="text-2xl font-bold text-slate-900 mb-4">Servicii ${serviceCapitalized} în ${cityName}</h2>`;
  html += `<p class="text-slate-700 mb-4 leading-relaxed">Cauți servicii profesionale de ${serviceLower} în ${cityName}? Pe Meserias Local găsești meseriași verificați, cu experiență dovedită și recenzii reale. Primești oferte personalizate în maxim 2-4 ore, compari prețuri și alegi profesionistul potrivit pentru proiectul tău.</p>`;
  
  // Section 2: Benefits list
  html += `<h3 class="text-xl font-semibold text-slate-900 mt-6 mb-3">De ce să alegi profesioniști prin Meserias Local?</h3>`;
  html += `<ul class="list-disc list-inside space-y-2 text-slate-700 mb-6">`;
  catData.benefits.forEach(benefit => {
    html += `<li>${benefit}</li>`;
  });
  html += `</ul>`;
  
  // Section 3: Services included
  html += `<h3 class="text-xl font-semibold text-slate-900 mt-6 mb-3">Ce include serviciul de ${serviceLower}?</h3>`;
  html += `<ul class="list-disc list-inside space-y-2 text-slate-700 mb-6">`;
  catData.services.forEach(service => {
    html += `<li>${service}</li>`;
  });
  html += `</ul>`;
  
  // Section 4: How it works
  html += `<h3 class="text-xl font-semibold text-slate-900 mt-6 mb-3">Cum funcționează?</h3>`;
  html += `<ol class="list-decimal list-inside space-y-2 text-slate-700 mb-6">`;
  html += `<li><strong>Descrie proiectul</strong> – Completezi formularul în 2 minute cu detaliile lucrării</li>`;
  html += `<li><strong>Primești oferte</strong> – Meseriași verificați din ${cityName} îți trimit prețuri în 2-4 ore</li>`;
  html += `<li><strong>Compari și alegi</strong> – Vezi profiluri, recenzii și portofolii, apoi contactezi direct</li>`;
  html += `<li><strong>Lucrarea se execută</strong> – Stabilești detaliile și plătești doar la finalizare</li>`;
  html += `</ol>`;
  
  // Section 5: Tips
  html += `<h3 class="text-xl font-semibold text-slate-900 mt-6 mb-3">Sfaturi utile pentru ${serviceLower}</h3>`;
  html += `<ul class="list-disc list-inside space-y-2 text-slate-700 mb-6">`;
  catData.tips.forEach(tip => {
    html += `<li>${tip}</li>`;
  });
  html += `</ul>`;
  
  // Section 6: CTA
  html += `<div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mt-6">`;
  html += `<p class="text-slate-800 font-medium">Gata să începi? Cere ofertă gratuită pentru ${serviceLower} în ${cityName} și primește propuneri de la profesioniști verificați. Serviciul este 100% gratuit, fără obligații!</p>`;
  html += `</div>`;
  
  return html;
}

/**
 * Generate JSON-LD LocalBusiness schema
 */
function generateSchema(params: FallbackContentParams): any {
  const { serviceName, cityName, serviceSlug, citySlug, categorySlug } = params;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${serviceName} ${cityName} | Meserias Local`,
    description: `Servicii profesionale de ${serviceName.toLowerCase()} în ${cityName}. Meseriași verificați, oferte gratuite.`,
    areaServed: {
      '@type': 'City',
      name: cityName
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityName,
      addressCountry: 'RO'
    },
    url: `https://www.meseriaslocal.ro/servicii/${categorySlug}/${serviceSlug}/${citySlug}/`,
    priceRange: '€€'
  };
}

/**
 * Generate complete fallback content
 */
export function generateFallbackContent(params: FallbackContentParams): FallbackContent {
  const { serviceName, cityName, serviceSlug, citySlug, categorySlug } = params;
  
  return {
    h1: generateH1(serviceName, cityName),
    title: generateMetaTitle(serviceName, cityName),
    description: generateMetaDescription(serviceName, cityName),
    content: generateFallbackHtml(params),
    schema: generateSchema(params),
    canonical: `https://www.meseriaslocal.ro/servicii/${categorySlug}/${serviceSlug}/${citySlug}/`
  };
}

/**
 * Generate H2 section with proper capitalization
 */
function generateH2(text: string): string {
  const words = text.split(' ');
  const capitalized = words.map(word => {
    const smallWords = ['în', 'de', 'la', 'și', 'sau', 'cu', 'pe', 'din'];
    if (smallWords.includes(word.toLowerCase()) && word !== words[0]) {
      return word.toLowerCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalized.join(' ');
}

/**
 * Generate internal links HTML for related services
 */
export function generateRelatedServicesHtml(
  similarServices: Array<{ name: string; slug: string; categorySlug: string }>,
  citySlug: string,
  cityName: string
): string {
  if (similarServices.length === 0) return '';
  
  const links = similarServices
    .slice(0, 3)
    .map(service => 
      `<li><a href="/servicii/${service.categorySlug}/${service.slug}/${citySlug}/" class="text-emerald-600 hover:text-emerald-700 underline">${service.name} în ${cityName}</a></li>`
    )
    .join('\n    ');
  
  return `<h3 class="text-xl font-semibold text-slate-900 mt-6 mb-3">${generateH2(`Servicii Similare în ${cityName}`)}</h3>\n<ul class="list-disc list-inside space-y-2 text-slate-700">\n    ${links}\n</ul>`;
}

/**
 * Generate internal links HTML for related cities
 */
export function generateRelatedCitiesHtml(
  nearbyCities: Array<{ name: string; slug: string }>,
  serviceName: string,
  serviceSlug: string,
  categorySlug: string
): string {
  if (nearbyCities.length === 0) return '';
  
  const links = nearbyCities
    .slice(0, 3)
    .map(city => 
      `<li><a href="/servicii/${categorySlug}/${serviceSlug}/${city.slug}/" class="text-emerald-600 hover:text-emerald-700 underline">${serviceName} în ${city.name}</a></li>`
    )
    .join('\n    ');
  
  return `<h3 class="text-xl font-semibold text-slate-900 mt-6 mb-3">${generateH2(`${serviceName} în Orașe Apropiate`)}</h3>\n<ul class="list-disc list-inside space-y-2 text-slate-700">\n    ${links}\n</ul>`;
}
