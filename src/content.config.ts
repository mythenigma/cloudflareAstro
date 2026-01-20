import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files from all language directories under src/content/blog/
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    /**
     * Whether to show the default CTA injected by `src/layouts/BlogPost.astro`.
     * Some posts include their own CTA blocks and should disable the default to avoid duplicates.
     */
    showDefaultCta: z.boolean().optional(),
  }),
});

export const collections = { blog };
