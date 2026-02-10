import type { APIRoute } from 'astro';
import { validateEnvironment } from '../../lib/env-validation';

const INDEXNOW_KEY = '80ed490583fd4cb8b5705e6e8cb33fec';

// Use environment variables from .env
const envConfig = validateEnvironment();
const WEB_URL = envConfig.config.web.url;

const BASE_URL = WEB_URL;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { urls } = await request.json();
    
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return new Response(JSON.stringify({ error: 'URLs array is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Submit to IndexNow (Bing, Yandex, etc.)
    const indexNowResponse = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        host: new URL(WEB_URL).hostname,
        key: INDEXNOW_KEY,
        keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls.map(url => url.startsWith('http') ? url : `${BASE_URL}${url}`)
      })
    });

    const success = indexNowResponse.ok;
    
    return new Response(JSON.stringify({ 
      success,
      message: success ? 'URLs submitted to IndexNow' : 'Failed to submit to IndexNow',
      urls: urls.length
    }), {
      status: success ? 200 : 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('IndexNow error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
