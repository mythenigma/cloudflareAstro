// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  site: "https://article.maipdf.com",
  integrations: [
    mdx(), 
    sitemap({
      filter: (page) => !page.includes('/blog-backup/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        'https://article.maipdf.com/about',
        'https://article.maipdf.com/contact',
        'https://article.maipdf.com/pricing'
      ],
    })
  ],
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
