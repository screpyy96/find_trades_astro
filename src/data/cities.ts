export interface City {
  slug: string;
  name: string;
  county: string;
  population?: number;
  neighborhoods?: string[];
}

export const cities: City[] = [
  // Major UK Cities - ordered by population
  { slug: 'london', name: 'London', county: 'Greater London', population: 8982000 },
  { slug: 'birmingham', name: 'Birmingham', county: 'West Midlands', population: 1141000 },
  { slug: 'manchester', name: 'Manchester', county: 'Greater Manchester', population: 547200 },
  { slug: 'glasgow', name: 'Glasgow', county: 'Glasgow City', population: 635280 },
  { slug: 'leeds', name: 'Leeds', county: 'West Yorkshire', population: 493800 },
  { slug: 'liverpool', name: 'Liverpool', county: 'Merseyside', population: 498100 },
  { slug: 'sheffield', name: 'Sheffield', county: 'South Yorkshire', population: 584000 },
  { slug: 'bristol', name: 'Bristol', county: 'Bristol', population: 467100 },
  { slug: 'newcastle', name: 'Newcastle upon Tyne', county: 'Tyne and Wear', population: 300200 },
  { slug: 'nottingham', name: 'Nottingham', county: 'Nottinghamshire', population: 330200 },
  { slug: 'leicester', name: 'Leicester', county: 'Leicestershire', population: 368500 },
  { slug: 'coventry', name: 'Coventry', county: 'West Midlands', population: 345300 },
  { slug: 'hull', name: 'Kingston upon Hull', county: 'East Riding of Yorkshire', population: 267000 },
  { slug: 'cardiff', name: 'Cardiff', county: 'Cardiff', population: 362400 },
  { slug: 'belfast', name: 'Belfast', county: 'Belfast', population: 345400 },
  { slug: 'stoke-on-trent', name: 'Stoke-on-Trent', county: 'Staffordshire', population: 256300 },
  { slug: 'wolverhampton', name: 'Wolverhampton', county: 'West Midlands', population: 263700 },
  { slug: 'derby', name: 'Derby', county: 'Derbyshire', population: 261400 },
  { slug: 'southampton', name: 'Southampton', county: 'Hampshire', population: 254300 },
  { slug: 'peterborough', name: 'Peterborough', county: 'Cambridgeshire', population: 202800 },
  { slug: 'portsmouth', name: 'Portsmouth', county: 'Hampshire', population: 214800 },
  { slug: 'reading', name: 'Reading', county: 'Berkshire', population: 174700 },
  { slug: 'northampton', name: 'Northampton', county: 'Northamptonshire', population: 225100 },
  { slug: 'london-boroughs', name: 'London Boroughs', county: 'Greater London', neighborhoods: ['camden', 'westminster', 'kensington-chelsea', 'hammersmith-fulham', 'wandsworth', 'lambeth', 'southwark', 'tower-hamlets', 'hackney', 'islington', 'camden', 'brent', 'ealing', 'hounslow', 'richmond', 'kingston', 'merton', 'sutton', 'croydon', 'bromley', 'lewisham', 'greenwich', 'bexley', 'havering', 'barking-dagenham', 'redbridge', 'newham', 'waltham-forest', 'haringey', 'enfield', 'barnet', 'harrow', 'hillingdon'] },
  
  // Other important UK cities
  { slug: 'brighton', name: 'Brighton', county: 'East Sussex', population: 290400 },
  { slug: 'plymouth', name: 'Plymouth', county: 'Devon', population: 264200 },
  { slug: 'oxford', name: 'Oxford', county: 'Oxfordshire', population: 162100 },
  { slug: 'cambridge', name: 'Cambridge', county: 'Cambridgeshire', population: 145700 },
  { slug: 'york', name: 'York', county: 'North Yorkshire', population: 198100 },
  { slug: 'edinburgh', name: 'Edinburgh', county: 'Edinburgh', population: 536800 },
  { slug: 'aberdeen', name: 'Aberdeen', county: 'Aberdeen City', population: 200680 },
  { slug: 'glasgow-city', name: 'Glasgow City', county: 'Glasgow City', population: 635280 },
  { slug: 'bath', name: 'Bath', county: 'Bath and North East Somerset', population: 94782 },
  { slug: 'canterbury', name: 'Canterbury', county: 'Kent', population: 155700 },
  { slug: 'chester', name: 'Chester', county: 'Cheshire', population: 118200 },
  { slug: 'exeter', name: 'Exeter', county: 'Devon', population: 130700 },
  { slug: 'gloucester', name: 'Gloucester', county: 'Gloucestershire', population: 103500 },
  { slug: 'lancaster', name: 'Lancaster', county: 'Lancashire', population: 52084 },
  { slug: 'lincoln', name: 'Lincoln', county: 'Lincolnshire', population: 100160 },
  { slug: 'salisbury', name: 'Salisbury', county: 'Wiltshire', population: 47200 },
  { slug: 'truro', name: 'Truro', county: 'Cornwall', population: 23100 },
  { slug: 'worcester', name: 'Worcester', county: 'Worcestershire', population: 103600 },
  { slug: 'hereford', name: 'Hereford', county: 'Herefordshire', population: 61400 },
  { slug: 'durham', name: 'Durham', county: 'Durham', population: 51400 },
  { slug: 'carlisle', name: 'Carlisle', county: 'Cumbria', population: 75400 },
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
