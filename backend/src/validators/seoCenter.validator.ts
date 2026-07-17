import { z } from "zod";

export const integrationsUpdateSchema = z.object({
  ga4: z
    .object({
      enabled: z.boolean().optional(),
      measurementId: z.string().optional(),
      propertyId: z.string().optional(),
    })
    .optional(),
  gtm: z
    .object({
      enabled: z.boolean().optional(),
      containerId: z.string().optional(),
    })
    .optional(),
  clarity: z
    .object({
      enabled: z.boolean().optional(),
      projectId: z.string().optional(),
    })
    .optional(),
  metaPixel: z
    .object({
      enabled: z.boolean().optional(),
      pixelId: z.string().optional(),
    })
    .optional(),
  bing: z
    .object({
      enabled: z.boolean().optional(),
      siteUrl: z.string().optional(),
      verified: z.boolean().optional(),
      apiKey: z.string().optional(),
    })
    .optional(),
  googleProperty: z
    .object({
      searchConsoleProperty: z.string().optional(),
      ga4PropertyId: z.string().optional(),
    })
    .optional(),
});

export const submitSitemapBodySchema = z.object({
  url: z.string().url(),
});

export const inspectUrlBodySchema = z.object({
  url: z.string().url(),
});

export const pushBlogsBodySchema = z.object({
  limit: z.coerce.number().min(1).max(50).optional(),
});

export const syncDaysBodySchema = z.object({
  days: z.coerce.number().min(1).max(90).optional(),
});

export const cwvRunBodySchema = z.object({
  url: z.string().url().optional(),
  strategy: z.enum(["mobile", "desktop"]).optional(),
});

export const keywordCreateSchema = z.object({
  keyword: z.string().min(1).max(200),
  landingPage: z.string().optional(),
  currentPosition: z.coerce.number().optional(),
  searchVolume: z.coerce.number().optional(),
  difficulty: z.coerce.number().optional(),
  notes: z.string().optional(),
});

export const keywordUpdateSchema = z.object({
  landingPage: z.string().optional(),
  currentPosition: z.coerce.number().optional(),
  searchVolume: z.coerce.number().optional(),
  difficulty: z.coerce.number().optional(),
  notes: z.string().optional(),
  active: z.boolean().optional(),
});

export const importRedirectsSchema = z.object({
  items: z.array(
    z.object({
      fromPath: z.string().min(1),
      toPath: z.string().min(1),
      statusCode: z.union([z.literal(301), z.literal(302), z.literal(307), z.literal(308)]).optional(),
      isActive: z.boolean().optional(),
      note: z.string().optional(),
    }),
  ),
});
