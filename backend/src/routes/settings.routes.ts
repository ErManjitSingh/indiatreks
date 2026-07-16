import { Router } from "express";
import * as settingsController from "../controllers/settings.controller";
import { validate } from "../middlewares/validate";
import { authenticate, requirePermission } from "../middlewares/auth";
import { upsertSettingSchema, bulkUpsertSettingsSchema } from "../validators/settings.validator";

const router = Router();

router.get("/", authenticate, requirePermission("settings.write"), settingsController.getSettings);
router.put(
  "/",
  authenticate,
  requirePermission("settings.write"),
  validate(upsertSettingSchema),
  settingsController.upsertSetting,
);
router.put(
  "/bulk",
  authenticate,
  requirePermission("settings.write"),
  validate(bulkUpsertSettingsSchema),
  settingsController.bulkUpsertSettings,
);

export default router;
