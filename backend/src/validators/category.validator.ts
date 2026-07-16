import { z } from "zod";

export const createCategorySchema = z.object({
  slug: z.string().trim().toLowerCase().optional(),
  name: z.string().trim().min(1).max(120),
  type: z.enum(["trek", "blog"]),
  description: z.string().optional(),
  image: z.string().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

export const listCategoriesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(50),
  type: z.enum(["trek", "blog"]).optional(),
});
