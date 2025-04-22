// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap()],
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }]
    ],
    // Ensure image paths are processed correctly
    shikiConfig: {
      theme: 'github-light',
    }
  },
  vite: {
    build: {
      rollupOptions: {
        input: {
          main: './index.html',
          favicon: './public/maipdf-images/favicon.svg',
        },
      },
    },
    // Add this to ensure images are properly referenced
    assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg'],
  },
});
