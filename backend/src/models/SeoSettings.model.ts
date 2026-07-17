import { Schema, model, Document, Types } from "mongoose";

export interface ISeoSettings extends Document {
  _id: Types.ObjectId;
  key: string;
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string[];
  defaultOgImage: string;
  defaultTwitterCard: string;
  defaultRobots: string;
  locale: string;
  organizationName: string;
  organizationLogo: string;
  organizationEmail: string;
  organizationPhone: string;
  socialProfiles: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
    linkedin?: string;
  };
  homepage: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
    ogImage?: string;
    schemaJson?: Record<string, unknown>;
  };
  verification: {
    google?: string;
    bing?: string;
    yandex?: string;
    pinterest?: string;
  };
  enableJsonLd: boolean;
  enableOpenGraph: boolean;
  enableTwitterCards: boolean;
  trailingSlash: boolean;
  forceHttps: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SeoSettingsSchema = new Schema<ISeoSettings>(
  {
    key: { type: String, required: true, unique: true, default: "global" },
    siteName: { type: String, default: "India Holiday Destinations" },
    siteUrl: { type: String, default: "https://treks.indiaholidaydestination.com" },
    defaultTitle: { type: String, default: "Explore India's Most Incredible Treks" },
    titleTemplate: { type: String, default: "%s | India Holiday Destinations" },
    defaultDescription: {
      type: String,
      default:
        "India's premium trekking platform for Himalayan adventures, weekend getaways, winter expeditions, and curated camping experiences.",
    },
    defaultKeywords: {
      type: [String],
      default: ["trekking india", "himalayan treks", "himachal treks", "weekend treks"],
    },
    defaultOgImage: { type: String, default: "/images/og-default.jpg" },
    defaultTwitterCard: { type: String, default: "summary_large_image" },
    defaultRobots: { type: String, default: "index,follow" },
    locale: { type: String, default: "en_IN" },
    organizationName: { type: String, default: "India Holiday Destinations" },
    organizationLogo: { type: String, default: "/icons/logo.png" },
    organizationEmail: { type: String, default: "" },
    organizationPhone: { type: String, default: "" },
    socialProfiles: {
      facebook: { type: String },
      instagram: { type: String },
      youtube: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
    },
    homepage: {
      title: { type: String },
      description: { type: String },
      keywords: { type: [String], default: [] },
      canonical: { type: String },
      ogImage: { type: String },
      schemaJson: { type: Schema.Types.Mixed },
    },
    verification: {
      google: { type: String },
      bing: { type: String },
      yandex: { type: String },
      pinterest: { type: String },
    },
    enableJsonLd: { type: Boolean, default: true },
    enableOpenGraph: { type: Boolean, default: true },
    enableTwitterCards: { type: Boolean, default: true },
    trailingSlash: { type: Boolean, default: false },
    forceHttps: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "seo_settings" },
);

export const SeoSettingsModel = model<ISeoSettings>("SeoSettings", SeoSettingsSchema);
