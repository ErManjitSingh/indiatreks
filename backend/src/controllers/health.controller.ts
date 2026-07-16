import type { Request, Response } from "express";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/response";
import { env } from "../config/env";

export const healthCheck = asyncHandler(async (_req: Request, res: Response) => {
  const dbStates = ["disconnected", "connected", "connecting", "disconnecting"];
  return sendSuccess(res, {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    database: dbStates[mongoose.connection.readyState] ?? "unknown",
  });
});
