import type { Request } from "express";
import { AuditLogModel } from "../models/AuditLog.model";
import { logger } from "../utils/logger";

interface AuditParams {
  req: Request;
  action: string;
  resource: string;
  resourceId?: string;
  meta?: Record<string, unknown>;
}

export async function logAudit({ req, action, resource, resourceId, meta }: AuditParams): Promise<void> {
  try {
    await AuditLogModel.create({
      actor: req.user?.id,
      action,
      resource,
      resourceId,
      ip: req.ip,
      meta,
    });
  } catch (err) {
    logger.warn("Failed to write audit log", { error: (err as Error).message, action, resource });
  }
}
