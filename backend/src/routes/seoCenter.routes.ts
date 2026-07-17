import { Router } from "express";
import * as seoCenterController from "../controllers/seoCenter.controller";
import { validate } from "../middlewares/validate";
import { authenticate, requirePermission } from "../middlewares/auth";
import { paramsIdSchema } from "../validators/common.validator";
import {
  integrationsUpdateSchema,
  submitSitemapBodySchema,
  inspectUrlBodySchema,
  pushBlogsBodySchema,
  syncDaysBodySchema,
  cwvRunBodySchema,
  keywordCreateSchema,
  keywordUpdateSchema,
  importRedirectsSchema,
} from "../validators/seoCenter.validator";

const router = Router();
const staff = [authenticate, requirePermission("seo.write")] as const;

/* OAuth callback is public (Google redirects browser here) */
router.get("/google/callback", seoCenterController.googleCallback);

router.get("/dashboard", ...staff, seoCenterController.getDashboard);
router.get("/integrations", ...staff, seoCenterController.getIntegrations);
router.put(
  "/integrations",
  ...staff,
  validate(integrationsUpdateSchema),
  seoCenterController.updateIntegrations,
);

/* Google account */
router.get("/google/status", ...staff, seoCenterController.googleStatus);
router.get("/google/connect", ...staff, seoCenterController.googleConnect);
router.post("/google/disconnect", ...staff, seoCenterController.googleDisconnect);

/* Search Console */
router.get("/gsc/dashboard", ...staff, seoCenterController.gscDashboard);
router.post("/gsc/sync", ...staff, validate(syncDaysBodySchema), seoCenterController.gscSync);
router.get("/gsc/sites", ...staff, seoCenterController.gscSites);
router.get("/gsc/sitemaps", ...staff, seoCenterController.gscSitemaps);
router.post(
  "/gsc/sitemaps/submit",
  ...staff,
  validate(submitSitemapBodySchema),
  seoCenterController.gscSubmitSitemap,
);
router.post("/gsc/sitemaps/submit-all", ...staff, seoCenterController.gscSubmitAllSitemaps);
router.post(
  "/gsc/blogs/push",
  ...staff,
  validate(pushBlogsBodySchema),
  seoCenterController.gscPushBlogs,
);
router.post("/gsc/inspect", ...staff, validate(inspectUrlBodySchema), seoCenterController.gscInspect);

/* Analytics */
router.get("/ga/dashboard", ...staff, seoCenterController.gaDashboard);
router.post("/ga/sync", ...staff, validate(syncDaysBodySchema), seoCenterController.gaSync);

/* Core Web Vitals */
router.get("/cwv", ...staff, seoCenterController.cwvLatest);
router.post("/cwv/run", ...staff, validate(cwvRunBodySchema), seoCenterController.cwvRun);

/* Keywords */
router.get("/keywords", ...staff, seoCenterController.listKeywords);
router.post("/keywords", ...staff, validate(keywordCreateSchema), seoCenterController.createKeyword);
router.patch(
  "/keywords/:id",
  ...staff,
  validate(paramsIdSchema, "params"),
  validate(keywordUpdateSchema),
  seoCenterController.updateKeyword,
);
router.delete(
  "/keywords/:id",
  ...staff,
  validate(paramsIdSchema, "params"),
  seoCenterController.deleteKeyword,
);
router.post("/keywords/sync-gsc", ...staff, seoCenterController.syncKeywordsFromGsc);

/* Audit + robots + sitemaps helpers */
router.post("/audit/run", ...staff, seoCenterController.runAudit);
router.get("/robots/preview", ...staff, seoCenterController.robotsPreview);
router.post("/sitemaps/generate", ...staff, seoCenterController.generateSitemaps);

/* Redirects import/export + 404 actions */
router.get("/redirects/export", ...staff, seoCenterController.exportRedirects);
router.post(
  "/redirects/import",
  ...staff,
  validate(importRedirectsSchema),
  seoCenterController.importRedirects,
);
router.patch(
  "/404/:id/ignore",
  ...staff,
  validate(paramsIdSchema, "params"),
  seoCenterController.ignore404,
);
router.delete(
  "/404/:id",
  ...staff,
  validate(paramsIdSchema, "params"),
  seoCenterController.delete404,
);

export default router;
