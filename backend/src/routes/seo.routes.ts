import { Router } from "express";
import * as seoController from "../controllers/seo.controller";
import * as aiSeoController from "../controllers/aiSeo.controller";
import { validate } from "../middlewares/validate";
import { authenticate, requirePermission } from "../middlewares/auth";
import { paramsIdSchema } from "../validators/common.validator";
import { aiSeoLimiter } from "../middlewares/rateLimiter";
import {
  upsertSeoPageSchema,
  listSeoPagesQuerySchema,
  updateSeoSettingsSchema,
  upsertRedirectSchema,
  updateRedirectSchema,
  listRedirectsQuerySchema,
  robotsConfigSchema,
  upsertMetaTemplateSchema,
  upsertSchemaTemplateSchema,
  searchConsoleSchema,
  submitSitemapSchema,
  requestIndexingSchema,
  analyticsConfigSchema,
  upsertProgrammaticSchema,
  scoreEntitySchema,
  schemaGenerateSchema,
  notFoundLogSchema,
} from "../validators/seo.validator";
import {
  suggestMetaBodySchema,
  suggestFaqBodySchema,
  schemaPreviewBodySchema,
  internalLinksBodySchema,
  relatedContentBodySchema,
  contentQualityBodySchema,
  imageSeoBodySchema,
  blogAssistantBodySchema,
  landingAssistantBodySchema,
  trekWorkflowBodySchema,
  upsertSeoTemplateBodySchema,
  listAuditsQuerySchema,
} from "../validators/aiSeo.validator";

const router = Router();
const staff = [authenticate, requirePermission("seo.write")] as const;
const aiStaff = [authenticate, requirePermission("seo.write"), aiSeoLimiter] as const;

/* ----------------------------- Public SEO APIs ----------------------------- */

router.get("/bootstrap", seoController.getPublicBootstrap);
router.get("/robots.txt", seoController.getRobotsTxt);
router.get("/sitemaps/:name", seoController.generateSitemap);

router.get("/page/:path", seoController.getSeoPage);
router.get("/redirects/resolve", seoController.resolveRedirect);
router.post("/404", validate(notFoundLogSchema), seoController.logNotFound);

router.get("/treks/:slug", seoController.getTrekSeo);
router.get("/destinations/:slug", seoController.getDestinationSeo);
router.get("/blogs/:slug", seoController.getBlogSeo);
router.get("/programmatic/by-slug/:slug", seoController.getProgrammatic);

router.post("/schema/generate", validate(schemaGenerateSchema), seoController.generateSchema);
router.post("/score/preview", seoController.scorePreview);

/* ----------------------------- Admin: Settings ----------------------------- */

router.get("/settings", ...staff, seoController.getSettings);
router.put("/settings", ...staff, validate(updateSeoSettingsSchema), seoController.updateSettings);

/* ----------------------------- Admin: Robots ----------------------------- */

router.get("/robots", ...staff, seoController.getRobotsConfig);
router.put("/robots", ...staff, validate(robotsConfigSchema), seoController.updateRobotsConfig);

/* ----------------------------- Admin: Sitemaps ----------------------------- */

router.get("/sitemap-config", ...staff, seoController.getSitemapConfig);
router.put("/sitemap-config", ...staff, seoController.updateSitemapConfig);
router.post("/sitemaps/generate", ...staff, seoController.generateAllSitemaps);

/* ----------------------------- Admin: Redirects & 404 ----------------------------- */

router.get("/redirects", ...staff, validate(listRedirectsQuerySchema, "query"), seoController.listRedirects);
router.post("/redirects", ...staff, validate(upsertRedirectSchema), seoController.createRedirect);
router.patch(
  "/redirects/:id",
  ...staff,
  validate(paramsIdSchema, "params"),
  validate(updateRedirectSchema),
  seoController.updateRedirect,
);
router.delete(
  "/redirects/:id",
  ...staff,
  validate(paramsIdSchema, "params"),
  seoController.deleteRedirect,
);

router.get("/404", ...staff, seoController.listNotFound);
router.patch(
  "/404/:id/resolve",
  ...staff,
  validate(paramsIdSchema, "params"),
  seoController.resolveNotFound,
);

/* ----------------------------- Admin: Templates ----------------------------- */

router.get("/meta-templates", ...staff, seoController.listMetaTemplates);
router.put("/meta-templates", ...staff, validate(upsertMetaTemplateSchema), seoController.upsertMetaTemplate);
router.delete(
  "/meta-templates/:id",
  ...staff,
  validate(paramsIdSchema, "params"),
  seoController.deleteMetaTemplate,
);

