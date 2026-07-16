import { z } from "zod";

const travelerSchema = z.object({
  fullName: z.string().min(1),
  age: z.number().int().min(0).optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  phone: z.string().optional(),
  emergencyContact: z.string().optional(),
});

export const createBookingSchema = z.object({
  trekSlug: z.string().min(1),
  departureDate: z.coerce.date(),
  travelers: z.array(travelerSchema).min(1),
  couponCode: z.string().optional(),
  customer: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(6),
  }),
  notes: z.string().optional(),
});

export const updateBookingStatusSchema = z.object({
  bookingStatus: z.enum(["pending", "confirmed", "cancelled", "completed"]).optional(),
  paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]).optional(),
  notes: z.string().optional(),
});

export const listBookingsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  bookingStatus: z.enum(["pending", "confirmed", "cancelled", "completed"]).optional(),
  paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]).optional(),
  q: z.string().optional(),
});

export const cancelBookingSchema = z.object({
  reason: z.string().optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
