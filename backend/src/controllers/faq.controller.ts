import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { faqService } from "../services/faq.service";
import { isStaffUser } from "../middlewares/auth";

export const listFaqs = asyncHandler(async (req: Request, res: Response) => {
  const isAdmin = isStaffUser(req);
  const query = { ...req.query } as Record<string, unknown>;
  if (!isAdmin) query.status = "published";
  const { items, meta } = await faqService.list(query as never);
  return sendPaginated(res, items, meta);
});

export const createFaq = asyncHandler(async (req: Request, res: Response) => {
  const faq = await faqService.create(req.body);
  return sendSuccess(res, faq, "FAQ created", 201);
});

export const updateFaq = asyncHandler(async (req: Request, res: Response) => {
  const faq = await faqService.update((req.params.id as string), req.body);
  return sendSuccess(res, faq, "FAQ updated");
});

export const deleteFaq = asyncHandler(async (req: Request, res: Response) => {
  await faqService.softDelete((req.params.id as string));
  return sendSuccess(res, null, "FAQ deleted");
});
