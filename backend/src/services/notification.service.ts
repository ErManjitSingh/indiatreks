import { NotificationModel, INotification } from "../models/Notification.model";
import { getPagination, paginateMeta } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";

interface ListQuery {
  page?: number;
  limit?: number;
  read?: boolean;
}

async function create(data: Partial<INotification>) {
  return NotificationModel.create(data);
}

async function listForUser(userId: string, query: ListQuery) {
  const { page, limit, skip } = getPagination(query as Record<string, unknown>);
  const filter: Record<string, unknown> = { user: userId };
  if (query.read !== undefined) filter.read = query.read;

  const [items, total] = await Promise.all([
    NotificationModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    NotificationModel.countDocuments(filter),
  ]);
  return { items, meta: paginateMeta(total, page, limit) };
}

async function markRead(id: string, userId: string) {
  const notification = await NotificationModel.findOneAndUpdate(
    { _id: id, user: userId },
    { read: true },
    { new: true },
  );
  if (!notification) throw new ApiError(404, "Notification not found", "NOTIFICATION_NOT_FOUND");
  return notification;
}

async function markAllRead(userId: string) {
  await NotificationModel.updateMany({ user: userId, read: false }, { read: true });
  return true;
}

export const notificationService = {
  create,
  listForUser,
  markRead,
  markAllRead,
};
