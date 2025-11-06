import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

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
  const { data, error} = await supabase
    .from('profiles')
    .select('id, name, avatar_url, address, bio, rating, is_verified')
    .eq('role', 'worker')
    .not('name', 'is', null)
    .order('rating', { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching workers:', error);
    return [];
  }

  return data as Worker[];
}
