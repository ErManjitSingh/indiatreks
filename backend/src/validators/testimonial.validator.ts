import { z } from "zod";

export const createTestimonialSchema = z.object({
  name: z.string().min(1),
  role: z.string().optional(),
  comment: z.string().min(1),
  rating: z.number().int().min(1).max(5).default(5),
  avatar: z.string().optional(),
  featured: z.boolean().default(false),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
});

export const updateTestimonialSchema = createTestimonialSchema.partial();

export const listTestimonialsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  featured: z.coerce.boolean().optional(),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
});
