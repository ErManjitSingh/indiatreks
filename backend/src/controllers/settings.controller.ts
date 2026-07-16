import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/response";
import { settingsService } from "../services/settings.service";
import { invalidateBootstrapCache } from "./content.controller";

export const getSettings = asyncHandler(async (req: Request, res: Response) => {
  const settings = await settingsService.getAll(req.query.group as string | undefined);
  return sendSuccess(res, settings);
});

export const upsertSetting = asyncHandler(async (req: Request, res: Response) => {
  const setting = await settingsService.upsert(req.body.key, req.body.value, req.body.group);
  invalidateBootstrapCache();
  return sendSuccess(res, setting, "Setting saved");
});

export const bulkUpsertSettings = asyncHandler(async (req: Request, res: Response) => {
  const settings = await settingsService.bulkUpsert(req.body.settings);
  invalidateBootstrapCache();
  return sendSuccess(res, settings, "Settings saved");
});
