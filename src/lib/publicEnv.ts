interface SupabaseConfig {
  url?: string;
  anonKey?: string;
}

const runtimeEnv = typeof process !== 'undefined' ? process.env : undefined;

export function getPublicSupabaseConfig(): SupabaseConfig {
  const url =
    import.meta.env.PUBLIC_SUPABASE_URL ||
    runtimeEnv?.PUBLIC_SUPABASE_URL ||
    runtimeEnv?.SUPABASE_URL ||
    undefined;

  const anonKey =
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
    runtimeEnv?.PUBLIC_SUPABASE_ANON_KEY ||
    runtimeEnv?.SUPABASE_ANON_KEY ||
    undefined;

  return { url, anonKey };
}
