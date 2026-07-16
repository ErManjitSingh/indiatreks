import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { seoService } from "../services/seo.service";

export const listSeoPages = asyncHandler(async (req: Request, res: Response) => {
  const { items, meta } = await seoService.list(req.query as never);
  return sendPaginated(res, items, meta);
});

export const getSeoPage = asyncHandler(async (req: Request, res: Response) => {
  const page = await seoService.getByPath(decodeURIComponent((req.params.path as string)));
  return sendSuccess(res, page);
});

export const upsertSeoPage = asyncHandler(async (req: Request, res: Response) => {
  const page = await seoService.upsert(req.body);
  return sendSuccess(res, page, "SEO page saved");
});

export const deleteSeoPage = asyncHandler(async (req: Request, res: Response) => {
  await seoService.softDelete((req.params.id as string));
  return sendSuccess(res, null, "SEO page deleted");
});
