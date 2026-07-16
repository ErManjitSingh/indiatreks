import { Router } from "express";
import * as mediaController from "../controllers/media.controller";
import { validate } from "../middlewares/validate";
import { authenticate, requirePermission } from "../middlewares/auth";
import { paramsIdSchema } from "../validators/common.validator";
import { listMediaQuerySchema } from "../validators/media.validator";
import { uploadMiddleware } from "../services/media.service";

const router = Router();

router.use(authenticate, requirePermission("media.write"));

router.get("/", validate(listMediaQuerySchema, "query"), mediaController.listMedia);
router.post("/upload", uploadMiddleware.single("file"), mediaController.uploadMedia);
router.delete("/:id", validate(paramsIdSchema, "params"), mediaController.deleteMedia);

export default router;
