import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const linkSchema = z.object({
  label: z.string(),
  url: z.url(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    status: z.string(),
    repository: z.url().optional(),
    year: z.union([z.string(), z.number()]).optional(),
    areas: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    problem: z.string().optional(),
    context: z.string().optional(),
    constraints: z.array(z.string()).optional(),
    architecture: z.string().optional(),
    decisions: z.array(z.object({
      title: z.string(),
      rationale: z.string(),
    })).optional(),
    failureModes: z.array(z.string()).optional(),
    evidence: z.array(z.object({
      title: z.string(),
      detail: z.string(),
      url: z.url().optional(),
    })).optional(),
    lessons: z.string().optional(),
    currentStatus: z.string().optional(),
    links: z.array(linkSchema).optional(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    canonicalUrl: z.url().optional(),
  }),
});

export const collections = { projects, writing };
