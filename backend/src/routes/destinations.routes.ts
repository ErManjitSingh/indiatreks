import { Router } from "express";
import * as destinationController from "../controllers/destination.controller";
import { validate } from "../middlewares/validate";
import { authenticate, optionalAuth, requirePermission } from "../middlewares/auth";
import { paramsIdSchema, paramsSlugSchema } from "../validators/common.validator";
import {
  createDestinationSchema,
  updateDestinationSchema,
  listDestinationsQuerySchema,
} from "../validators/destination.validator";

const router = Router();

router.get("/", optionalAuth, validate(listDestinationsQuerySchema, "query"), destinationController.listDestinations);
router.get(
  "/:slug",
  optionalAuth,
  validate(paramsSlugSchema, "params"),
  destinationController.getDestinationBySlug,
);

router.post(
  "/",
  authenticate,
  requirePermission("destinations.write"),
  validate(createDestinationSchema),
  destinationController.createDestination,
);
router.get(
  "/id/:id",
  authenticate,
  requirePermission("destinations.write"),
  validate(paramsIdSchema, "params"),
  destinationController.getDestinationById,
);
router.patch(
  "/:id",
  authenticate,
  requirePermission("destinations.write"),
  validate(paramsIdSchema, "params"),
  validate(updateDestinationSchema),
  destinationController.updateDestination,
);
router.delete(
  "/:id",
  authenticate,
  requirePermission("destinations.write"),
  validate(paramsIdSchema, "params"),
  destinationController.deleteDestination,
);

export default router;
