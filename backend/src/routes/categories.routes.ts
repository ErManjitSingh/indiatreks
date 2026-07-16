import { Router } from "express";
import * as categoryController from "../controllers/category.controller";
import { validate } from "../middlewares/validate";
import { authenticate, authorize } from "../middlewares/auth";
import { paramsIdSchema } from "../validators/common.validator";
import { createCategorySchema, updateCategorySchema, listCategoriesQuerySchema } from "../validators/category.validator";

const router = Router();

router.get("/", validate(listCategoriesQuerySchema, "query"), categoryController.listCategories);
router.get("/:id", validate(paramsIdSchema, "params"), categoryController.getCategory);

router.post(
  "/",
  authenticate,
  authorize("super_admin", "admin", "content_manager"),
  validate(createCategorySchema),
  categoryController.createCategory,
);
router.patch(
  "/:id",
  authenticate,
  authorize("super_admin", "admin", "content_manager"),
  validate(paramsIdSchema, "params"),
  validate(updateCategorySchema),
  categoryController.updateCategory,
);
router.delete(
  "/:id",
  authenticate,
  authorize("super_admin", "admin", "content_manager"),
  validate(paramsIdSchema, "params"),
  categoryController.deleteCategory,
);

export default router;
