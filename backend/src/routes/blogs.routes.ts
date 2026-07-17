import { Router } from "express";
import * as blogController from "../controllers/blog.controller";
import { validate } from "../middlewares/validate";
import { authenticate, optionalAuth, requirePermission } from "../middlewares/auth";
import { paramsIdSchema, paramsSlugSchema } from "../validators/common.validator";
import {
  bulkGenerateBlogsSchema,
  createBlogSchema,
  generateBlogSchema,
  listBlogsQuerySchema,
  updateBlogSchema,
} from "../validators/blog.validator";

const router = Router();

router.get("/hub", blogController.getBlogHub);
router.get("/topics", authenticate, requirePermission("blogs.write"), blogController.listBlogTopics);
router.post(
  "/ai/generate",
  authenticate,
  requirePermission("blogs.write"),
  validate(generateBlogSchema),
  blogController.generateBlog,
);
router.post(
  "/ai/bulk-generate",
  authenticate,
  requirePermission("blogs.write"),
  validate(bulkGenerateBlogsSchema),
  blogController.bulkGenerateBlogs,
);

router.get("/", optionalAuth, validate(listBlogsQuerySchema, "query"), blogController.listBlogs);
router.get("/:slug/related", validate(paramsSlugSchema, "params"), blogController.getBlogRelated);
router.post("/:slug/view", validate(paramsSlugSchema, "params"), blogController.recordBlogView);
router.get("/:slug", optionalAuth, validate(paramsSlugSchema, "params"), blogController.getBlogBySlug);

router.post("/", authenticate, requirePermission("blogs.write"), validate(createBlogSchema), blogController.createBlog);
router.get(
  "/id/:id",
  authenticate,
  requirePermission("blogs.write"),
  validate(paramsIdSchema, "params"),
  blogController.getBlogById,
);
router.patch(
  "/:id",
  authenticate,
  requirePermission("blogs.write"),
  validate(paramsIdSchema, "params"),
  validate(updateBlogSchema),
  blogController.updateBlog,
);
router.delete(
  "/:id",
  authenticate,
  requirePermission("blogs.write"),
  validate(paramsIdSchema, "params"),
  blogController.deleteBlog,
);

export default router;
