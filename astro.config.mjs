import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://aisafetycolombia.org',
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/preview-linkedin') && !page.includes('/preview/') && !page.includes('/metrics'),
      serialize: (item) => ({
        ...item,
        lastmod: new Date().toISOString(),
        changefreq: item.url.endsWith('/hackathon/') || item.url.endsWith('/en/hackathon/')
          ? 'daily'
          : 'weekly',
        priority: item.url.endsWith('/hackathon/') || item.url.endsWith('/en/hackathon/')
          ? 1.0
          : item.url === 'https://aisafetycolombia.org/' || item.url === 'https://aisafetycolombia.org/en/'
            ? 0.9
            : 0.7,
      }),
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-CO',
          en: 'en-US',
        },
      },
    }),
  ],

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  build: {
    format: 'directory',
  },
});
