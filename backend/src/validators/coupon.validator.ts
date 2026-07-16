import { z } from "zod";

export const createCouponSchema = z.object({
  code: z.string().trim().min(3).max(30).toUpperCase(),
  type: z.enum(["percent", "fixed"]),
  value: z.number().min(0),
  minAmount: z.number().min(0).default(0),
  maxDiscount: z.number().min(0).optional(),
  usageLimit: z.number().min(0).optional(),
  validFrom: z.coerce.date().optional(),
  validTo: z.coerce.date(),
  active: z.boolean().default(true),
});

export const updateCouponSchema = createCouponSchema.partial();

export const applyCouponSchema = z.object({
  code: z.string().trim().min(3).max(30),
  amount: z.number().min(0),
});

export const listCouponsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  active: z.coerce.boolean().optional(),
});
