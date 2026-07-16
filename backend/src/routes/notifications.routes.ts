import { Router } from "express";
import * as notificationController from "../controllers/notification.controller";
import { validate } from "../middlewares/validate";
import { authenticate, authorize } from "../middlewares/auth";
import { paramsIdSchema } from "../validators/common.validator";
import { createNotificationSchema, listNotificationsQuerySchema } from "../validators/notification.validator";

const router = Router();

router.use(authenticate);

router.get("/", validate(listNotificationsQuerySchema, "query"), notificationController.listMyNotifications);
router.patch("/:id/read", validate(paramsIdSchema, "params"), notificationController.markNotificationRead);
router.patch("/read-all", notificationController.markAllNotificationsRead);
router.post(
  "/",
  authorize("super_admin", "admin"),
  validate(createNotificationSchema),
  notificationController.createNotification,
);

export default router;
