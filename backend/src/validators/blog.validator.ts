import { z } from "zod";
import { enterpriseSeoSchema } from "./seo.validator";

export const createBlogSchema = z.object({
  slug: z.string().trim().toLowerCase().optional(),
  title: z.string().trim().min(2).max(220),
  excerpt: z.string().default(""),
  content: z.string().default(""),
  coverImage: z.string().default(""),
  gallery: z
    .array(z.object({ url: z.string(), alt: z.string().optional(), caption: z.string().optional() }))
    .optional(),
  author: z
    .object({
      name: z.string().default(""),
      avatar: z.string().optional(),
      bio: z.string().optional(),
    })
    .optional(),
  category: z.string().default(""),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published", "scheduled"]).default("draft"),
  scheduledAt: z.coerce.date().optional(),
  seo: enterpriseSeoSchema,
  readingTimeMinutes: z.number().min(1).default(3),
  tableOfContents: z
    .array(z.object({ id: z.string(), title: z.string(), level: z.number().default(2) }))
    .optional(),
  internalLinks: z
    .array(z.object({ title: z.string(), url: z.string(), anchor: z.string().optional() }))
    .optional(),
  faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
  relatedTreks: z.array(z.object({ slug: z.string(), title: z.string().optional() })).optional(),
  relatedDestinations: z.array(z.object({ slug: z.string(), title: z.string().optional() })).optional(),
  relatedBlogs: z.array(z.object({ slug: z.string(), title: z.string().optional() })).optional(),
  featured: z.boolean().optional(),
  views: z.number().min(0).optional(),
});

export const updateBlogSchema = createBlogSchema.partial();

export const listBlogsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  q: z.string().optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  status: z.enum(["draft", "published", "scheduled"]).optional(),
  featured: z.coerce.boolean().optional(),
  sort: z.enum(["latest", "popular", "trending"]).optional(),
});

export const generateBlogSchema = z.object({
  topicSlug: z.string().optional(),
  title: z.string().optional(),
  publish: z.boolean().optional().default(false),
  force: z.boolean().optional().default(false),
  save: z.boolean().optional().default(false),
});

export const bulkGenerateBlogsSchema = z.object({
  publish: z.boolean().optional().default(true),
  force: z.boolean().optional().default(false),
});
