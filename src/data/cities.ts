export interface City {
  slug: string;
  name: string;
  county: string;
  population?: number;
  neighborhoods?: string[];
}

export const cities: City[] = [
  // Reședințe de județ - ordonate după populație
  { slug: 'bucuresti', name: 'București', county: 'București', population: 1883425 },
  
  // Sectoare București (pentru SEO local granular)
  { slug: 'sectorul-1', name: 'Sectorul 1', county: 'București', population: 230000 },
  { slug: 'sectorul-2', name: 'Sectorul 2', county: 'București', population: 345000 },
  { slug: 'sectorul-3', name: 'Sectorul 3', county: 'București', population: 385000 },
  { slug: 'sectorul-4', name: 'Sectorul 4', county: 'București', population: 300000 },
  { slug: 'sectorul-5', name: 'Sectorul 5', county: 'București', population: 280000 },
  { slug: 'sectorul-6', name: 'Sectorul 6', county: 'București', population: 370000 },
  
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
  { slug: 'ramnicu-valcea', name: 'Râmnicu Vâlcea', county: 'Vâlcea', population: 98776 },
  { slug: 'suceava', name: 'Suceava', county: 'Suceava', population: 92121 },
  { slug: 'piatra-neamt', name: 'Piatra Neamț', county: 'Neamț', population: 85055 },
  { slug: 'drobeta-turnu-severin', name: 'Drobeta-Turnu Severin', county: 'Mehedinți', population: 92617 },
  { slug: 'focsani', name: 'Focșani', county: 'Vrancea', population: 79315 },
  { slug: 'targoviste', name: 'Târgoviște', county: 'Dâmbovița', population: 79610 },
  { slug: 'targu-jiu', name: 'Târgu Jiu', county: 'Gorj', population: 82504 },
  { slug: 'tulcea', name: 'Tulcea', county: 'Tulcea', population: 73707 },
  { slug: 'resita', name: 'Reșița', county: 'Caraș-Severin', population: 73282 },
  { slug: 'bistrita', name: 'Bistrița', county: 'Bistrița-Năsăud', population: 75076 },
  { slug: 'slatina', name: 'Slatina', county: 'Olt', population: 70293 },
  { slug: 'calarasi', name: 'Călărași', county: 'Călărași', population: 65181 },
  { slug: 'giurgiu', name: 'Giurgiu', county: 'Giurgiu', population: 54655 },
  { slug: 'deva', name: 'Deva', county: 'Hunedoara', population: 61123 },
  { slug: 'zalau', name: 'Zalău', county: 'Sălaj', population: 56202 },
  { slug: 'alba-iulia', name: 'Alba Iulia', county: 'Alba', population: 63536 },
  { slug: 'vaslui', name: 'Vaslui', county: 'Vaslui', population: 55407 },
  { slug: 'sfantu-gheorghe', name: 'Sfântu Gheorghe', county: 'Covasna', population: 56006 },
  { slug: 'alexandria', name: 'Alexandria', county: 'Teleorman', population: 45434 },
  { slug: 'slobozia', name: 'Slobozia', county: 'Ialomița', population: 45891 },
  { slug: 'miercurea-ciuc', name: 'Miercurea Ciuc', county: 'Harghita', population: 38966 },
  
  // Județul Ilfov (zona metropolitană București)
  { slug: 'ilfov', name: 'Ilfov', county: 'Ilfov', population: 450000 },
  { slug: 'voluntari', name: 'Voluntari', county: 'Ilfov', population: 42944 },
  { slug: 'buftea', name: 'Buftea', county: 'Ilfov', population: 22178 },
  { slug: 'popesti-leordeni', name: 'Popești-Leordeni', county: 'Ilfov', population: 57945 },
  { slug: 'pantelimon', name: 'Pantelimon', county: 'Ilfov', population: 27487 },
  { slug: 'chitila', name: 'Chitila', county: 'Ilfov', population: 15009 },
  { slug: 'bragadiru', name: 'Bragadiru', county: 'Ilfov', population: 18861 },
  { slug: 'otopeni', name: 'Otopeni', county: 'Ilfov', population: 17585 },
  { slug: 'magurele', name: 'Măgurele', county: 'Ilfov', population: 11065 },
  
  // Alte orașe importante
  { slug: 'turda', name: 'Turda', county: 'Cluj', population: 47744 },
  { slug: 'medias', name: 'Mediaș', county: 'Sibiu', population: 47204 },
  { slug: 'roman', name: 'Roman', county: 'Neamț', population: 50713 },
  { slug: 'hunedoara', name: 'Hunedoara', county: 'Hunedoara', population: 60525 },
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
