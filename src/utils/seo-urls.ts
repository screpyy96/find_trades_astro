/**
 * SEO URL utilities for generating and managing SEO-friendly URLs
 */

export interface WorkerProfilee {
  id: string;
  name?: string | null;
  address?: string | null;
  seo_slug?: string | null;
}

export interface Trade {
  id: string | number;
  name: string;
  slug?: string;
}

/**
 * Generate SEO-friendly slug from text
 */
export function generateSlug(text: string, maxLength: number = 50): string {
  if (!text) return '';
  
  const slug = text
    .toLowerCase()
    .normalize('NFD') // Normalize diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

  return slug.substring(0, maxLength);
}

/**
 * Generate premium SEO slug for worker profile
 * Format: name-trade-city-shortid
 */
export function generateWorkerSeoSlug(
  worker: WorkerProfilee, 
  trades?: Trade[]
): string {
  if (!worker.name) return worker.id;
  
  const namePart = generateSlug(worker.name, 30); // Limit name to 30 chars
  const tradePart = trades?.[0]?.name ? generateSlug(trades[0].name, 20) : ''; // Limit trade to 20 chars
  
  // Extract only city name from address
  let cityPart = '';
  if (worker.address) {
    const addressParts = worker.address.split(',').map(part => part.trim());
    const cityName = addressParts[0];
    cityPart = generateSlug(cityName, 15); // Limit city to 15 chars
  }
  
  // Use last 8 characters of UUID as short ID (still unique enough)
  const shortId = worker.id.slice(-8);
  
  // Build premium slug: name-trade-city-shortid
  const parts = [namePart, tradePart, cityPart].filter(Boolean);
  const slugBase = parts.join('-');
  
  return `${slugBase}-${shortId}`;
}

/**
 * Get worker profile URL (premium SEO-friendly)
 * Format: /tradesmen/name-trade-city-uuid
 */
export function getWorkerProfileeUrl(worker: WorkerProfilee, trades?: Trade[]): string {
  const slug = generateWorkerSeoSlug(worker, trades);
  return `/tradesmen/${slug}`;
}

/**
 * Get worker profile canonical URL
 */
export function getWorkerProfileeCanonicalUrl(
  worker: WorkerProfilee, 
  trades?: Trade[],
  baseUrl: string = 'https://www.findtrades.app'
): string {
  const slug = generateWorkerSeoSlug(worker, trades);
  return `${baseUrl}/tradesmen/${slug}`;
}
