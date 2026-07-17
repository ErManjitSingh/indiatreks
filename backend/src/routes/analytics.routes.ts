import { Router } from "express";
import * as analyticsController from "../controllers/analytics.controller";
import { authenticate, requirePermission } from "../middlewares/auth";

const router = Router();

router.get("/config", analyticsController.getPublicAnalyticsConfig);
router.get("/dashboard", authenticate, requirePermission("analytics.read"), analyticsController.getDashboardStats);

export default router;
