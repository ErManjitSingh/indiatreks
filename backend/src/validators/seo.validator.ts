import { z } from "zod";

export const enterpriseSeoSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    canonical: z.string().optional(),
    focusKeyword: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z.string().optional(),
    ogType: z.string().optional(),
    twitterCard: z.enum(["summary", "summary_large_image", "app", "player"]).optional(),
    twitterTitle: z.string().optional(),
    twitterDescription: z.string().optional(),
    twitterImage: z.string().optional(),
    robots: z.string().optional(),
    index: z.boolean().optional(),
    follow: z.boolean().optional(),
    schemaType: z.string().optional(),
    breadcrumb: z
      .array(z.object({ name: z.string(), url: z.string() }))
      .optional(),
    imageAlt: z.string().optional(),
    imageCaption: z.string().optional(),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    schemaJson: z.record(z.string(), z.unknown()).optional(),
    seoScore: z.number().min(0).max(100).optional(),
    readabilityScore: z.number().min(0).max(100).optional(),
    lastSeoUpdate: z.coerce.date().nullable().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  })
  .optional();

export const upsertSeoPageSchema = z.object({
  path: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  canonical: z.string().optional(),
  ogImage: z.string().optional(),
  robots: z.string().optional(),
  schemaJson: z.record(z.string(), z.unknown()).optional(),
  twitterCard: z.string().optional(),
});

export const listSeoPagesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(50),
  q: z.string().optional(),
});

export const updateSeoSettingsSchema = z.object({
  siteName: z.string().optional(),
  siteUrl: z.string().url().optional(),
  defaultTitle: z.string().optional(),
  titleTemplate: z.string().optional(),
  defaultDescription: z.string().optional(),
  defaultKeywords: z.array(z.string()).optional(),
  defaultOgImage: z.string().optional(),
  defaultTwitterCard: z.string().optional(),
  defaultRobots: z.string().optional(),
  locale: z.string().optional(),
  organizationName: z.string().optional(),
  organizationLogo: z.string().optional(),
  organizationEmail: z.string().optional(),
  organizationPhone: z.string().optional(),
  socialProfiles: z
    .object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      youtube: z.string().optional(),
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
    })
    .optional(),
  homepage: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
      canonical: z.string().optional(),
      ogImage: z.string().optional(),
      schemaJson: z.record(z.string(), z.unknown()).optional(),
    })
    .optional(),
  verification: z
    .object({
      google: z.string().optional(),
      bing: z.string().optional(),
      yandex: z.string().optional(),
      pinterest: z.string().optional(),
    })
    .optional(),
  enableJsonLd: z.boolean().optional(),
  enableOpenGraph: z.boolean().optional(),
  enableTwitterCards: z.boolean().optional(),
  trailingSlash: z.boolean().optional(),
  forceHttps: z.boolean().optional(),
});

export const upsertRedirectSchema = z.object({
  fromPath: z.string().min(1),
  toPath: z.string().min(1),
  statusCode: z.union([z.literal(301), z.literal(302), z.literal(307), z.literal(308)]).optional(),
  isActive: z.boolean().optional(),
  note: z.string().optional(),
  entityType: z.enum(["trek", "blog", "destination", "page", "manual"]).optional(),
});

export const updateRedirectSchema = upsertRedirectSchema.partial();

export const listRedirectsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(50),
  q: z.string().optional(),
  isActive: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
});

export const robotsConfigSchema = z.object({
  enabled: z.boolean().optional(),
  rules: z
    .array(
      z.object({
        userAgent: z.string().default("*"),
        allow: z.array(z.string()).default([]),
        disallow: z.array(z.string()).default([]),
        crawlDelay: z.number().optional(),
      }),
    )
    .optional(),
  sitemaps: z.array(z.string()).optional(),
  host: z.string().optional(),
  customContent: z.string().optional(),
});

export const upsertMetaTemplateSchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  entityType: z.enum(["trek", "blog", "destination", "programmatic", "homepage", "category"]),
  titleTemplate: z.string().min(1),
  descriptionTemplate: z.string().min(1),
  keywordsTemplate: z.string().optional(),
  canonicalTemplate: z.string().optional(),
  ogTitleTemplate: z.string().optional(),
  ogDescriptionTemplate: z.string().optional(),
  isDefault: z.boolean().optional(),
  variables: z.array(z.string()).optional(),
});

export const upsertSchemaTemplateSchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  schemaType: z.enum([
    "Organization",
    "WebSite",
    "BreadcrumbList",
    "FAQPage",
    "Article",
    "BlogPosting",
    "ImageObject",
    "TouristDestination",
    "TouristTrip",
    "Offer",
    "Review",
    "AggregateRating",
    "Product",
    "ItemList",
  ]),
  entityType: z.enum(["global", "trek", "blog", "destination", "programmatic"]).optional(),
  template: z.record(z.string(), z.unknown()),
  isActive: z.boolean().optional(),
  description: z.string().optional(),
});

export const searchConsoleSchema = z.object({
  propertyUrl: z.string().optional(),
  verificationMetaTag: z.string().optional(),
  verificationHtmlFile: z.string().optional(),
  verificationMethod: z.enum(["meta", "html", "dns", "ga"]).optional(),
  isVerified: z.boolean().optional(),
  notes: z.string().optional(),
});

export const submitSitemapSchema = z.object({
  url: z.string().url(),
});

export const requestIndexingSchema = z.object({
  url: z.string().url(),
  note: z.string().optional(),
});

export const analyticsConfigSchema = z.object({
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
  metaPixel: z
    .object({
      enabled: z.boolean().optional(),
      pixelId: z.string().optional(),
    })
    .optional(),
  clarity: z
    .object({
      enabled: z.boolean().optional(),
      projectId: z.string().optional(),
    })
    .optional(),
  bingWebmaster: z
    .object({
      enabled: z.boolean().optional(),
      siteUrl: z.string().optional(),
      verified: z.boolean().optional(),
      apiKey: z.string().optional(),
    })
    .optional(),
  customScripts: z
    .array(
      z.object({
        name: z.string(),
        position: z.enum(["head", "body_start", "body_end"]),
        script: z.string(),
        enabled: z.boolean().optional(),
      }),
    )
    .optional(),
});

export const upsertProgrammaticSchema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  path: z.string().optional(),
  headline: z.string().optional(),
  summary: z.string().optional(),
  content: z.string().optional(),
  filterType: z.enum([
    "region",
    "destination",
    "difficulty",
    "duration",
    "season",
    "month",
    "trekType",
    "custom",
  ]),
  filterValue: z.string().min(1),
  filterQuery: z.record(z.string(), z.unknown()).optional(),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
  seo: enterpriseSeoSchema,
  status: z.enum(["draft", "published", "archived"]).optional(),
  sortOrder: z.number().optional(),
});

export const scoreEntitySchema = z.object({
  type: z.enum(["trek", "blog", "destination"]),
  id: z.string().min(1),
});

export const schemaGenerateSchema = z.object({
  type: z.enum([
    "Organization",
    "WebSite",
    "BreadcrumbList",
    "FAQPage",
    "Article",
    "BlogPosting",
    "ImageObject",
    "TouristDestination",
    "TouristTrip",
    "Offer",
    "Review",
    "AggregateRating",
  ]),
  payload: z.record(z.string(), z.unknown()).default({}),
});

export const notFoundLogSchema = z.object({
  path: z.string().min(1),
  referer: z.string().optional(),
  userAgent: z.string().optional(),
});
