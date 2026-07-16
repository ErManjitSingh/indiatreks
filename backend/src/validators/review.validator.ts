import { z } from "zod";

export const createReviewSchema = z.object({
  trekSlug: z.string().min(1),
  name: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1),
});

export const moderateReviewSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]),
});

export const listReviewsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  trekSlug: z.string().optional(),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
});
