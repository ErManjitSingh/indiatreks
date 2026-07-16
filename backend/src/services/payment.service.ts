import crypto from "node:crypto";
import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";
import { PaymentModel } from "../models/Payment.model";
import { bookingRepository } from "../repositories/BookingRepository";

function isRazorpayConfigured(): boolean {
  return Boolean(env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET);
}

async function createOrder(bookingId: string) {
  const booking = await bookingRepository.findById(bookingId);
  if (!booking) {
    throw new ApiError(404, "Booking not found", "BOOKING_NOT_FOUND");
  }
  if (booking.paymentStatus === "paid") {
    throw new ApiError(400, "This booking has already been paid for", "ALREADY_PAID");
  }

  const amountInPaise = Math.round(booking.amount * 100);

  if (!isRazorpayConfigured()) {
    logger.warn("Razorpay is not configured; returning a mock order for development");
    const mockOrderId = `mock_order_${crypto.randomBytes(8).toString("hex")}`;
    const payment = await PaymentModel.create({
      booking: booking._id,
      orderId: mockOrderId,
      amount: booking.amount,
      currency: booking.currency,
      status: "created",
    });
    return {
      orderId: payment.orderId,
      amount: amountInPaise,
      currency: booking.currency,
      keyId: "mock",
      bookingCode: booking.bookingCode,
    };
  }

  // Razorpay-ready: calls the REST API directly via Basic Auth so no extra SDK dependency is required.
  const basicAuth = Buffer.from(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amountInPaise,
      currency: booking.currency,
      receipt: booking.bookingCode,
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    logger.error("Razorpay order creation failed", { status: response.status, body: errBody });
    throw new ApiError(502, "Failed to create payment order", "PAYMENT_GATEWAY_ERROR");
  }

  const order = (await response.json()) as { id: string };

  await PaymentModel.create({
    booking: booking._id,
    orderId: order.id,
    amount: booking.amount,
    currency: booking.currency,
    status: "created",
  });

  return {
    orderId: order.id,
    amount: amountInPaise,
    currency: booking.currency,
    keyId: env.RAZORPAY_KEY_ID,
    bookingCode: booking.bookingCode,
  };
}

interface VerifyPaymentInput {
  orderId: string;
  paymentId: string;
  signature: string;
}

async function verifyPayment(input: VerifyPaymentInput) {
  const payment = await PaymentModel.findOne({ orderId: input.orderId });
  if (!payment) {
    throw new ApiError(404, "Payment record not found", "PAYMENT_NOT_FOUND");
  }

  if (isRazorpayConfigured()) {
    const expectedSignature = crypto
      .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
      .update(`${input.orderId}|${input.paymentId}`)
      .digest("hex");

    if (expectedSignature !== input.signature) {
      payment.status = "failed";
      await payment.save();
      throw new ApiError(400, "Payment signature verification failed", "INVALID_SIGNATURE");
    }
  } else {
    logger.warn("Razorpay not configured; skipping signature verification (dev mode)");
  }

  payment.paymentId = input.paymentId;
  payment.status = "captured";
  await payment.save();

  await bookingRepository.updateById(String(payment.booking), { paymentStatus: "paid", bookingStatus: "confirmed" });

  return payment;
}

async function handleWebhook(rawBody: string, signature: string) {
  if (!env.RAZORPAY_WEBHOOK_SECRET) {
    logger.warn("Razorpay webhook secret not configured; ignoring webhook");
    return { received: true, processed: false };
  }

  const expected = crypto
    .createHmac("sha256", env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  if (expected !== signature) {
    throw new ApiError(400, "Invalid webhook signature", "INVALID_WEBHOOK_SIGNATURE");
  }

  const payload = JSON.parse(rawBody) as {
    event: string;
    payload?: { payment?: { entity?: { order_id?: string; id?: string } } };
  };

  const orderId = payload.payload?.payment?.entity?.order_id;
  if (!orderId) return { received: true, processed: false };

  const payment = await PaymentModel.findOne({ orderId });
  if (!payment) return { received: true, processed: false };

  if (payload.event === "payment.captured") {
    payment.status = "captured";
    payment.paymentId = payload.payload?.payment?.entity?.id;
    await payment.save();
    await bookingRepository.updateById(String(payment.booking), {
      paymentStatus: "paid",
      bookingStatus: "confirmed",
    });
  } else if (payload.event === "payment.failed") {
    payment.status = "failed";
    await payment.save();
    await bookingRepository.updateById(String(payment.booking), { paymentStatus: "failed" });
  }

  return { received: true, processed: true };
}

export const paymentService = {
  isRazorpayConfigured,
  createOrder,
  verifyPayment,
  handleWebhook,
};
