import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Debug logging
if (import.meta.env.DEV) {
  console.log('🔍 Supabase Config Check:');
  console.log('  URL exists:', !!supabaseUrl);
  console.log('  Key exists:', !!supabaseAnonKey);
  console.log('  URL value:', supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'MISSING');
}

// Only create client if we have valid credentials
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!supabase && import.meta.env.DEV) {
  console.warn('⚠️ Supabase client not initialized - check your .env file');
}

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
    console.warn('Supabase client not initialized');
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
    console.error('Error fetching workers:', error);
    return [];
  }

  return data as Worker[];
}
