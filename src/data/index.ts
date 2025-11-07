export * from './trades';
export * from './cities';

// Utility functions
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateSeoTitle(service: string, city: string): string {
  return `${service} ${city} - Găsește Meseriași Verificați | Meserias Local`;
}

export function generateSeoDescription(service: string, city: string): string {
  return `Caută și angajează ${service.toLowerCase()} profesioniști în ${city}. Compară oferte, vezi recenzii reale și contactează meseriași verificați. Gratuit și rapid!`;
}
