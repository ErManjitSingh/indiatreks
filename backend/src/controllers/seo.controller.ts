import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { seoService } from "../services/seo.service";
import { redirectService } from "../services/redirect.service";
import { robotsService } from "../services/robots.service";
import { sitemapService } from "../services/sitemap.service";
import { schemaService } from "../services/schema.service";
import { calculateSeoScore } from "../services/seoScore.service";

export const listSeoPages = asyncHandler(async (req: Request, res: Response) => {
  const { items, meta } = await seoService.list(req.query as never);
  return sendPaginated(res, items, meta);
});

export const getSeoPage = asyncHandler(async (req: Request, res: Response) => {
  const page = await seoService.getByPath(decodeURIComponent(String(req.params.path)));
  return sendSuccess(res, page);
});

export const upsertSeoPage = asyncHandler(async (req: Request, res: Response) => {
  const page = await seoService.upsert(req.body);
  return sendSuccess(res, page, "SEO page saved");
});

export const deleteSeoPage = asyncHandler(async (req: Request, res: Response) => {
  await seoService.softDelete(String(req.params.id));
  return sendSuccess(res, null, "SEO page deleted");
});

export const getSettings = asyncHandler(async (_req: Request, res: Response) => {
  const settings = await seoService.getSettings();
  return sendSuccess(res, settings);
});

export const updateSettings = asyncHandler(async (req: Request, res: Response) => {
  const settings = await seoService.updateSettings(req.body);
  return sendSuccess(res, settings, "SEO settings updated");
});

export const getPublicBootstrap = asyncHandler(async (_req: Request, res: Response) => {
  const data = await seoService.publicBootstrap();
  return sendSuccess(res, data);
});

export const getRobotsConfig = asyncHandler(async (_req: Request, res: Response) => {
  const config = await robotsService.getConfig();
  return sendSuccess(res, config);
});

export const updateRobotsConfig = asyncHandler(async (req: Request, res: Response) => {
  const config = await robotsService.updateConfig(req.body);
  return sendSuccess(res, config, "Robots config updated");
});

export const getRobotsTxt = asyncHandler(async (_req: Request, res: Response) => {
  const txt = await robotsService.generateTxt();
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  return res.status(200).send(txt);
});

export const getSitemapConfig = asyncHandler(async (_req: Request, res: Response) => {
  const config = await sitemapService.getConfig();
  return sendSuccess(res, config);
});

export const updateSitemapConfig = asyncHandler(async (req: Request, res: Response) => {
  const config = await sitemapService.updateConfig(req.body);
  return sendSuccess(res, config, "Sitemap config updated");
});

export const generateSitemap = asyncHandler(async (req: Request, res: Response) => {
  const name = String(req.params.name || "index");
  const result = await sitemapService.generate(name as never);
  if (req.query.format === "json") {
    return sendSuccess(res, result);
  }
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  return res.status(200).send(result.xml);
});

export const generateAllSitemaps = asyncHandler(async (_req: Request, res: Response) => {
  const results = await sitemapService.generateAll();
  return sendSuccess(
    res,
    results.map((r) => ({ name: r.name, count: r.count })),
    "Sitemaps regenerated",
  );
});

export const listRedirects = asyncHandler(async (req: Request, res: Response) => {
  const { items, meta } = await redirectService.list(req.query as never);
  return sendPaginated(res, items, meta);
});

export const resolveRedirect = asyncHandler(async (req: Request, res: Response) => {
  const path = String(req.query.path || req.params.path || "");
  const redirect = await redirectService.resolve(decodeURIComponent(path));
  return sendSuccess(res, redirect);
});

export const createRedirect = asyncHandler(async (req: Request, res: Response) => {
  const redirect = await redirectService.create(req.body);
  return sendSuccess(res, redirect, "Redirect created", 201);
});

export const updateRedirect = asyncHandler(async (req: Request, res: Response) => {
  const redirect = await redirectService.update(String(req.params.id), req.body);
  return sendSuccess(res, redirect, "Redirect updated");
});

export const deleteRedirect = asyncHandler(async (req: Request, res: Response) => {
  await redirectService.softDelete(String(req.params.id));
  return sendSuccess(res, null, "Redirect deleted");
});

export const listNotFound = asyncHandler(async (req: Request, res: Response) => {
  const { items, meta } = await redirectService.listNotFound(req.query as never);
  return sendPaginated(res, items, meta);
});

export const logNotFound = asyncHandler(async (req: Request, res: Response) => {
  const log = await redirectService.logNotFound({
    path: req.body.path,
    referer: req.body.referer || req.get("referer") || undefined,
    userAgent: req.body.userAgent || req.get("user-agent") || undefined,
    ip: req.ip,
  });
  return sendSuccess(res, log, "404 logged");
});

export const resolveNotFound = asyncHandler(async (req: Request, res: Response) => {
  const log = await redirectService.resolveNotFound(String(req.params.id), req.body.redirectId);
  return sendSuccess(res, log, "404 marked resolved");
});

export const listMetaTemplates = asyncHandler(async (req: Request, res: Response) => {
  const items = await seoService.listMetaTemplates(req.query.entityType as string | undefined);
  return sendSuccess(res, items);
});

