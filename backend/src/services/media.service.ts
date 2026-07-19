import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import multer from "multer";

import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";
import { MediaModel } from "../models/Media.model";

let configured = false;

function isCloudinaryConfigured(): boolean {
  return Boolean(env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET);
}

function ensureConfigured(): void {
  if (configured || !isCloudinaryConfigured()) return;
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  });
  configured = true;
}

function extFromMime(mimetype?: string, originalname?: string): string {
  if (mimetype === "image/jpeg") return "jpg";
  if (mimetype === "image/png") return "png";
  if (mimetype === "image/webp") return "webp";
  if (mimetype === "image/gif") return "gif";
  if (mimetype === "image/avif") return "avif";
  const fromName = originalname?.split(".").pop()?.toLowerCase();
  if (fromName && ["jpg", "jpeg", "png", "webp", "gif", "avif"].includes(fromName)) {
    return fromName === "jpeg" ? "jpg" : fromName;
  }
  return "jpg";
}

function sanitizeFolder(folder?: string): string {
  const cleaned = (folder || env.CLOUDINARY_FOLDER || "site-assets")
    .replace(/\\/g, "/")
    .split("/")
    .map((part) => part.replace(/[^a-zA-Z0-9_-]/g, ""))
    .filter(Boolean)
    .join("/");
  return cleaned || "site-assets";
}

export const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: env.UPLOAD_MAX_MB * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^image\/(png|jpe?g|webp|gif|avif)$/.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new ApiError(400, "Only image files are allowed", "INVALID_FILE_TYPE"));
    }
  },
});

async function uploadToCloudinary(buffer: Buffer, folder?: string): Promise<UploadApiResponse> {
  ensureConfigured();
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folder ?? env.CLOUDINARY_FOLDER, resource_type: "image" },
      (err, result) => {
        if (err || !result) {
          reject(err ?? new Error("Upload failed"));
          return;
        }
        resolve(result);
      },
    );
    stream.end(buffer);
  });
}

async function uploadToLocal(
  buffer: Buffer,
  options: { folder?: string; mimetype?: string; originalname?: string },
): Promise<{
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}> {
  const folder = sanitizeFolder(options.folder);
  const ext = extFromMime(options.mimetype, options.originalname);
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
  const dir = path.join(process.cwd(), "uploads", folder);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), buffer);

  // Absolute URL so Next.js `next/image` treats uploads as remote (relative
  // `/api/uploads/...` is resolved against `public/` and never reaches Express).
  const publicBase = (env.FRONTEND_URL || env.APP_URL).replace(/\/$/, "");
  return {
    public_id: `local/${folder}/${filename}`,
    secure_url: `${publicBase}/api/uploads/${folder}/${filename}`,
    format: ext,
    width: 0,
    height: 0,
    bytes: buffer.length,
  };
}

async function uploadImage(
  buffer: Buffer,
  options: {
    folder?: string;
    alt?: string;
    uploadedBy?: string;
    mimetype?: string;
    originalname?: string;
  } = {},
) {
  const result = isCloudinaryConfigured()
    ? await uploadToCloudinary(buffer, options.folder)
    : await uploadToLocal(buffer, options);

  const media = await MediaModel.create({
    publicId: result.public_id,
    url: result.secure_url,
    format: result.format,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
    folder: sanitizeFolder(options.folder),
    uploadedBy: options.uploadedBy,
    alt: options.alt,
  });
  return media;
}

async function deleteImage(publicId: string): Promise<void> {
  if (publicId.startsWith("local/")) {
    const relative = publicId.replace(/^local\//, "");
    const filePath = path.join(process.cwd(), "uploads", relative);
    try {
      await fs.unlink(filePath);
    } catch (err) {
      logger.warn("Failed to delete local image", { publicId, error: (err as Error).message });
    }
  } else if (isCloudinaryConfigured()) {
    ensureConfigured();
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      logger.warn("Failed to delete image from Cloudinary", {
        publicId,
        error: (err as Error).message,
      });
    }
  }
  await MediaModel.findOneAndUpdate({ publicId }, { deletedAt: new Date() });
}

export const mediaService = {
  isCloudinaryConfigured,
  uploadImage,
  deleteImage,
};
