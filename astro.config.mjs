import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://shanurwan.github.io',
  base: '/what-i-do',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
});
