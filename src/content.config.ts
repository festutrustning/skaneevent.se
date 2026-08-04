import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guider = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guider' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    location: z.string(),
    eventType: z.string(),
    guests: z.string().optional(),
    image: z.string(),
    challenge: z.string(),
    solution: z.string(),
    result: z.string(),
  }),
});

export const collections = { guider, cases };
