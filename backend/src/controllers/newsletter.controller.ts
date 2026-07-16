import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { newsletterService } from "../services/newsletter.service";

export const subscribe = asyncHandler(async (req: Request, res: Response) => {
  const subscriber = await newsletterService.subscribe(req.body.email, req.body.source);
  return sendSuccess(res, subscriber, "Subscribed successfully", 201);
});

export const unsubscribe = asyncHandler(async (req: Request, res: Response) => {
  await newsletterService.unsubscribe(req.body.email);
  return sendSuccess(res, null, "Unsubscribed successfully");
});

export const listSubscribers = asyncHandler(async (req: Request, res: Response) => {
  const { items, meta } = await newsletterService.list(req.query as never);
  return sendPaginated(res, items, meta);
});
