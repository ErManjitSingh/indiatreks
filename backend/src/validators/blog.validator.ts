import { z } from "zod";

export const createBlogSchema = z.object({
  slug: z.string().trim().toLowerCase().optional(),
  title: z.string().trim().min(2).max(220),
  excerpt: z.string().default(""),
  content: z.string().default(""),
  coverImage: z.string().default(""),
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
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      canonical: z.string().optional(),
      ogImage: z.string().optional(),
    })
    .optional(),
  readingTimeMinutes: z.number().min(1).default(3),
});

export const updateBlogSchema = createBlogSchema.partial();

export const listBlogsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  q: z.string().optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  status: z.enum(["draft", "published", "scheduled"]).optional(),
});
