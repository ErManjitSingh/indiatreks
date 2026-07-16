import { z } from "zod";

export const upsertSeoPageSchema = z.object({
  path: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  canonical: z.string().optional(),
  ogImage: z.string().optional(),
  robots: z.string().optional(),
  schemaJson: z.record(z.string(), z.unknown()).optional(),
  twitterCard: z.string().optional(),
});

export const listSeoPagesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(50),
  q: z.string().optional(),
});
