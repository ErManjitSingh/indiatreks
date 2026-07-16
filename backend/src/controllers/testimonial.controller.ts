import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { testimonialService } from "../services/testimonial.service";
import { isStaffUser } from "../middlewares/auth";

export const listTestimonials = asyncHandler(async (req: Request, res: Response) => {
  const isAdmin = isStaffUser(req);
  const query = { ...req.query } as Record<string, unknown>;
  if (!isAdmin) query.status = "approved";
  const { items, meta } = await testimonialService.list(query as never);
  return sendPaginated(res, items, meta);
});

export const createTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const testimonial = await testimonialService.create(req.body);
  return sendSuccess(res, testimonial, "Testimonial submitted", 201);
});

export const updateTestimonial = asyncHandler(async (req: Request, res: Response) => {
  const testimonial = await testimonialService.update((req.params.id as string), req.body);
  return sendSuccess(res, testimonial, "Testimonial updated");
});

export const deleteTestimonial = asyncHandler(async (req: Request, res: Response) => {
  await testimonialService.softDelete((req.params.id as string));
  return sendSuccess(res, null, "Testimonial deleted");
});
