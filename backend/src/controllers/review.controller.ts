import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { reviewService } from "../services/review.service";

export const listReviews = asyncHandler(async (req: Request, res: Response) => {
  const { items, meta } = await reviewService.list(req.query as never);
  return sendPaginated(res, items, meta);
});

export const createReview = asyncHandler(async (req: Request, res: Response) => {
  const review = await reviewService.create({ ...req.body, userId: req.user?.id });
  return sendSuccess(res, review, "Review submitted for moderation", 201);
});

export const moderateReview = asyncHandler(async (req: Request, res: Response) => {
  const review = await reviewService.moderate((req.params.id as string), req.body.status);
  return sendSuccess(res, review, "Review status updated");
});

export const markHelpful = asyncHandler(async (req: Request, res: Response) => {
  const review = await reviewService.markHelpful((req.params.id as string));
  return sendSuccess(res, review, "Marked as helpful");
});

export const deleteReview = asyncHandler(async (req: Request, res: Response) => {
  await reviewService.softDelete((req.params.id as string));
  return sendSuccess(res, null, "Review deleted");
});
