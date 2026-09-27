import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const seoFields = {
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  ogImage: z.string().optional(),
  noindex: z.boolean().optional(),
  focusKeyword: z.string().optional(),
};

const guider = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guider' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    ...seoFields,
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
    ...seoFields,
  }),
});

export const collections = { guider, cases };
