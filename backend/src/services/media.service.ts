import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
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

async function uploadBuffer(buffer: Buffer, folder?: string): Promise<UploadApiResponse> {
  ensureConfigured();
  if (!isCloudinaryConfigured()) {
    throw new ApiError(503, "Media storage is not configured", "MEDIA_NOT_CONFIGURED");
  }

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

async function uploadImage(
  buffer: Buffer,
  options: { folder?: string; alt?: string; uploadedBy?: string } = {},
) {
  const result = await uploadBuffer(buffer, options.folder);
  const media = await MediaModel.create({
    publicId: result.public_id,
    url: result.secure_url,
    format: result.format,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
    folder: options.folder ?? env.CLOUDINARY_FOLDER,
    uploadedBy: options.uploadedBy,
    alt: options.alt,
  });
  return media;
}

async function deleteImage(publicId: string): Promise<void> {
  ensureConfigured();
  if (isCloudinaryConfigured()) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      logger.warn("Failed to delete image from Cloudinary", { publicId, error: (err as Error).message });
    }
  }
  await MediaModel.findOneAndUpdate({ publicId }, { deletedAt: new Date() });
}

export const mediaService = {
  isCloudinaryConfigured,
  uploadImage,
  deleteImage,
};
