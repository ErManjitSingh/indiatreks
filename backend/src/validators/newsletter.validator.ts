import { z } from "zod";

export const subscribeNewsletterSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  source: z.string().optional(),
});

export const unsubscribeNewsletterSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
});

export const listNewsletterQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(50),
  status: z.enum(["subscribed", "unsubscribed"]).optional(),
});
