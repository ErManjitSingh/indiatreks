"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export type ActionResult =
  | { success: true; message: string }
  | { success: false; message: string; errors?: Record<string, string[]> };

export async function submitContactAction(
  input: ContactFormValues,
): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // Persist / email integration will be connected in later phases.
  return {
    success: true,
    message: "Thanks! Our trek specialist will contact you shortly.",
  };
}

const bookingEnquirySchema = z.object({
  trekSlug: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  travelers: z.coerce.number().int().min(1).max(20),
  preferredDate: z.string().min(1),
  notes: z.string().optional(),
});

export type BookingEnquiryValues = z.infer<typeof bookingEnquirySchema>;

export async function submitBookingEnquiryAction(
  input: BookingEnquiryValues,
): Promise<ActionResult> {
  const parsed = bookingEnquirySchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Unable to submit booking enquiry.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    message: "Booking enquiry received. We will confirm availability soon.",
  };
}
