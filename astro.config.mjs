// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import { remarkOptimizeImages } from './src/utils/remarkOptimizeImages.js';

// https://astro.build/config
export default defineConfig({
  site: "https://article.maipdf.com",
  integrations: [
    mdx({
      // Apply the image optimization to MDX files too
      remarkPlugins: [remarkOptimizeImages],
    }), 
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
  }),  markdown: {
    remarkPlugins: [remarkOptimizeImages],
    rehypePlugins: [
      rehypeRaw,
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }]
    ],
    // Enable HTML in markdown
    remarkRehype: {
      allowDangerousHtml: true
    },
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
