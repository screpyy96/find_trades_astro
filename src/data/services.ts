export interface Service {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
}

export const services: Service[] = [
  // Construcții
  { slug: 'zugrav', name: 'Zugrav', category: 'Construcții', categorySlug: 'constructii' },
  { slug: 'electrician', name: 'Electrician', category: 'Construcții', categorySlug: 'constructii' },
  { slug: 'instalator', name: 'Instalator', category: 'Construcții', categorySlug: 'constructii' },
  { slug: 'zidar', name: 'Zidar', category: 'Construcții', categorySlug: 'constructii' },
  { slug: 'tamplar', name: 'Tâmplar', category: 'Construcții', categorySlug: 'constructii' },
  { slug: 'parchetar', name: 'Parchetar', category: 'Construcții', categorySlug: 'constructii' },
  { slug: 'rigipsar', name: 'Rigipsar', category: 'Construcții', categorySlug: 'constructii' },
  { slug: 'faiantar', name: 'Faianțar', category: 'Construcții', categorySlug: 'constructii' },
  
  // Amenajări
  { slug: 'amenajari-interioare', name: 'Amenajări Interioare', category: 'Amenajări', categorySlug: 'amenajari' },
  { slug: 'design-interior', name: 'Design Interior', category: 'Amenajări', categorySlug: 'amenajari' },
  { slug: 'mobila-la-comanda', name: 'Mobilă la Comandă', category: 'Amenajări', categorySlug: 'amenajari' },
  
  // Reparații
  { slug: 'reparatii-generale', name: 'Reparații Generale', category: 'Reparații', categorySlug: 'reparatii' },
  { slug: 'reparatii-electrocasnice', name: 'Reparații Electrocasnice', category: 'Reparații', categorySlug: 'reparatii' },
  
  // Curățenie
  { slug: 'curatenie-dupa-constructor', name: 'Curățenie După Constructor', category: 'Curățenie', categorySlug: 'curatenie' },
  { slug: 'curatenie-generala', name: 'Curățenie Generală', category: 'Curățenie', categorySlug: 'curatenie' },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}

export function getServicesByCategory(categorySlug: string): Service[] {
  return services.filter(s => s.categorySlug === categorySlug);
}
