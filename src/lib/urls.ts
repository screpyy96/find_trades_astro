/**
 * Centralized URL helpers for cross-app navigation.
 * 
 * Uses PUBLIC_APP_URL and PUBLIC_WEB_URL from .env so that
 * links point to localhost in dev and to production in prod.
 */

/** Remix app base URL (e.g. http://localhost:5173 or https://app.findtrades.app) */
export const APP_URL = (import.meta.env.PUBLIC_APP_URL || 'https://app.findtrades.app').replace(/\/$/, '');

/** Landing/web base URL (e.g. http://localhost:4321 or https://www.findtrades.app) */
export const WEB_URL = (import.meta.env.PUBLIC_WEB_URL || 'https://www.findtrades.app').replace(/\/$/, '');

/** Build a URL pointing to the Remix app */
export function appLink(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${APP_URL}${cleanPath}`;
}

/** Build a URL pointing to the landing/web site */
export function webLink(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${WEB_URL}${cleanPath}`;
}
