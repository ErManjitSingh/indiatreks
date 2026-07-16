import { z } from "zod";
import { Types } from "mongoose";

export const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid identifier",
});

export const paramsIdSchema = z.object({
  id: objectIdSchema,
});

export const paramsSlugSchema = z.object({
  slug: z.string().min(1),
});

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  sort: z.string().optional(),
});
