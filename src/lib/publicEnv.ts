interface SupabaseConfig {
  url?: string;
  anonKey?: string;
}

import { validateEnvironment } from './env-validation';

// Validate environment and get configuration
const { config } = validateEnvironment();

export function getPublicSupabaseConfig() {
  return {
    url: config.supabase.url || '',
    anonKey: config.supabase.anonKey || ''
  };
}

export function getAppConfig() {
  return {
    url: config.app.url,
    webUrl: config.web.url
  };
}


export function getAnalyticsConfig() {
  return config.analytics ? {
    gtmId: config.analytics.gtmId,
    clarityId: config.analytics.clarityId
  } : null;
}
