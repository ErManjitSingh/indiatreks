import { z } from "zod";

export const createDestinationSchema = z.object({
  slug: z.string().trim().toLowerCase().optional(),
  name: z.string().trim().min(2).max(200),
  region: z.string().default(""),
  state: z.string().default(""),
  summary: z.string().default(""),
  description: z.string().default(""),
  coverImage: z.string().default(""),
  gallery: z.array(z.string()).default([]),
  bestSeasons: z.array(z.string()).default([]),
  altitudeRange: z.object({ min: z.number().default(0), max: z.number().default(0) }).optional(),
  highlights: z.array(z.string()).default([]),
  travelGuide: z.string().default(""),
  weatherNotes: z.string().default(""),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      canonical: z.string().optional(),
      ogImage: z.string().optional(),
    })
    .optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

export const updateDestinationSchema = createDestinationSchema.partial();

export const listDestinationsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  q: z.string().optional(),
  region: z.string().optional(),
  state: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
});
