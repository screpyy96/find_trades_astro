import type { APIRoute } from 'astro';
import { getPublicSupabaseConfig } from '../../lib/publicEnv';

export const prerender = false;

export const GET: APIRoute = async () => {
  const { url, anonKey } = getPublicSupabaseConfig();

  const payload = {
    hasSupabaseUrl: Boolean(url),
    hasSupabaseAnonKey: Boolean(anonKey),
    supabaseUrlPreview: url ? `${url.slice(0, 30)}...` : null,
    supabaseAnonKeyPreview: anonKey ? `${anonKey.slice(0, 6)}...${anonKey.slice(-4)}` : null,
    mode: import.meta.env.MODE,
    timestamp: new Date().toISOString()
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
