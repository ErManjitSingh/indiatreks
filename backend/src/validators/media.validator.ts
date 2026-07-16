import { z } from "zod";

export const updateMediaSchema = z.object({
  alt: z.string().optional(),
  folder: z.string().optional(),
});

export const listMediaQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(30),
  folder: z.string().optional(),
});
