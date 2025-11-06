// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Import loader(s)
import { glob } from "astro/loaders";

// 3. Define your collection(s)
const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data/projects" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    shortDescription: z.string().optional(),
    projectType: z.enum(["personal", "client", "school"]).optional(),
    tags: z.array(z.string()).optional(),
    hostedLink: z.string().url().optional(),
    githubLink: z.string().url().optional(),
    newIndicator: z.boolean().optional(),
    newIndicatorText: z.string().optional(),
    sortOrder: z.number().optional(),
    mainImage: z.string().optional(),
    images: z.array(z.string()).optional(),
  }),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { blog, projects };
