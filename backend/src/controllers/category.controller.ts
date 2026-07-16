import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { categoryService } from "../services/category.service";

export const listCategories = asyncHandler(async (req: Request, res: Response) => {
  const { items, meta } = await categoryService.list(req.query as never);
  return sendPaginated(res, items, meta);
});

export const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await categoryService.getById((req.params.id as string));
  return sendSuccess(res, category);
});

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await categoryService.create(req.body);
  return sendSuccess(res, category, "Category created", 201);
});

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await categoryService.update((req.params.id as string), req.body);
  return sendSuccess(res, category, "Category updated");
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  await categoryService.softDelete((req.params.id as string));
  return sendSuccess(res, null, "Category deleted");
});
