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

// src/data/publications.json is written by orcid2site (.github/workflows/publications.yml).
// This maps its fields to the schema below. Manual data goes in publications.overrides.yml.
type SyncedWork = {
  key: string;
  type: string;
  title: string;
  authors: { name: string; family?: string; given?: string }[];
  year: number;
  [field: string]: unknown;
};

const toPublication = (w: SyncedWork) => ({
  id: w.key,
  type: w.type === 'book' ? 'book' : w.type === 'chapter' ? 'entry' : 'article',
  title: w.title,
  authors: w.authors.map((a) => (a.family && a.given ? `${a.family}, ${a.given}` : a.name)),
  role: w.role ?? '',
  venue: w.venue ?? w.publisher ?? '',
  publisher: w.publisher,
  year: w.year,
  volume: w.volume,
  issue: w.issue,
  pages: w.pages,
  articleNumber: w.article_number,
  date: w.date,
  doi: w.doi,
  url: w.url,
  language: w.language,
  note: w.note,
});

const publications = defineCollection({
  loader: file('src/data/publications.json', {
    parser: (text) => (JSON.parse(text).works as SyncedWork[]).map(toPublication),
  }),
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
