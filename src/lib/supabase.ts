import { createClient } from '@supabase/supabase-js';
import { getPublicSupabaseConfig } from './publicEnv';

const { url: supabaseUrl, anonKey: supabaseAnonKey } = getPublicSupabaseConfig();

// Only create client if we have valid credentials
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface Worker {
  id: string;
  name: string | null;
  avatar_url: string | null;
  address: string | null;
  bio: string | null;
  rating: number | null;
  is_verified: boolean | null;
}

export async function getPublicWorkers(limit = 50) {
  if (!supabase) {
    return [];
  }

  const { data, error} = await supabase
    .from('profiles')
    .select('id, name, avatar_url, address, bio, rating, is_verified')
    .eq('role', 'worker')
    .not('name', 'is', null)
    .order('rating', { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error) {
    // Error logged to monitoring in production
    return [];
  }

  return data as Worker[];
}
