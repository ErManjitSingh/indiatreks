import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { userService } from "../services/user.service";
import { ApiError } from "../utils/ApiError";

export const listUsers = asyncHandler(async (req: Request, res: Response) => {
  const { items, meta } = await userService.list(req.query as never);
  return sendPaginated(res, items, meta);
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.getById((req.params.id as string));
  return sendSuccess(res, user);
});

export const getMyProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Authentication required", "UNAUTHENTICATED");
  const user = await userService.getById(req.user.id);
  return sendSuccess(res, user);
});

export const updateMyProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Authentication required", "UNAUTHENTICATED");
  const user = await userService.updateProfile(req.user.id, req.body);
  return sendSuccess(res, user, "Profile updated");
});

export const adminUpdateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.adminUpdate((req.params.id as string), req.body);
  return sendSuccess(res, user, "User updated");
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  await userService.softDelete((req.params.id as string));
  return sendSuccess(res, null, "User deleted");
});
