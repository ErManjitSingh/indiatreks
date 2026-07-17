import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/response";
import { searchService } from "../services/search.service";

export const globalSearch = asyncHandler(async (req: Request, res: Response) => {
  const q = String(req.query.q || "");
  const limit = Number(req.query.limit) || 10;
  const types = req.query.types ? String(req.query.types).split(",") : undefined;
  const results = await searchService.globalSearch({ q, limit, types });
  return sendSuccess(res, results);
});

export const autocomplete = asyncHandler(async (req: Request, res: Response) => {
  const q = String(req.query.q || "");
  const limit = Number(req.query.limit) || 8;
  const results = await searchService.autocomplete(q, limit);
  return sendSuccess(res, results);
});

export const suggestions = asyncHandler(async (req: Request, res: Response) => {
  const q = String(req.query.q || "");
  const limit = Number(req.query.limit) || 6;
  const results = await searchService.suggestions(q, limit);
  return sendSuccess(res, results);
});

export const popularSearches = asyncHandler(async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 10;
  const results = await searchService.popularSearches(limit);
  return sendSuccess(res, results);
});

export const trendingSearches = asyncHandler(async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 10;
  const results = await searchService.trendingSearches(limit);
  return sendSuccess(res, results);
});
