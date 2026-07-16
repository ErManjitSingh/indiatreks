import { Router } from "express";
import * as seoController from "../controllers/seo.controller";
import { validate } from "../middlewares/validate";
import { authenticate, requirePermission } from "../middlewares/auth";
import { paramsIdSchema } from "../validators/common.validator";
import { upsertSeoPageSchema, listSeoPagesQuerySchema } from "../validators/seo.validator";

const router = Router();

router.get("/page/:path", seoController.getSeoPage);

router.get(
  "/",
  authenticate,
  requirePermission("seo.write"),
  validate(listSeoPagesQuerySchema, "query"),
  seoController.listSeoPages,
);
router.put(
  "/",
  authenticate,
  requirePermission("seo.write"),
  validate(upsertSeoPageSchema),
  seoController.upsertSeoPage,
);
router.delete(
  "/:id",
  authenticate,
  requirePermission("seo.write"),
  validate(paramsIdSchema, "params"),
  seoController.deleteSeoPage,
);

export default router;
