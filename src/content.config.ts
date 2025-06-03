import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array;
  const lowercaseItems = array.map((str) => str.toLowerCase());
  const distinctItems = new Set(lowercaseItems);
  return Array.from(distinctItems);
}

const blog = defineCollection({
  loader: glob({
    pattern: "[^_]*.mdx",
    base: "./src/blog",
  }),
  schema: z.object({
    title: z.string().max(100),
    description: z.string().min(5).max(160),
    publishDate: z.string().transform((str) => new Date(str)),
    tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
    ogImage: z.string().optional(),
    useECharts: z.boolean().optional().default(false),
  }),
});
// 4. Export a single `collections` object to register your collection(s)
export const collections = { blog };
