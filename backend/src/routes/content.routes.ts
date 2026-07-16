import { Router } from "express";
import * as contentController from "../controllers/content.controller";
import { publicCache } from "../middlewares/publicCache";

const router = Router();

router.get("/bootstrap", publicCache(60, 300), contentController.getBootstrap);
router.get("/settings", publicCache(60, 300), contentController.getPublicSettings);

export default router;
