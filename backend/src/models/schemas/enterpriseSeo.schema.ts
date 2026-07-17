import { Schema } from "mongoose";

/**
 * Enterprise SEO fields shared by Trek, Blog, Destination, and programmatic pages.
 * All fields optional for backward compatibility with existing documents.
 */
export interface IEnterpriseSeo {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  focusKeyword?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  robots?: string;
  index?: boolean;
  follow?: boolean;
  schemaType?: string;
  breadcrumb?: Array<{ name: string; url: string }>;
  imageAlt?: string;
  imageCaption?: string;
  faqs?: Array<{ question: string; answer: string }>;
  schemaJson?: Record<string, unknown>;
  seoScore?: number;
  readabilityScore?: number;
  lastSeoUpdate?: Date | null;
  /** @deprecated Prefer title — kept for legacy docs */
  metaTitle?: string;
  /** @deprecated Prefer description */
  metaDescription?: string;
}

export const BreadcrumbItemSchema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false },
);

export const SeoFaqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false },
);

export const EnterpriseSeoSchema = new Schema<IEnterpriseSeo>(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    keywords: { type: [String], default: undefined },
    canonical: { type: String, trim: true },
    focusKeyword: { type: String, trim: true },
    ogTitle: { type: String, trim: true },
    ogDescription: { type: String, trim: true },
    ogImage: { type: String, trim: true },
    ogType: { type: String, trim: true },
    twitterCard: {
      type: String,
      enum: ["summary", "summary_large_image", "app", "player"],
    },
    twitterTitle: { type: String, trim: true },
    twitterDescription: { type: String, trim: true },
    twitterImage: { type: String, trim: true },
    robots: { type: String, trim: true },
    index: { type: Boolean },
    follow: { type: Boolean },
    schemaType: { type: String, trim: true },
    breadcrumb: { type: [BreadcrumbItemSchema], default: undefined },
    imageAlt: { type: String, trim: true },
    imageCaption: { type: String, trim: true },
    faqs: { type: [SeoFaqSchema], default: undefined },
    schemaJson: { type: Schema.Types.Mixed },
    seoScore: { type: Number, min: 0, max: 100 },
    readabilityScore: { type: Number, min: 0, max: 100 },
    lastSeoUpdate: { type: Date, default: null },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
  },
  { _id: false },
);

/** Zod-compatible plain defaults for validators */
export const ENTERPRISE_SEO_DEFAULTS: IEnterpriseSeo = {
  index: true,
  follow: true,
  twitterCard: "summary_large_image",
  robots: "index,follow",
};
