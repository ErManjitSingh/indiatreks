import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess, sendPaginated } from "../utils/response";
import { aiSeoService } from "../services/aiSeo.service";

function userId(req: Request) {
  return (req as Request & { user?: { id?: string; _id?: string } }).user?.id ||
    (req as Request & { user?: { id?: string; _id?: string } }).user?._id;
}

export const getAiDashboard = asyncHandler(async (_req: Request, res: Response) => {
  const data = await aiSeoService.getDashboard();
  return sendSuccess(res, data);
});

export const runAudit = asyncHandler(async (req: Request, res: Response) => {
  const audit = await aiSeoService.runAudit(userId(req));
  return sendSuccess(res, audit, "SEO audit completed");
});

export const listAudits = asyncHandler(async (req: Request, res: Response) => {
  const { items, meta } = await aiSeoService.listAudits(req.query as never);
  return sendPaginated(res, items, meta);
});

export const getAudit = asyncHandler(async (req: Request, res: Response) => {
  const audit = await aiSeoService.getAudit(String(req.params.id));
  return sendSuccess(res, audit);
});

export const suggestMeta = asyncHandler(async (req: Request, res: Response) => {
  const data = await aiSeoService.suggestMeta({
    entityType: req.body.entityType,
    entityId: req.body.entityId,
    payload: req.body.payload || req.body,
    userId: userId(req),
  });
  return sendSuccess(res, data, "Meta suggestions ready for review");
});

export const suggestFaqs = asyncHandler(async (req: Request, res: Response) => {
  const data = await aiSeoService.suggestFaqs({
    entityType: req.body.entityType,
    entityId: req.body.entityId,
    payload: req.body.payload || req.body,
    userId: userId(req),
  });
  return sendSuccess(res, data, "FAQ suggestions ready for review");
});

export const previewSchema = asyncHandler(async (req: Request, res: Response) => {
  const data = aiSeoService.previewSchemas({
    entityType: req.body.entityType,
    payload: req.body.payload || req.body,
  });
  return sendSuccess(res, data);
});

export const suggestInternalLinks = asyncHandler(async (req: Request, res: Response) => {
  const data = await aiSeoService.suggestInternalLinks({
    ...req.body,
    userId: userId(req),
  });
  return sendSuccess(res, data, "Internal link suggestions ready for review");
});

export const suggestRelated = asyncHandler(async (req: Request, res: Response) => {
  const data = await aiSeoService.suggestRelatedContent(req.body);
  return sendSuccess(res, data);
});

export const contentQuality = asyncHandler(async (req: Request, res: Response) => {
  const data = await aiSeoService.reportContentQuality({
    entityType: req.body.entityType,
    entityId: req.body.entityId,
    entitySlug: req.body.entitySlug,
    title: req.body.title,
    payload: req.body.payload || req.body,
    userId: userId(req),
  });
  return sendSuccess(res, data, "Content quality guidance generated");
});

export const suggestImageSeo = asyncHandler(async (req: Request, res: Response) => {
  const data = aiSeoService.suggestImageSeo(req.body);
  return sendSuccess(res, data);
});

export const blogAssistant = asyncHandler(async (req: Request, res: Response) => {
  const data = aiSeoService.suggestBlogAssistant(req.body);
  return sendSuccess(res, data);
});

export const landingAssistant = asyncHandler(async (req: Request, res: Response) => {
  const data = aiSeoService.suggestLandingPage(req.body);
  return sendSuccess(res, data);
});

export const trekWorkflow = asyncHandler(async (req: Request, res: Response) => {
  const data = await aiSeoService.trekWorkflowAssist({
    ...req.body,
    userId: userId(req),
  });
  return sendSuccess(res, data, "AI workflow draft ready — human review required before publish");
});

export const listTemplates = asyncHandler(async (req: Request, res: Response) => {
  const items = await aiSeoService.listTemplates(req.query.category as string | undefined);
  return sendSuccess(res, items);
});

export const upsertTemplate = asyncHandler(async (req: Request, res: Response) => {
  const item = await aiSeoService.upsertTemplate(req.body);
  return sendSuccess(res, item, "SEO template saved");
});
