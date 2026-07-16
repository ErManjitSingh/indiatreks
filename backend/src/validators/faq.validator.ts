import { z } from "zod";

export const createFaqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  category: z.string().optional(),
  trek: z.string().optional(),
  sortOrder: z.number().default(0),
  status: z.enum(["draft", "published"]).default("published"),
});

export const updateFaqSchema = createFaqSchema.partial();

export const listFaqsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(50),
  category: z.string().optional(),
  trek: z.string().optional(),
  status: z.enum(["draft", "published"]).optional(),
});
