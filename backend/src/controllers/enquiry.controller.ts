import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { enquiryService } from "../services/enquiry.service";

export const createEnquiry = asyncHandler(async (req: Request, res: Response) => {
  const enquiry = await enquiryService.create(req.body);
  return sendSuccess(res, enquiry, "Enquiry submitted successfully", 201);
});

export const listEnquiries = asyncHandler(async (req: Request, res: Response) => {
  const { items, meta } = await enquiryService.list(req.query as never);
  return sendPaginated(res, items, meta);
});

export const getEnquiry = asyncHandler(async (req: Request, res: Response) => {
  const enquiry = await enquiryService.getById((req.params.id as string));
  return sendSuccess(res, enquiry);
});

export const updateEnquiryStatus = asyncHandler(async (req: Request, res: Response) => {
  const enquiry = await enquiryService.updateStatus((req.params.id as string), req.body.status);
  return sendSuccess(res, enquiry, "Enquiry status updated");
});

export const deleteEnquiry = asyncHandler(async (req: Request, res: Response) => {
  await enquiryService.softDelete((req.params.id as string));
  return sendSuccess(res, null, "Enquiry deleted");
});
