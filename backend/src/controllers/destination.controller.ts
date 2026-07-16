import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { destinationService } from "../services/destination.service";

export const listDestinations = asyncHandler(async (req: Request, res: Response) => {
  const isAdmin = Boolean(req.user);
  const query = { ...req.query } as Record<string, unknown>;
  if (!isAdmin) query.status = "published";
  const { items, meta } = await destinationService.list(query as never);
  return sendPaginated(res, items, meta);
});

export const getDestinationBySlug = asyncHandler(async (req: Request, res: Response) => {
  const includeUnpublished = Boolean(req.user);
  const destination = await destinationService.getBySlug((req.params.slug as string), includeUnpublished);
  return sendSuccess(res, destination);
});

export const getDestinationById = asyncHandler(async (req: Request, res: Response) => {
  const destination = await destinationService.getById((req.params.id as string));
  return sendSuccess(res, destination);
});

export const createDestination = asyncHandler(async (req: Request, res: Response) => {
  const destination = await destinationService.create(req.body);
  return sendSuccess(res, destination, "Destination created", 201);
});

export const updateDestination = asyncHandler(async (req: Request, res: Response) => {
  const destination = await destinationService.update((req.params.id as string), req.body);
  return sendSuccess(res, destination, "Destination updated");
});

export const deleteDestination = asyncHandler(async (req: Request, res: Response) => {
  await destinationService.softDelete((req.params.id as string));
  return sendSuccess(res, null, "Destination deleted");
});
