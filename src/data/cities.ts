export interface City {
  slug: string;
  name: string;
  county: string;
  population?: number;
}

export const cities: City[] = [
  { slug: 'bucuresti', name: 'București', county: 'București', population: 1883425 },
  { slug: 'cluj-napoca', name: 'Cluj-Napoca', county: 'Cluj', population: 324576 },
  { slug: 'timisoara', name: 'Timișoara', county: 'Timiș', population: 319279 },
  { slug: 'iasi', name: 'Iași', county: 'Iași', population: 290422 },
  { slug: 'constanta', name: 'Constanța', county: 'Constanța', population: 283872 },
  { slug: 'craiova', name: 'Craiova', county: 'Dolj', population: 269506 },
  { slug: 'brasov', name: 'Brașov', county: 'Brașov', population: 253200 },
  { slug: 'galati', name: 'Galați', county: 'Galați', population: 249432 },
  { slug: 'ploiesti', name: 'Ploiești', county: 'Prahova', population: 201226 },
  { slug: 'oradea', name: 'Oradea', county: 'Bihor', population: 196367 },
  { slug: 'braila', name: 'Brăila', county: 'Brăila', population: 180302 },
  { slug: 'arad', name: 'Arad', county: 'Arad', population: 159074 },
  { slug: 'pitesti', name: 'Pitești', county: 'Argeș', population: 155383 },
  { slug: 'sibiu', name: 'Sibiu', county: 'Sibiu', population: 147245 },
  { slug: 'bacau', name: 'Bacău', county: 'Bacău', population: 144307 },
  { slug: 'targu-mures', name: 'Târgu Mureș', county: 'Mureș', population: 134290 },
  { slug: 'baia-mare', name: 'Baia Mare', county: 'Maramureș', population: 123738 },
  { slug: 'buzau', name: 'Buzău', county: 'Buzău', population: 115494 },
  { slug: 'botosani', name: 'Botoșani', county: 'Botoșani', population: 106847 },
  { slug: 'satu-mare', name: 'Satu Mare', county: 'Satu Mare', population: 102441 },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find(c => c.slug === slug);
}

export function getNearbyCities(citySlug: string, limit = 5): City[] {
  const city = getCityBySlug(citySlug);
  if (!city) return [];
  
  // Simple implementation: return cities from same county or nearby by population
  return cities
    .filter(c => c.slug !== citySlug && (c.county === city.county || Math.abs((c.population || 0) - (city.population || 0)) < 100000))
    .slice(0, limit);
}
