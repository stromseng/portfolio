// 1. Import utilities from `astro:content`
import { date } from "astro/zod";
import { z, defineCollection } from "astro:content";
// 2. Define your collection(s)
const projectCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        tags: z.array(z.string()).optional(),
        date: z.date(),
        description: z.string(),
        hosted_url: z.string().url().optional(),
        github_url: z.string().url().optional(),
        image: z
            .object({
                src: z.string().url(),
                alt: z.string(),
            })
            .optional(),
        priority_index: z.number().optional(),
    }),
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
    project: projectCollection,
};
