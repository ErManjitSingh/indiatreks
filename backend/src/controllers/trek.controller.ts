import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { trekService } from "../services/trek.service";
import { logAudit } from "../middlewares/audit";

export const listTreks = asyncHandler(async (req: Request, res: Response) => {
  const isAdmin = Boolean(req.user);
  const query = { ...req.query } as Record<string, unknown>;
  if (!isAdmin) query.status = "published";
  const { items, meta } = await trekService.list(query as never);
  return sendPaginated(res, items, meta);
});

export const getTrekBySlug = asyncHandler(async (req: Request, res: Response) => {
  const includeUnpublished = Boolean(req.user);
  const trek = await trekService.getBySlug((req.params.slug as string), includeUnpublished);
  return sendSuccess(res, trek);
});

export const getRelatedTreks = asyncHandler(async (req: Request, res: Response) => {
  const treks = await trekService.getRelated((req.params.slug as string), Number(req.query.limit) || 4);
  return sendSuccess(res, treks);
});

export const createTrek = asyncHandler(async (req: Request, res: Response) => {
  const trek = await trekService.create(req.body);
  await logAudit({ req, action: "create", resource: "Trek", resourceId: String(trek._id) });
  return sendSuccess(res, trek, "Trek created", 201);
});

export const getTrekById = asyncHandler(async (req: Request, res: Response) => {
  const trek = await trekService.getById((req.params.id as string));
  return sendSuccess(res, trek);
});

export const updateTrek = asyncHandler(async (req: Request, res: Response) => {
  const trek = await trekService.update((req.params.id as string), req.body);
  await logAudit({ req, action: "update", resource: "Trek", resourceId: (req.params.id as string) });
  return sendSuccess(res, trek, "Trek updated");
});

export const deleteTrek = asyncHandler(async (req: Request, res: Response) => {
  await trekService.softDelete((req.params.id as string));
  await logAudit({ req, action: "delete", resource: "Trek", resourceId: (req.params.id as string) });
  return sendSuccess(res, null, "Trek deleted");
});

export const restoreTrek = asyncHandler(async (req: Request, res: Response) => {
  const trek = await trekService.restore((req.params.id as string));
  return sendSuccess(res, trek, "Trek restored");
});
