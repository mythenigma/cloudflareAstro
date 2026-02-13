// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';

// https://astro.build/config
export default defineConfig({
  site: "https://article.maipdf.com",
  // Canonical URL policy:
  // - Keep URLs without trailing slashes to avoid duplicate indexing.
  // - Runtime 301 canonicalization is implemented in `src/middleware.ts`.
  trailingSlash: 'never',
  integrations: [
    mdx({
      // Apply the image optimization to MDX files too
      // remarkPlugins: [remarkOptimizeImages],
    }), 
    sitemap({
      // NOTE:
      // - Sitemap is generated at build time (astro build) into dist/sitemap-*.xml
      // - If you add/rename many posts, rebuild to refresh sitemap and avoid stale URLs in GSC.
      // - All blog posts from content collection are automatically included
      filter: (page) => {
        // Exclude blog-backup and ensure all valid blog posts are included
        if (page.includes('/blog-backup/')) return false;
        // Exclude internal utility pages from indexing-focused sitemap
        if (page === 'https://article.maipdf.com/fonts' || page === 'https://article.maipdf.com/fonts/') return false;
        // Include all blog posts (en/, cn/, fr/, de/, ja/, ko/, es/)
        if (page.includes('/blog/')) return true;
        // Include other pages
        return true;
      },
      changefreq: 'weekly',
      priority: 0.7,
      // lastmod will be automatically determined from page metadata
      // For blog posts, it uses pubDate or updatedDate from frontmatter
      customPages: [
        'https://article.maipdf.com/about'
      ]
    })
  ],
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
  markdown: {
    // remarkPlugins: [remarkOptimizeImages],
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
