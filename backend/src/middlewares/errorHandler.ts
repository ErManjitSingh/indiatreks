import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";
import { env } from "../config/env";

interface MongoDuplicateKeyError extends Error {
  code?: number;
  keyValue?: Record<string, unknown>;
}

interface MongooseValidationError extends Error {
  errors: Record<string, { message: string; path: string }>;
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  let statusCode = 500;
  let message = "Internal server error";
  let code = "INTERNAL_ERROR";
  let details: unknown;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    code = err.code;
    details = err.details;
  } else if (err instanceof Error && err.name === "ValidationError") {
    const validationErr = err as MongooseValidationError;
    statusCode = 422;
    code = "VALIDATION_ERROR";
    message = "Validation failed";
    details = Object.values(validationErr.errors).map((e) => ({ path: e.path, message: e.message }));
  } else if (err instanceof Error && (err as MongoDuplicateKeyError).code === 11000) {
    const dupErr = err as MongoDuplicateKeyError;
    statusCode = 409;
    code = "DUPLICATE_KEY";
    message = `Duplicate value for field: ${Object.keys(dupErr.keyValue ?? {}).join(", ") || "unknown"}`;
  } else if (err instanceof Error && err.name === "CastError") {
    statusCode = 400;
    code = "INVALID_ID";
    message = "Invalid identifier supplied";
  } else if (err instanceof Error) {
    message = env.NODE_ENV === "production" ? "Internal server error" : err.message;
  }

  if (statusCode >= 500) {
    logger.error(err instanceof Error ? err.stack ?? err.message : String(err), {
      url: req.originalUrl,
      method: req.method,
    });
  } else {
    logger.warn(message, { url: req.originalUrl, method: req.method, statusCode });
  }

  res.status(statusCode).json({
    success: false,
    message,
    code,
    ...(details ? { details } : {}),
    ...(env.NODE_ENV !== "production" && err instanceof Error ? { stack: err.stack } : {}),
  });
}
