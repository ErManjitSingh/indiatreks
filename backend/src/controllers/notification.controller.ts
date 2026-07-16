import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { notificationService } from "../services/notification.service";
import { ApiError } from "../utils/ApiError";

export const listMyNotifications = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Authentication required", "UNAUTHENTICATED");
  const { items, meta } = await notificationService.listForUser(req.user.id, req.query as never);
  return sendPaginated(res, items, meta);
});

export const markNotificationRead = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Authentication required", "UNAUTHENTICATED");
  const notification = await notificationService.markRead((req.params.id as string), req.user.id);
  return sendSuccess(res, notification, "Notification marked as read");
});

export const markAllNotificationsRead = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Authentication required", "UNAUTHENTICATED");
  await notificationService.markAllRead(req.user.id);
  return sendSuccess(res, null, "All notifications marked as read");
});

export const createNotification = asyncHandler(async (req: Request, res: Response) => {
  const notification = await notificationService.create(req.body);
  return sendSuccess(res, notification, "Notification created", 201);
});
