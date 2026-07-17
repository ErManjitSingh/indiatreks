import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { blogService } from "../services/blog.service";
import { aiBlogGeneratorService } from "../services/aiBlogGenerator.service";
import { isStaffUser } from "../middlewares/auth";

export const listBlogs = asyncHandler(async (req: Request, res: Response) => {
  const isAdmin = isStaffUser(req);
  const query = { ...req.query } as Record<string, unknown>;
  if (!isAdmin) query.status = "published";
  const { items, meta } = await blogService.list(query as never);
  return sendPaginated(res, items, meta);
});

export const getBlogHub = asyncHandler(async (_req: Request, res: Response) => {
  const data = await blogService.getHub();
  return sendSuccess(res, data);
});

export const getBlogRelated = asyncHandler(async (req: Request, res: Response) => {
  const data = await blogService.getRelated(req.params.slug as string);
  return sendSuccess(res, data);
});

export const recordBlogView = asyncHandler(async (req: Request, res: Response) => {
  const data = await blogService.incrementViews(req.params.slug as string);
  return sendSuccess(res, data);
});

export const getBlogStats = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await blogService.getStats();
  return sendSuccess(res, stats);
});

export const listBlogTopics = asyncHandler(async (req: Request, res: Response) => {
  const destination = String(req.query.destination || "all").toLowerCase();
  const data =
    destination === "shimla"
      ? aiBlogGeneratorService.listShimlaTopics()
      : destination === "dharamshala"
        ? aiBlogGeneratorService.listDharamshalaTopics()
        : aiBlogGeneratorService.listAllBlogTopics();
  return sendSuccess(res, data);
});

export const generateBlog = asyncHandler(async (req: Request, res: Response) => {
  const { topicSlug, title, publish, force, save } = req.body as {
    topicSlug?: string;
    title?: string;
    publish?: boolean;
    force?: boolean;
    save?: boolean;
  };
  const topic =
    (topicSlug && aiBlogGeneratorService.getTopicBySlug(topicSlug)) ||
    (title ? aiBlogGeneratorService.listAllBlogTopics().find((t) => t.title === title) : null);
  if (!topic) {
    return res.status(404).json({ success: false, message: "Topic not found", code: "TOPIC_NOT_FOUND" });
  }

  const article = await aiBlogGeneratorService.generateBlogFromTopic(topic, { publish: Boolean(publish) });
  if (save) {
    const result = await aiBlogGeneratorService.upsertGeneratedBlog(topic, { publish, force });
    return sendSuccess(res, { ...article, result }, `Blog ${result.action}`);
  }
  return sendSuccess(res, article, "Blog preview generated");
});

export const bulkGenerateBlogs = asyncHandler(async (req: Request, res: Response) => {
  const { publish, force, destination } = req.body as {
    publish?: boolean;
    force?: boolean;
    destination?: string;
  };
  const dest = String(destination || "dharamshala").toLowerCase();
  const results =
    dest === "shimla"
      ? await aiBlogGeneratorService.generateAllShimlaBlogs({ publish, force, relink: true })
      : await aiBlogGeneratorService.generateAllDharamshalaBlogs({ publish, force });
  return sendSuccess(res, { results, total: results.length, destination: dest }, "Bulk blog generation complete");
});

export const getBlogBySlug = asyncHandler(async (req: Request, res: Response) => {
  const includeUnpublished = isStaffUser(req);
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
