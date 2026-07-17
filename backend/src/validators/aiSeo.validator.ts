import { z } from "zod";

export const aiEntityTypeSchema = z.enum(["trek", "blog", "destination", "category", "programmatic"]);

export const suggestMetaBodySchema = z.object({
  entityType: aiEntityTypeSchema,
  entityId: z.string().optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
  title: z.string().optional(),
  name: z.string().optional(),
  summary: z.string().optional(),
  excerpt: z.string().optional(),
  description: z.string().optional(),
  destinationName: z.string().optional(),
  region: z.string().optional(),
  difficulty: z.string().optional(),
  durationDays: z.coerce.number().optional(),
  maxAltitude: z.coerce.number().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  type: z.string().optional(),
  filterType: z.string().optional(),
  filterValue: z.string().optional(),
});

export const suggestFaqBodySchema = z.object({
  entityType: z.enum(["trek", "blog", "destination", "programmatic"]),
  entityId: z.string().optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
  title: z.string().optional(),
  name: z.string().optional(),
  destinationName: z.string().optional(),
  difficulty: z.string().optional(),
  durationDays: z.coerce.number().optional(),
  maxAltitude: z.coerce.number().optional(),
  bestSeasons: z.array(z.string()).optional(),
  months: z.array(z.string()).optional(),
});

export const schemaPreviewBodySchema = z.object({
  entityType: aiEntityTypeSchema,
  payload: z.record(z.string(), z.unknown()).optional(),
  title: z.string().optional(),
  name: z.string().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  excerpt: z.string().optional(),
  canonical: z.string().optional(),
  coverImage: z.string().optional(),
  heroImage: z.string().optional(),
  ogImage: z.string().optional(),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
  basePriceInr: z.coerce.number().optional(),
  durationDays: z.coerce.number().optional(),
  destinationName: z.string().optional(),
  rating: z.coerce.number().optional(),
  reviewCount: z.coerce.number().optional(),
  author: z.object({ name: z.string().optional() }).optional(),
  publishedAt: z.string().optional(),
});

export const internalLinksBodySchema = z.object({
  sourceType: aiEntityTypeSchema,
  sourceId: z.string().optional(),
  sourceSlug: z.string().optional(),
  title: z.string().optional(),
  region: z.string().optional(),
  destinationName: z.string().optional(),
  difficulty: z.string().optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(20).optional(),
});

export const relatedContentBodySchema = z.object({
  title: z.string().optional(),
  region: z.string().optional(),
  destinationName: z.string().optional(),
  difficulty: z.string().optional(),
  durationDays: z.coerce.number().optional(),
  excludeSlug: z.string().optional(),
  seasons: z.array(z.string()).optional(),
});

export const contentQualityBodySchema = z.object({
  entityType: z.enum(["trek", "blog", "destination", "programmatic"]),
  entityId: z.string().optional(),
  entitySlug: z.string().optional(),
  title: z.string().optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
  content: z.string().optional(),
  summary: z.string().optional(),
  overview: z.string().optional(),
  description: z.string().optional(),
  excerpt: z.string().optional(),
  headings: z.array(z.string()).optional(),
  images: z.array(z.object({ src: z.string().optional(), alt: z.string().optional() })).optional(),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
  hasCta: z.boolean().optional(),
});

export const imageSeoBodySchema = z.object({
  fileName: z.string().optional(),
  contextTitle: z.string().optional(),
  destinationName: z.string().optional(),
  alt: z.string().optional(),
});

export const blogAssistantBodySchema = z.object({
  title: z.string().optional(),
  topic: z.string().optional(),
  destinationName: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const landingAssistantBodySchema = z.object({
  filterType: z.enum(["state", "destination", "season", "difficulty", "duration", "theme"]),
  filterValue: z.string().min(1),
  title: z.string().optional(),
});

export const trekWorkflowBodySchema = z.object({
  title: z.string().min(2),
  destinationName: z.string().optional(),
  region: z.string().optional(),
  difficulty: z.string().optional(),
  durationDays: z.coerce.number().optional(),
  maxAltitude: z.coerce.number().optional(),
  summary: z.string().optional(),
  overview: z.string().optional(),
  bestSeasons: z.array(z.string()).optional(),
  months: z.array(z.string()).optional(),
  basePriceInr: z.coerce.number().optional(),
});

export const upsertSeoTemplateBodySchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  category: z.enum(["meta", "faq", "landing", "blog", "image", "schema"]),
  entityType: z.enum(["trek", "blog", "destination", "category", "programmatic", "global"]).optional(),
  template: z.record(z.string(), z.unknown()),
  isDefault: z.boolean().optional(),
  description: z.string().optional(),
});

export const listAuditsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(20),
});
