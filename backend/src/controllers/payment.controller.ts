import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/response";
import { paymentService } from "../services/payment.service";

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await paymentService.createOrder(req.body.bookingId);
  return sendSuccess(res, order, "Order created");
});

export const verifyPayment = asyncHandler(async (req: Request, res: Response) => {
  const payment = await paymentService.verifyPayment(req.body);
  return sendSuccess(res, payment, "Payment verified");
});

export const webhook = asyncHandler(async (req: Request, res: Response) => {
  const signature = req.headers["x-razorpay-signature"] as string;
  const rawBody = (req as unknown as { rawBody?: string }).rawBody ?? JSON.stringify(req.body);
  const result = await paymentService.handleWebhook(rawBody, signature);
  return sendSuccess(res, result, "Webhook processed");
});
