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
  return `${service} ${city} - Find Verified Tradesmen | FindTrades`;
}

export function generateSeoDescription(service: string, city: string): string {
  return `Find and hire professional ${service.toLowerCase()} in ${city}. Compare quotes, see real reviews and contact verified tradesmen. Free and fast!`;
}
