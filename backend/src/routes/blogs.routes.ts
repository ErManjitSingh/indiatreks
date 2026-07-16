import { Router } from "express";
import * as blogController from "../controllers/blog.controller";
import { validate } from "../middlewares/validate";
import { authenticate, optionalAuth, requirePermission } from "../middlewares/auth";
import { paramsIdSchema, paramsSlugSchema } from "../validators/common.validator";
import { createBlogSchema, updateBlogSchema, listBlogsQuerySchema } from "../validators/blog.validator";

const router = Router();

router.get("/", optionalAuth, validate(listBlogsQuerySchema, "query"), blogController.listBlogs);
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