router.get("/schema-templates", ...staff, seoController.listSchemaTemplates);
router.put(
  "/schema-templates",
  ...staff,
  validate(upsertSchemaTemplateSchema),
  seoController.upsertSchemaTemplate,
);

/* ----------------------------- Admin: Search Console ----------------------------- */

router.get("/search-console", ...staff, seoController.getSearchConsole);
router.put("/search-console", ...staff, validate(searchConsoleSchema), seoController.updateSearchConsole);
router.post(
  "/search-console/sitemaps",
  ...staff,
  validate(submitSitemapSchema),
  seoController.submitSitemap,
);
router.post(
  "/search-console/indexing",
  ...staff,
  validate(requestIndexingSchema),
  seoController.requestIndexing,
);

/* ----------------------------- Admin: Analytics tags ----------------------------- */

router.get("/analytics-config", ...staff, seoController.getAnalyticsConfig);
router.put(
  "/analytics-config",
  ...staff,
  validate(analyticsConfigSchema),
  seoController.updateAnalyticsConfig,
);

/* ----------------------------- Admin: Programmatic SEO ----------------------------- */

router.get("/programmatic", ...staff, seoController.listProgrammatic);
router.put("/programmatic", ...staff, validate(upsertProgrammaticSchema), seoController.upsertProgrammatic);
router.post("/programmatic/seed", ...staff, seoController.seedProgrammatic);
router.delete(
  "/programmatic/:id",
  ...staff,
  validate(paramsIdSchema, "params"),
  seoController.deleteProgrammatic,
);

/* ----------------------------- Admin: Score ----------------------------- */

router.post("/score", ...staff, validate(scoreEntitySchema), seoController.scoreEntity);

/* ----------------------------- Admin: AI SEO Engine ----------------------------- */

router.get("/ai/dashboard", ...aiStaff, aiSeoController.getAiDashboard);
router.post("/ai/audit", ...aiStaff, aiSeoController.runAudit);
router.get("/ai/audits", ...aiStaff, validate(listAuditsQuerySchema, "query"), aiSeoController.listAudits);
router.get("/ai/audits/:id", ...aiStaff, validate(paramsIdSchema, "params"), aiSeoController.getAudit);
router.post("/ai/meta/suggest", ...aiStaff, validate(suggestMetaBodySchema), aiSeoController.suggestMeta);
router.post("/ai/faq/suggest", ...aiStaff, validate(suggestFaqBodySchema), aiSeoController.suggestFaqs);
router.post("/ai/schema/preview", ...aiStaff, validate(schemaPreviewBodySchema), aiSeoController.previewSchema);
router.post(
  "/ai/internal-links/suggest",
  ...aiStaff,
  validate(internalLinksBodySchema),
  aiSeoController.suggestInternalLinks,
);
router.post("/ai/related", ...aiStaff, validate(relatedContentBodySchema), aiSeoController.suggestRelated);
router.post("/ai/content-quality", ...aiStaff, validate(contentQualityBodySchema), aiSeoController.contentQuality);
router.post("/ai/image/suggest", ...aiStaff, validate(imageSeoBodySchema), aiSeoController.suggestImageSeo);
router.post("/ai/blog/assist", ...aiStaff, validate(blogAssistantBodySchema), aiSeoController.blogAssistant);
router.post("/ai/landing/assist", ...aiStaff, validate(landingAssistantBodySchema), aiSeoController.landingAssistant);
router.post("/ai/workflow/trek", ...aiStaff, validate(trekWorkflowBodySchema), aiSeoController.trekWorkflow);
router.get("/ai/templates", ...aiStaff, aiSeoController.listTemplates);
router.put("/ai/templates", ...aiStaff, validate(upsertSeoTemplateBodySchema), aiSeoController.upsertTemplate);

/* ----------------------------- Admin: SEO Pages (legacy paths last) ----------------------------- */

router.get("/", ...staff, validate(listSeoPagesQuerySchema, "query"), seoController.listSeoPages);
router.put("/", ...staff, validate(upsertSeoPageSchema), seoController.upsertSeoPage);
router.delete("/pages/:id", ...staff, validate(paramsIdSchema, "params"), seoController.deleteSeoPage);
router.delete("/:id", ...staff, validate(paramsIdSchema, "params"), seoController.deleteSeoPage);

export default router;
