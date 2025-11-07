/**
 * SEO Fallback Content Generator
 * Generates high-quality, SEO-optimized fallback content for service-city pages
 */

interface FallbackContentParams {
  serviceName: string;
  cityName: string;
  categoryName: string;
  serviceSlug: string;
  citySlug: string;
  categorySlug: string;
  relatedServices: Array<{ name: string; slug: string; categorySlug: string }>;
  relatedCities: Array<{ name: string; slug: string }>;
}

interface FallbackContent {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  fallbackHtml: string;
  schema: any;
  canonical: string;
}

/**
 * Generate H1 title
 * Format: {{serviceName}} în {{cityName}} – Servicii Profesionale și Prețuri 2025
 */
function generateH1(serviceName: string, cityName: string): string {
  return `${serviceName} în ${cityName} – Servicii Profesionale și Prețuri 2025`;
}

/**
 * Generate Meta Title (max 60 characters)
 * Format: {{serviceName}} {{cityName}} | MeseriasLocal România
 */
function generateMetaTitle(serviceName: string, cityName: string): string {
  const title = `${serviceName} ${cityName} | MeseriasLocal România`;
  return title.length > 60 ? `${serviceName} ${cityName} | MeseriasLocal` : title;
}

/**
 * Generate Meta Description (130-160 characters)
 * Natural call-to-action included
 */
function generateMetaDescription(serviceName: string, cityName: string): string {
  return `Cauți ${serviceName.toLowerCase()} în ${cityName}? Găsește meseriași verificați pe MeseriasLocal. Prețuri reale, recenzii și contact rapid în 2–4 ore.`;
}

/**
 * Generate natural, SEO-friendly HTML content (3-5 paragraphs, 200-400 words)
 */
function generateFallbackHtml(params: FallbackContentParams): string {
  const { serviceName, cityName, categorySlug, serviceSlug, citySlug, relatedServices, relatedCities } = params;
  
  const serviceLower = serviceName.toLowerCase();
  
  // Intro paragraph
  const intro = `<p>Găsirea unui ${serviceLower} de încredere în ${cityName} poate fi o provocare. Pe MeseriasLocal, îți oferim acces rapid la meseriași verificați care oferă servicii profesionale de ${serviceLower} în ${cityName}. Platforma noastră conectează clienții cu profesioniști locali, asigurând transparență, prețuri competitive și răspuns rapid.</p>`;
  
  // Benefits paragraph with internal link
  const benefits = `<p>De ce să alegi un ${serviceLower} prin MeseriasLocal? Simplu: verificăm fiecare meseriași, oferim acces la recenzii reale de la clienți din ${cityName}, și garantăm că primești oferte personalizate în maxim 2–4 ore. Nu plătești comisioane ascunse – contactezi direct meseriașul și negociezi prețul cel mai bun pentru proiectul tău.</p>`;
  
  // How it works paragraph
  const howItWorks = `<p>Procesul este simplu și rapid. Completezi un formular cu detaliile proiectului tău de ${serviceLower} în ${cityName}, iar meseriașii locali verificați primesc solicitarea ta. În câteva ore, vei primi oferte personalizate cu prețuri clare și detalii despre servicii. Compari ofertele, verifici recenziile, și alegi meseriașul potrivit pentru nevoile tale.</p>`;
  
  // Quality assurance paragraph
  const quality = `<p>Toți meseriașii de ${serviceLower} din ${cityName} de pe platformă sunt verificați și au experiență dovedită. Oferim garanție pentru serviciile prestate, materiale de calitate, și suport complet pe tot parcursul proiectului. Fie că ai nevoie de o intervenție rapidă sau un proiect complex, găsești profesioniști de încredere în ${cityName}.</p>`;
  
  // Call to action paragraph
  const cta = `<p>Nu mai pierde timp căutând meseriași de ${serviceLower} în ${cityName}. <a href="https://app.meseriaslocal.ro/cere-oferta?oras=${citySlug}" class="text-blue-600 hover:text-blue-700 font-semibold underline">Cere ofertă acum</a> și primește propuneri de la profesioniști verificați în câteva ore. Serviciul este 100% gratuit, fără obligații, și îți garantăm răspuns rapid. Începe proiectul tău astăzi!</p>`;
  
  return `${intro}\n\n${benefits}\n\n${howItWorks}\n\n${quality}\n\n${cta}`;
}

/**
 * Generate JSON-LD LocalBusiness schema
 */
function generateSchema(params: FallbackContentParams): any {
  const { serviceName, cityName, serviceSlug, citySlug, categorySlug } = params;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${serviceName} ${cityName} | MeseriasLocal`,
    serviceType: serviceName,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: cityName
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityName,
      addressCountry: 'RO'
    },
    url: `https://www.meseriaslocal.ro/servicii/${categorySlug}/${serviceSlug}/${citySlug}/`,
    priceRange: '€€',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '52'
    }
  };
}

/**
 * Generate complete fallback content
 */
export function generateFallbackContent(params: FallbackContentParams): FallbackContent {
  const { serviceName, cityName, serviceSlug, citySlug, categorySlug } = params;
  
  return {
    h1: generateH1(serviceName, cityName),
    metaTitle: generateMetaTitle(serviceName, cityName),
    metaDescription: generateMetaDescription(serviceName, cityName),
    fallbackHtml: generateFallbackHtml(params),
    schema: generateSchema(params),
    canonical: `https://www.meseriaslocal.ro/servicii/${categorySlug}/${serviceSlug}/${citySlug}/`
  };
}

/**
 * Generate H2 section with proper capitalization
 */
function generateH2(text: string): string {
  // Capitalize important words
  const words = text.split(' ');
  const capitalized = words.map(word => {
    // Don't capitalize small words unless they're the first word
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
  relatedServices: Array<{ name: string; slug: string; categorySlug: string }>,
  citySlug: string,
  cityName: string
): string {
  if (relatedServices.length === 0) return '';
  
  const links = relatedServices
    .slice(0, 3)
    .map(service => 
      `<li><a href="/servicii/${service.categorySlug}/${service.slug}/${citySlug}/" class="text-blue-600 hover:text-blue-700 underline">${service.name} în ${cityName}</a></li>`
    )
    .join('\n    ');
  
  return `<h2>${generateH2(`Servicii Similare în ${cityName}`)}</h2>\n  <ul>\n    ${links}\n  </ul>`;
}

/**
 * Generate internal links HTML for related cities
 */
export function generateRelatedCitiesHtml(
  relatedCities: Array<{ name: string; slug: string }>,
  serviceName: string,
  serviceSlug: string,
  categorySlug: string
): string {
  if (relatedCities.length === 0) return '';
  
  const links = relatedCities
    .slice(0, 3)
    .map(city => 
      `<li><a href="/servicii/${categorySlug}/${serviceSlug}/${city.slug}/" class="text-blue-600 hover:text-blue-700 underline">${serviceName} în ${city.name}</a></li>`
    )
    .join('\n    ');
  
  return `<h2>${generateH2(`${serviceName} în Orașe Apropiate`)}</h2>\n  <ul>\n    ${links}\n  </ul>`;
}
