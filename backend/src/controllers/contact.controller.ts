import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { contactService } from "../services/contact.service";

export const createContact = asyncHandler(async (req: Request, res: Response) => {
  const contact = await contactService.create(req.body);
  return sendSuccess(res, contact, "Message sent successfully", 201);
});

export const listContacts = asyncHandler(async (req: Request, res: Response) => {
  const { items, meta } = await contactService.list(req.query as never);
  return sendPaginated(res, items, meta);
});

export const getContact = asyncHandler(async (req: Request, res: Response) => {
  const contact = await contactService.getById((req.params.id as string));
  return sendSuccess(res, contact);
});

export const updateContactStatus = asyncHandler(async (req: Request, res: Response) => {
  const contact = await contactService.updateStatus((req.params.id as string), req.body.status);
  return sendSuccess(res, contact, "Contact status updated");
});

export const deleteContact = asyncHandler(async (req: Request, res: Response) => {
  await contactService.softDelete((req.params.id as string));
  return sendSuccess(res, null, "Contact message deleted");
});