export const upsertMetaTemplate = asyncHandler(async (req: Request, res: Response) => {
  const item = await seoService.upsertMetaTemplate(req.body);
  return sendSuccess(res, item, "Meta template saved");
});

export const deleteMetaTemplate = asyncHandler(async (req: Request, res: Response) => {
  await seoService.deleteMetaTemplate(String(req.params.id));
  return sendSuccess(res, null, "Meta template deleted");
});

export const listSchemaTemplates = asyncHandler(async (req: Request, res: Response) => {
  const items = await seoService.listSchemaTemplates(req.query.entityType as string | undefined);
  return sendSuccess(res, items);
});

export const upsertSchemaTemplate = asyncHandler(async (req: Request, res: Response) => {
  const item = await seoService.upsertSchemaTemplate(req.body);
  return sendSuccess(res, item, "Schema template saved");
});

export const generateSchema = asyncHandler(async (req: Request, res: Response) => {
  const { type, payload } = req.body as { type: string; payload: Record<string, unknown> };
  const map: Record<string, (p: never) => unknown> = {
    Organization: () => schemaService.organization(),
    WebSite: () => schemaService.website(),
    BreadcrumbList: () => schemaService.breadcrumb((payload.items as never) || []),
    FAQPage: () => schemaService.faq((payload.faqs as never) || []),
    Article: () => schemaService.article(payload as never),
    BlogPosting: () => schemaService.blog(payload as never),
    ImageObject: () => schemaService.image(payload as never),
    TouristDestination: () => schemaService.touristDestination(payload as never),
    TouristTrip: () => schemaService.touristTrip(payload as never),
    Offer: () => schemaService.offer(payload as never),
    Review: () => schemaService.review(payload as never),
    AggregateRating: () => schemaService.aggregateRating(payload as never),
  };
  const fn = map[type];
  const schema = fn ? fn(payload as never) : null;
  return sendSuccess(res, schema);
});

export const getSearchConsole = asyncHandler(async (_req: Request, res: Response) => {
  const data = await seoService.getSearchConsole();
  return sendSuccess(res, data);
});

export const updateSearchConsole = asyncHandler(async (req: Request, res: Response) => {
  const data = await seoService.updateSearchConsole(req.body);
  return sendSuccess(res, data, "Search Console settings updated");
});

export const submitSitemap = asyncHandler(async (req: Request, res: Response) => {
  const data = await seoService.submitSitemap(req.body.url);
  return sendSuccess(res, data, "Sitemap submission recorded");
});

export const requestIndexing = asyncHandler(async (req: Request, res: Response) => {
  const data = await seoService.requestIndexing(req.body.url, req.body.note);
  return sendSuccess(res, data, "Indexing request recorded");
});

export const getAnalyticsConfig = asyncHandler(async (_req: Request, res: Response) => {
  const data = await seoService.getAnalyticsConfig();
  return sendSuccess(res, data);
});

export const updateAnalyticsConfig = asyncHandler(async (req: Request, res: Response) => {
  const data = await seoService.updateAnalyticsConfig(req.body);
  return sendSuccess(res, data, "Analytics config updated");
});

export const listProgrammatic = asyncHandler(async (req: Request, res: Response) => {
  const { items, meta } = await seoService.listProgrammatic(req.query as never);
  return sendPaginated(res, items, meta);
});

export const getProgrammatic = asyncHandler(async (req: Request, res: Response) => {
  const page = await seoService.getProgrammaticBySlug(String(req.params.slug));
  return sendSuccess(res, page);
});

export const upsertProgrammatic = asyncHandler(async (req: Request, res: Response) => {
  const page = await seoService.upsertProgrammatic(req.body);
  return sendSuccess(res, page, "Programmatic SEO page saved");
});

export const deleteProgrammatic = asyncHandler(async (req: Request, res: Response) => {
  await seoService.deleteProgrammatic(String(req.params.id));
  return sendSuccess(res, null, "Programmatic SEO page deleted");
});

export const seedProgrammatic = asyncHandler(async (_req: Request, res: Response) => {
  const pages = await seoService.seedProgrammaticPages();
  return sendSuccess(res, { count: pages.length }, "Programmatic pages seeded");
});

export const scoreEntity = asyncHandler(async (req: Request, res: Response) => {
  const result = await seoService.scoreEntity(req.body.type, req.body.id);
  return sendSuccess(res, result);
});

export const scorePreview = asyncHandler(async (req: Request, res: Response) => {
  const score = calculateSeoScore(req.body);
  return sendSuccess(res, score);
});

export const getTrekSeo = asyncHandler(async (req: Request, res: Response) => {
  const data = await seoService.getTrekSeoBundle(String(req.params.slug));
  return sendSuccess(res, data);
});

export const getDestinationSeo = asyncHandler(async (req: Request, res: Response) => {
  const data = await seoService.getDestinationSeoBundle(String(req.params.slug));
  return sendSuccess(res, data);
});

export const getBlogSeo = asyncHandler(async (req: Request, res: Response) => {
  const data = await seoService.getBlogSeoBundle(String(req.params.slug));
  return sendSuccess(res, data);
});
