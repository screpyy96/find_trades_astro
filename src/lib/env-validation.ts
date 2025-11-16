/**
 * Environment variable validation
 * Ensures all required environment variables are present and valid
 */

interface EnvConfig {
  supabase: {
    url: string;
    anonKey: string;
  };
  app: {
    url: string;
  };
  web: {
    url: string;
  };
  sanity?: {
    projectId: string;
    dataset: string;
    token: string;
  };
  analytics?: {
    gtmId: string;
    clarityId: string;
  };
}

interface ValidationError {
  field: string;
  message: string;
  isRequired: boolean;
}

export function validateEnvironment(): { config: EnvConfig; errors: ValidationError[] } {
  const errors: ValidationError[] = [];
  
  // Validate Supabase (required for core functionality)
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl) {
    errors.push({
      field: 'PUBLIC_SUPABASE_URL',
      message: 'Supabase URL is required for database functionality',
      isRequired: true
    });
  }
  
  if (!supabaseAnonKey) {
    errors.push({
      field: 'PUBLIC_SUPABASE_ANON_KEY',
      message: 'Supabase anonymous key is required for database access',
      isRequired: true
    });
  }
  
  // Validate URLs
  const appUrl = import.meta.env.PUBLIC_APP_URL || 'https://app.meseriaslocal.ro';
  const webUrl = import.meta.env.PUBLIC_WEB_URL || 'https://www.meseriaslocal.ro';
  
  // Validate Sanity (optional but recommended)
  const sanityProjectId = import.meta.env.SANITY_PROJECT_ID;
  const sanityDataset = import.meta.env.SANITY_DATASET || 'production';
  const sanityToken = import.meta.env.SANITY_TOKEN;
  
  // Validate Analytics (optional)
  const gtmId = import.meta.env.PUBLIC_GTM_ID;
  const clarityId = import.meta.env.PUBLIC_CLARITY_ID;
  
  const config: EnvConfig = {
    supabase: {
      url: supabaseUrl || '',
      anonKey: supabaseAnonKey || ''
    },
    app: {
      url: appUrl
    },
    web: {
      url: webUrl
    }
  };
  
  // Add optional config if available
  if (sanityProjectId) {
    config.sanity = {
      projectId: sanityProjectId,
      dataset: sanityDataset,
      token: sanityToken || ''
    };
  }
  
  if (gtmId || clarityId) {
    config.analytics = {
      gtmId: gtmId || '',
      clarityId: clarityId || ''
    };
  }
  
  // Log warnings in development
  if (import.meta.env.DEV && errors.length > 0) {
    console.warn('⚠️ Environment validation warnings:');
    errors.forEach(error => {
      if (error.isRequired) {
        console.warn(`  Required: ${error.field} - ${error.message}`);
      } else {
        console.warn(`  Optional: ${error.field} - ${error.message}`);
      }
    });
  }
  
  return { config, errors };
}

/**
 * Get validated environment configuration
 * Throws in production if required variables are missing
 */
export function getEnvConfig(): EnvConfig {
  const { config, errors } = validateEnvironment();
  
  const requiredErrors = errors.filter(e => e.isRequired);
  
  if (requiredErrors.length > 0 && !import.meta.env.DEV) {
    throw new Error(
      `Missing required environment variables: ${requiredErrors.map(e => e.field).join(', ')}`
    );
  }
  
  return config;
}

/**
 * Check if all required environment variables are present
 */
export function isEnvironmentValid(): boolean {
  const { errors } = validateEnvironment();
  return !errors.some(e => e.isRequired);
}
