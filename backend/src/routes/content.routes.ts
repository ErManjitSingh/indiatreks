import { Router } from "express";
import * as contentController from "../controllers/content.controller";

const router = Router();

router.get("/bootstrap", contentController.getBootstrap);
router.get("/settings", contentController.getPublicSettings);

export default router;
