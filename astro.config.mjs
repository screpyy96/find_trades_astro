import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.meseriaslocal.ro',
  output: 'hybrid',
  trailingSlash: 'ignore',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    })
  ],
  build: {
    format: 'directory'
  },
  vite: {
    ssr: {
      noExternal: ['@meseriaslocal/data', '@meseriaslocal/ui']
    }
  }
});
