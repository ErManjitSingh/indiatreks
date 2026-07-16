import { userRepository } from "../repositories/UserRepository";
import { getPagination, paginateMeta } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";
import { IUser } from "../models/User.model";
import { Role } from "../config/roles";

interface ListQuery {
  page?: number;
  limit?: number;
  q?: string;
  role?: Role;
  status?: string;
}

async function list(query: ListQuery) {
  const { page, limit, skip } = getPagination(query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (query.role) filter.role = query.role;
  if (query.status) filter.status = query.status;
  if (query.q) {
    filter.$or = [{ name: new RegExp(query.q, "i") }, { email: new RegExp(query.q, "i") }];
  }

  const { items, total } = await userRepository.paginate({ filter, sort: { createdAt: -1 }, skip, limit });
  return { items, meta: paginateMeta(total, page, limit) };
}

async function getById(id: string) {
  const user = await userRepository.findById(id);
  if (!user) throw new ApiError(404, "User not found", "USER_NOT_FOUND");
  return user;
}

async function updateProfile(id: string, data: Partial<Pick<IUser, "name" | "phone" | "avatar">>) {
  const user = await userRepository.updateById(id, data);
  if (!user) throw new ApiError(404, "User not found", "USER_NOT_FOUND");
  return user;
}

async function adminUpdate(id: string, data: Partial<Pick<IUser, "name" | "phone" | "role" | "status">>) {
  const user = await userRepository.updateById(id, data);
  if (!user) throw new ApiError(404, "User not found", "USER_NOT_FOUND");
  return user;
}

async function softDelete(id: string) {
  const user = await userRepository.softDeleteById(id);
  if (!user) throw new ApiError(404, "User not found", "USER_NOT_FOUND");
  return user;
}

export const userService = {
  list,
  getById,
  updateProfile,
  adminUpdate,
  softDelete,
};
