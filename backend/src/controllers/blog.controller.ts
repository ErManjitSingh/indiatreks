import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { blogService } from "../services/blog.service";

export const listBlogs = asyncHandler(async (req: Request, res: Response) => {
  const isAdmin = Boolean(req.user);
  const query = { ...req.query } as Record<string, unknown>;
  if (!isAdmin) query.status = "published";
  const { items, meta } = await blogService.list(query as never);
  return sendPaginated(res, items, meta);
});

export const getBlogBySlug = asyncHandler(async (req: Request, res: Response) => {
  const includeUnpublished = Boolean(req.user);
  const blog = await blogService.getBySlug((req.params.slug as string), includeUnpublished);
  return sendSuccess(res, blog);
});

export const getBlogById = asyncHandler(async (req: Request, res: Response) => {
  const blog = await blogService.getById((req.params.id as string));
  return sendSuccess(res, blog);
});

export const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await blogService.create(req.body);
  return sendSuccess(res, blog, "Blog post created", 201);
});

export const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await blogService.update((req.params.id as string), req.body);
  return sendSuccess(res, blog, "Blog post updated");
});

export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  await blogService.softDelete((req.params.id as string));
  return sendSuccess(res, null, "Blog post deleted");
});
