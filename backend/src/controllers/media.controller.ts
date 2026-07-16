import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { mediaService } from "../services/media.service";
import { MediaModel } from "../models/Media.model";
import { getPagination, paginateMeta } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";

export const uploadMedia = asyncHandler(async (req: Request, res: Response) => {
  const file = (req as unknown as { file?: { buffer: Buffer } }).file;
  if (!file) throw new ApiError(400, "No file uploaded", "FILE_REQUIRED");

  const media = await mediaService.uploadImage(file.buffer, {
    folder: req.body.folder,
    alt: req.body.alt,
    uploadedBy: req.user?.id,
  });
  return sendSuccess(res, media, "File uploaded", 201);
});

export const listMedia = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, skip } = getPagination(req.query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (req.query.folder) filter.folder = req.query.folder;

  const [items, total] = await Promise.all([
    MediaModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    MediaModel.countDocuments(filter),
  ]);
  return sendPaginated(res, items, paginateMeta(total, page, limit));
});

export const deleteMedia = asyncHandler(async (req: Request, res: Response) => {
  const media = await MediaModel.findById((req.params.id as string));
  if (!media) throw new ApiError(404, "Media not found", "MEDIA_NOT_FOUND");
  await mediaService.deleteImage(media.publicId);
  return sendSuccess(res, null, "Media deleted");
});
