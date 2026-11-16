import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const node = z.object({
  id: z.string(),
  label: z.string(),
  note: z.string().optional(),
  kind: z.enum(['process', 'model', 'store', 'external']).default('process'),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number(),
      summary: z.string(),
      metric: z.string(),
      metricLabel: z.string(),
      role: z.string(),
      org: z.string(),
      period: z.string(),
      stack: z.array(z.string()),
      numbers: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      publication: z.string().optional(),
      diagram: z
        .object({
          caption: z.string(),
          columns: z.array(z.array(node)),
          edges: z.array(z.tuple([z.string(), z.string()])),
        })
        .optional(),
      screens: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string() }))
        .default([]),
      chart: z.enum(['forecast', 'simulation']).optional(),
    }),
});

const publications = defineCollection({
  loader: file('src/data/publications.yaml'),
  schema: z.object({
    type: z.enum(['article', 'entry', 'book']),
    title: z.string(),
    authors: z.array(z.string()),
    role: z.string(),
    venue: z.string(),
    publisher: z.string().optional(),
    year: z.number(),
    volume: z.string().optional(),
    issue: z.string().optional(),
    pages: z.string().optional(),
    articleNumber: z.string().optional(),
    date: z.string().optional(),
    doi: z.string().optional(),
    url: z.string().url().optional(),
    language: z.string().default('en'),
    note: z.string().optional(),
  }),
});

export const collections = { projects, publications };
