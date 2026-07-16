import { z } from "zod";

export const createNotificationSchema = z.object({
  user: z.string().optional(),
  title: z.string().min(1),
  body: z.string().default(""),
  type: z.string().default("general"),
  data: z.record(z.string(), z.unknown()).optional(),
});

export const listNotificationsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  read: z.coerce.boolean().optional(),
});
