import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.meseriaslocal.ro',
  output: 'server',
  trailingSlash: 'ignore',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  integrations: [
    react({
      experimentalReactChildren: true
    }),
    tailwind({
      applyBaseStyles: false,
    })
  ],
  build: {
    format: 'directory',
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
              return 'vendor';
            }
          }
        }
      }
    }
  }
});
