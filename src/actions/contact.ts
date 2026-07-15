"use server";

import { z } from "zod";

import { ENQUIRY_EMAIL, sendBrandEmail } from "@/lib/email";
import { buildBookingConfirmationEmailHtml } from "@/lib/booking/email-template";

export type ActionResult =
  | { success: true; message: string }
  | { success: false; message: string; errors?: Record<string, string[]> };

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

  const data = parsed.data;
  const delivered = await sendBrandEmail({
    subject: `New booking enquiry — ${data.trekSlug}`,
    type: "enquiry",
    fields: {
      trekSlug: data.trekSlug,
      name: data.name,
      email: data.email,
      phone: data.phone,
      travelers: data.travelers,
      preferredDate: data.preferredDate,
      notes: data.notes ?? "",
      inbox: ENQUIRY_EMAIL,
    },
  });

  if (!delivered.ok) {
    return { success: false, message: delivered.message };
  }

  return {
    success: true,
    message: "Enquiry received. Our trek specialist will contact you shortly.",
  };
}

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

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

  const data = parsed.data;
  const delivered = await sendBrandEmail({
    subject: `Contact form — ${data.name}`,
    type: "enquiry",
    fields: { ...data, inbox: ENQUIRY_EMAIL },
  });

  if (!delivered.ok) {
    return { success: false, message: delivered.message };
  }

  return {
    success: true,
    message: "Thanks! Our trek specialist will contact you shortly.",
  };
}

const callbackSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  preferredTime: z.string().min(1),
});

export async function submitCallbackAction(
  input: z.infer<typeof callbackSchema>,
): Promise<ActionResult> {
  const parsed = callbackSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Please share a valid name, phone, and time." };
  }

  const delivered = await sendBrandEmail({
    subject: `Callback request — ${parsed.data.name}`,
    type: "callback",
    fields: { ...parsed.data, inbox: ENQUIRY_EMAIL },
  });

  if (!delivered.ok) {
    return { success: false, message: delivered.message };
  }

  return { success: true, message: "Callback requested. We will call you soon." };
}

const exitOfferSchema = z.object({
  phone: z.string().min(10),
});

export async function submitExitOfferAction(
  input: z.infer<typeof exitOfferSchema>,
): Promise<ActionResult> {
  const parsed = exitOfferSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Enter a valid mobile number." };
  }

  const delivered = await sendBrandEmail({
    subject: `Exit offer lead — 10% OFF`,
    type: "exit-offer",
    fields: {
      phone: parsed.data.phone,
      offer: "EXIT10 — Flat 10% OFF",
      inbox: ENQUIRY_EMAIL,
    },
  });

  if (!delivered.ok) {
    return { success: false, message: delivered.message };
  }

  return {
    success: true,
    message: "Offer locked! Use coupon EXIT10 at checkout.",
  };
}

const confirmedBookingSchema = z.object({
  bookingId: z.string().min(3),
  trekTitle: z.string().min(2),
  trekSlug: z.string().min(1),
  departureDate: z.string().min(1),
  adults: z.number().int().min(0),
  children: z.number().int().min(0),
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(10),
  city: z.string().optional(),
  grandTotal: z.number(),
  advancePayment: z.number(),
  remainingAmount: z.number(),
  paymentMethod: z.string().nullable(),
  couponCode: z.string().nullable().optional(),
});

export type ConfirmedBookingPayload = z.infer<typeof confirmedBookingSchema>;

export async function submitConfirmedBookingAction(
  input: ConfirmedBookingPayload,
): Promise<ActionResult> {
  const parsed = confirmedBookingSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Booking details incomplete." };
  }

  const data = parsed.data;
  const html = buildBookingConfirmationEmailHtml(data);

  const delivered = await sendBrandEmail({
    subject: `Booking confirmed ${data.bookingId} — ${data.trekTitle}`,
    type: "booking",
    html,
    fields: {
      bookingId: data.bookingId,
      trekTitle: data.trekTitle,
      trekSlug: data.trekSlug,
      departureDate: data.departureDate,
      adults: data.adults,
      children: data.children,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      city: data.city ?? "",
      grandTotal: data.grandTotal,
      advancePayment: data.advancePayment,
      remainingAmount: data.remainingAmount,
      paymentMethod: data.paymentMethod ?? "",
      couponCode: data.couponCode ?? "",
      inbox: ENQUIRY_EMAIL,
    },
  });

  if (!delivered.ok) {
    return { success: false, message: delivered.message };
  }

  return {
    success: true,
    message: "Booking confirmation sent to our operations team.",
  };
}
