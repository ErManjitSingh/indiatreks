import { Router } from "express";
import * as trekController from "../controllers/trek.controller";
import { validate } from "../middlewares/validate";
import { authenticate, optionalAuth, requirePermission } from "../middlewares/auth";
import { paramsIdSchema, paramsSlugSchema } from "../validators/common.validator";
import { createTrekSchema, updateTrekSchema, listTreksQuerySchema } from "../validators/trek.validator";

const router = Router();

router.get("/", optionalAuth, validate(listTreksQuerySchema, "query"), trekController.listTreks);
router.get("/:slug", optionalAuth, validate(paramsSlugSchema, "params"), trekController.getTrekBySlug);
router.get("/:slug/related", validate(paramsSlugSchema, "params"), trekController.getRelatedTreks);

router.post(
  "/",
  authenticate,
  requirePermission("treks.write"),
  validate(createTrekSchema),
  trekController.createTrek,
);
router.get(
  "/id/:id",
  authenticate,
  requirePermission("treks.read"),
  validate(paramsIdSchema, "params"),
  trekController.getTrekById,
);
router.patch(
  "/:id",
  authenticate,
  requirePermission("treks.write"),
  validate(paramsIdSchema, "params"),
  validate(updateTrekSchema),
  trekController.updateTrek,
);
router.delete(
  "/:id",
  authenticate,
  requirePermission("treks.write"),
  validate(paramsIdSchema, "params"),
  trekController.deleteTrek,
);
router.post(
  "/:id/restore",
  authenticate,
  requirePermission("treks.write"),
  validate(paramsIdSchema, "params"),
  trekController.restoreTrek,
);

export default router;
