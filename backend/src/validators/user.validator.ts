import { z } from "zod";
import { ROLES } from "../config/roles";

export const updateUserSchema = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  phone: z.string().trim().min(6).max(20).optional(),
  avatar: z.string().url().optional(),
});

export const adminUpdateUserSchema = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  phone: z.string().trim().min(6).max(20).optional(),
  role: z.enum(ROLES).optional(),
  status: z.enum(["active", "blocked"]).optional(),
});

export const listUsersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  q: z.string().optional(),
  role: z.enum(ROLES).optional(),
  status: z.enum(["active", "blocked"]).optional(),
});
