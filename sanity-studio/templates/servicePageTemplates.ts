/**
 * Template helpers for creating service pages quickly
 */

export interface ServicePageTemplateParams {
  tradeName: string;
  tradeSlug: string;
  cityName: string;
  citySlug: string;
  categoryName?: string;
  categorySlug?: string;
}

export function generateServicePageTemplate({
  tradeName,
  tradeSlug,
  cityName,
  citySlug,
  categoryName,
  categorySlug,
}: ServicePageTemplateParams) {
  const title = `${tradeName} ${cityName} - Ghid complet 2026`;
  
  return {
    title,
    slug: {
      _type: 'slug',
      current: `${tradeSlug}-${citySlug}`,
    },
    tradeName,
    tradeSlug,
    cityName,
    citySlug,
    categoryName: categoryName || '',
    categorySlug: categorySlug || '',
    metaDescription: `Găsește cei mai buni meseriași ${tradeName} în ${cityName}. Compară oferte gratuite, vezi recenzii și contactează direct. Fără comisioane, răspuns în 24h.`,
    heroDescription: `Conectează-te cu meseriași ${tradeName} verificați din ${cityName}. Oferte gratuite în 24h, prețuri corecte, fără comisioane.`,
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: `De ce să alegi ${tradeName} din ${cityName}?` }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: `Găsirea unui ${tradeName.toLowerCase()} de încredere în ${cityName} poate fi o provocare. Platforma noastră îți simplifică procesul, conectându-te cu meseriași verificați care oferă servicii de calitate la prețuri corecte.`,
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: `Servicii ${tradeName} disponibile în ${cityName}` }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Instalări și montaje noi' }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Reparații și mentenanță' }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Servicii de urgență' }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Consultanță tehnică' }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Inspecții și verificări' }],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: `Cum funcționează procesul?` }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: `Procesul de găsire a unui ${tradeName.toLowerCase()} în ${cityName} este simplu și rapid:`,
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        children: [{ _type: 'span', text: 'Postezi cererea gratuită cu detaliile proiectului' }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        children: [{ _type: 'span', text: 'Primești oferte personalizate în 24h' }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        children: [{ _type: 'span', text: 'Compari prețurile și recenziile' }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        children: [{ _type: 'span', text: 'Alegi meseriașul potrivit și contactezi direct' }],
      },
    ],
    faqSection: [
      {
        question: `Cât costă serviciile de ${tradeName} în ${cityName}?`,
        answer: `Prețurile pentru ${tradeName} în ${cityName} variază în funcție de complexitatea lucrării, materialele necesare și urgența proiectului. Prin platforma noastră poți primi oferte gratuite de la mai mulți meseriași și poți compara prețurile pentru a alege cea mai bună opțiune.`,
      },
      {
        question: `Cum aleg cel mai bun ${tradeName} din ${cityName}?`,
        answer: `Toți meseriașii ${tradeName} de pe platformă sunt verificați. Poți compara ofertele, citi recenziile clienților anteriori, verifica portfoliul și experiența fiecărui specialist pentru a lua cea mai bună decizie.`,
      },
      {
        question: `Cât durează să primesc oferte?`,
        answer: `De obicei, primești primele oferte în câteva ore după postarea cererii. Majoritatea meseriașilor ${tradeName} din ${cityName} răspund în maxim 24h.`,
      },
      {
        question: `Plătesc ceva pentru a folosi platforma?`,
        answer: `Nu, serviciul nostru este complet gratuit pentru clienți. Nu plătești nimic pentru a posta cereri, primi oferte sau contacta meseriași. Plătești doar meseriașul ales pentru serviciile efectuate.`,
      },
    ],
    localTips: [
      {
        title: `Zone populare în ${cityName}`,
        description: `Meseriașii noștri acoperă toate zonele din ${cityName} și împrejurimi, asigurând servicii rapide oriunde ai nevoie.`,
      },
      {
        title: 'Disponibilitate',
        description: `Mulți meseriași ${tradeName} din ${cityName} oferă servicii de urgență și pot interveni rapid în situații neprevăzute.`,
      },
    ],
    seoKeywords: [
      `${tradeName.toLowerCase()} ${cityName.toLowerCase()}`,
      `meseriasi ${tradeName.toLowerCase()} ${cityName.toLowerCase()}`,
      `servicii ${tradeName.toLowerCase()} ${cityName.toLowerCase()}`,
      `pret ${tradeName.toLowerCase()} ${cityName.toLowerCase()}`,
      `${tradeName.toLowerCase()} profesionist ${cityName.toLowerCase()}`,
    ],
    isPublished: false,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    priority: 0.8,
  };
}

// Common Romanian cities for quick reference
export const MAJOR_CITIES = [
  { name: 'București', slug: 'bucuresti' },
  { name: 'Cluj-Napoca', slug: 'cluj-napoca' },
  { name: 'Timișoara', slug: 'timisoara' },
  { name: 'Iași', slug: 'iasi' },
  { name: 'Constanța', slug: 'constanta' },
  { name: 'Craiova', slug: 'craiova' },
  { name: 'Brașov', slug: 'brasov' },
  { name: 'Galați', slug: 'galati' },
  { name: 'Ploiești', slug: 'ploiesti' },
  { name: 'Oradea', slug: 'oradea' },
];

// Common trades for quick reference
export const POPULAR_TRADES = [
  { name: 'Electrician', slug: 'electrician', category: 'Instalații electrice', categorySlug: 'instalatii-electrice' },
  { name: 'Instalator', slug: 'instalator', category: 'Instalații sanitare', categorySlug: 'instalatii-sanitare' },
  { name: 'Zugrav', slug: 'zugrav', category: 'Finisaje', categorySlug: 'finisaje' },
  { name: 'Tâmplar', slug: 'tamplar', category: 'Tâmplărie', categorySlug: 'tamplarie' },
  { name: 'Zidar', slug: 'zidar', category: 'Construcții', categorySlug: 'constructii' },
  { name: 'Instalator gaze', slug: 'instalator-gaze', category: 'Instalații gaze', categorySlug: 'instalatii-gaze' },
  { name: 'Instalator aer condiționat', slug: 'instalator-aer-conditionat', category: 'Climatizare', categorySlug: 'climatizare' },
  { name: 'Parchetar', slug: 'parchetar', category: 'Finisaje', categorySlug: 'finisaje' },
];
