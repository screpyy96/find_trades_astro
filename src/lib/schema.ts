// Schema.org structured data for SEO
interface HomepageStats {
  totalWorkers: number;
  totalCities: number;
  totalTrades: number;
  totalReviews: number;
}

interface Trade {
  id?: number;
  name: string;
  slug: string;
  category?: string;
  description?: string | null;
}

interface ServiceStats {
  totalWorkers: number;
  totalCities: number;
  avgRating: number;
  recentProjects: number;
}

// Helper function to generate category slug
const generateCategorySlug = (category: string) => {
  return category.toLowerCase()
    .replace(/\s+&\s+/g, '-')
    .replace(/&/g, '')
    .replace(/\s+/g, '-')
    .replace(/ș/g, 's')
    .replace(/ț/g, 't')
    .replace(/ă/g, 'a')
    .replace(/â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
};

export function generateHomepageSchema(stats: HomepageStats, trades: Trade[]) {
  const baseUrl = "https://www.findtrades.app";

  const organization = {
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "FindTrades",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo.png`,
      "width": 300,
      "height": 100
    },
    "description": "The #1 platform for verified tradesmen in the UK",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB",
      "addressLocality": "London"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+447930097259",
      "contactType": "customer service",
      "availableLanguage": "English",
      "email": "contact@findtrades.app"
    },
    "sameAs": [
      "https://www.facebook.com/localmeserias",
      "https://www.instagram.com/MeseriasLocal",
      "https://www.linkedin.com/company/MeseriasLocal"
    ],
    "foundingDate": "2023",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 10,
      "maxValue": 50
    },
    "areaServed": getCitiesSchema()
  };

  const website = {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "FindTrades",
    "description": "The #1 platform for verified tradesmen in the UK",
    "publisher": { "@id": `${baseUrl}/#organization` },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/tradesmen/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-GB"
  };

  const webpage = {
    "@type": "WebPage",
    "@id": `${baseUrl}/#webpage`,
    "url": baseUrl,
    "name": "Verified Tradesmen and Professionals in UK | FindTrades",
    "isPartOf": { "@id": `${baseUrl}/#website` },
    "about": { "@id": `${baseUrl}/#organization` },
    "description": `The #1 platform for verified tradesmen in the UK. ${stats.totalWorkers}+ professionals, ${stats.totalCities}+ cities, ${stats.totalReviews}+ reviews.`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      }]
    },
    "mainEntity": getMainServiceSchema(baseUrl),
    "datePublished": "2023-01-01",
    "inLanguage": "en-GB"
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      website,
      webpage,
      getTradesListSchema(trades, stats, baseUrl),
      getServiceSchema(baseUrl, stats, trades),
      getFAQSchema(),
      getLocalBusinessSchema(baseUrl, stats)
    ]
  };
}

function getCitiesSchema() {
  const cities = [
    "București", "Cluj-Napoca", "Timișoara", "Iași", "Constanța",
    "Craiova", "Brașov", "Galați", "Ploiești", "Oradea",
    "Brăila", "Arad", "Pitești", "Sibiu", "Bacău",
    "Târgu Mureș", "Baia Mare", "Buzău", "Botoșani", "Satu Mare"
  ];

  return cities.map(city => ({
    "@type": "City",
    "name": city,
    "containedInPlace": {
      "@type": "Country",
      "name": "United Kingdom"
    }
  }));
}

function getMainServiceSchema(baseUrl: string) {
  return {
    "@type": "Service",
    "name": "Verified Tradesmen Platform",
    "description": "Connecting customers with verified and reliable tradesmen",
    "provider": { "@id": `${baseUrl}/#organization` },
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "serviceType": [
      "Plumbers", "Electricians", "Painters",
      "Builders", "Renovations", "Repairs",
      "Carpenters", "Bricklayers", "Roofers"
    ]
  };
}

function getTradesListSchema(trades: Trade[], stats: HomepageStats, baseUrl: string) {
  return {
    "@type": "ItemList",
    "name": "Services Profesionale Disponibile",
    "description": `${stats.totalTrades} specializări disponibile pe platformă`,
    "numberOfItems": stats.totalTrades,
    "itemListElement": trades.slice(0, 10).map((trade, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": trade.name,
        "url": `${baseUrl}/tradesmen/?q=${encodeURIComponent(trade.name)}`,
        "description": `Găsește ${trade.name} verificați în zona ta.`,
        "provider": { "@id": `${baseUrl}/#organization` }
      }
    }))
  };
}

function getServiceSchema(baseUrl: string, stats: HomepageStats, trades: Trade[]) {
  return {
    "@type": "Service",
    "@id": `${baseUrl}/#service`,
    "name": "Tradesmen Connection Platform",
    "description": "Service connecting customers and verified tradesmen in the UK",
    "provider": { "@id": `${baseUrl}/#organization` },
    "serviceType": "Professional Services Platform",
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Professional Services Available",
      "itemListElement": trades.slice(0, 15).map(trade => ({
        "@type": "OfferCatalog",
        "name": trade.name,
        "description": `Services de ${trade.name} în România`
      }))
    }
  };
}

