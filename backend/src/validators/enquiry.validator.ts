import { z } from "zod";

export const createEnquirySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  trekSlug: z.string().optional(),
  trekTitle: z.string().optional(),
  preferredDate: z.coerce.date().optional(),
  travelers: z.number().int().min(1).default(1),
  message: z.string().optional(),
});

export const updateEnquiryStatusSchema = z.object({
  status: z.enum(["new", "contacted", "converted", "closed"]),
});

export const listEnquiriesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  status: z.enum(["new", "contacted", "converted", "closed"]).optional(),
  q: z.string().optional(),
});