function getFAQSchema() {
  return {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Cum funcționează Meserias Local?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Postezi gratuit ce ai nevoie, iar noi îți aducem meseriașii potriviți din zona ta. Primești oferte direct și poți alege cel mai bun preț și calitate. Procesul este simplu: descrii lucrarea, primești oferte în 24h, compari prețurile și alegi meseriașul potrivit."
        }
      },
      {
        "@type": "Question",
        "name": "Sunt meseriașii verificați?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Da, toți meseriașii sunt verificați personal. Confirmăm identitatea, experiența profesională și validăm referințele. Plus, ai acces la recenzii reale de la clienți anteriori pentru fiecare specialist."
        }
      },
      {
        "@type": "Question",
        "name": "Este gratuit să postez o cerere?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Da, postarea cererilor este complet gratuită. Primești oferte direct de la meseriași din zona ta fără niciun cost. Plătești doar pentru serviciul ales, după finalizarea lucrării."
        }
      },
      {
        "@type": "Question",
        "name": "În ce orașe oferiți servicii?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Acoperim peste 42 de orașe din România, inclusiv toate marile centre urbane: București, Cluj-Napoca, Timișoara, Iași, Constanța, Brașov, Craiova, Galați, Ploiești, Oradea și multe altele."
        }
      },
      {
        "@type": "Question",
        "name": "Cât durează până primesc oferte?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De obicei primești primele oferte în câteva ore, iar în 24 de ore ai deja mai multe propuneri de la meseriași din zona ta. Poți compara prețurile și alege oferta care ți se potrivește cel mai bine."
        }
      }
    ]
  };
}

function getLocalBusinessSchema(baseUrl: string, stats: HomepageStats) {
  return {
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    "name": "FindTrades",
    "description": "The #1 platform for verified tradesmen in the UK",
    "url": baseUrl,
    "telephone": "+447930097259",
    "email": "contact@findtrades.app",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB",
      "addressLocality": "London"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.5074,
      "longitude": -0.1278
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "$$",
    "currenciesAccepted": "GBP",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "areaServed": getCitiesSchema()
    // aggregateRating removed - add only when you have real reviews from users
  };
}

// Schema for individual service city pages
export function generateServiceCitySchema(params: {
  serviceName: string;
  serviceSlug: string;
  categorySlug: string;
  cityName: string;
  citySlug: string;
  description?: string;
}) {
  const { serviceName, serviceSlug, categorySlug, cityName, citySlug, description } = params;
  const baseUrl = "https://www.findtrades.app";
  const pageUrl = `${baseUrl}/services/${categorySlug}/${serviceSlug}/${citySlug}/`;
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": `${serviceName} ${cityName} - Verified Tradesmen`,
        "description": description || `Find the best ${serviceName} in ${cityName}. Verified tradesmen, real reviews, free quotes.`,
        "isPartOf": { "@id": `${baseUrl}/#website` },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": baseUrl
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Services",
              "item": `${baseUrl}/services/`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": serviceName,
              "item": `${baseUrl}/services/${categorySlug}/${serviceSlug}/`
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": cityName,
              "item": pageUrl
            }
          ]
        }
      },
      {
        "@type": "Service",
        "name": `${serviceName} ${cityName}`,
        "description": description || `Services profesionale de ${serviceName} în ${cityName}`,
        "provider": { "@id": `${baseUrl}/#organization` },
        "areaServed": {
          "@type": "City",
          "name": cityName,
          "addressCountry": "GB"
        },
        "serviceType": serviceName,
        "url": pageUrl
        // aggregateRating removed - add only when you have real reviews
      },
      {
        "@type": "LocalBusiness",
        "name": `${serviceName} ${cityName}`,
        "description": `Platformă pentru găsirea celor mai buni ${serviceName} în ${cityName}`,
        "url": pageUrl,
        "telephone": "+447930097259",
        "email": "contact@findtrades.app",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "GB",
          "addressLocality": cityName
        },
        "priceRange": "$$",
        "areaServed": {
          "@type": "City",
          "name": cityName,
          "addressCountry": "GB"
        }
      }
    ]
  };
}

export function generateServicesPageSchema(stats: any, trades: Trade[]) {
  const baseUrl = "https://www.findtrades.app";
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "FindTrades",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`,
          "width": 300,
          "height": 100
        }
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/services/#webpage`,
        "url": `${baseUrl}/services/`,
        "name": "Professional Tradesmen Services UK | FindTrades",
        "description": `Find verified professional tradesmen across the UK. ${stats.totalWorkers}+ experts in construction, plumbing, electrical, renovations and more.`,
        "isPartOf": { "@id": `${baseUrl}/#website` }
      },
      {
        "@type": "ItemList",
        "name": "Professional Services",
        "description": "Complete directory of professional tradesmen services in the UK",
        "numberOfItems": trades.length,
        "itemListElement": trades.map((trade, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": trade.name,
          "url": `${baseUrl}/services/${trade.slug}`
        }))
      }
    ]
  };
}

export function generateServicePageSchema(trade: Trade, stats: ServiceStats) {
  const baseUrl = "https://www.findtrades.app";
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "FindTrades",
        "url": baseUrl
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/services/${trade.slug}#webpage`,
        "url": `${baseUrl}/services/${trade.slug}`,
        "name": `${trade.name} Services UK | Find Professional ${trade.name} | FindTrades`,
        "description": `Find verified ${trade.name.toLowerCase()} professionals across the UK. ${stats.totalWorkers}+ expert ${trade.name.toLowerCase()}s available. Get free quotes today.`,
        "isPartOf": { "@id": `${baseUrl}/#website` }
      },
      {
        "@type": "Service",
        "name": trade.name,
        "description": trade.description || `Professional ${trade.name.toLowerCase()} services in the UK`,
        "provider": { "@id": `${baseUrl}/#organization` },
        "areaServed": {
          "@type": "Country",
          "name": "United Kingdom"
        },
        "serviceType": trade.name,
        "url": `${baseUrl}/services/${trade.slug}`
      }
    ]
  };
}
