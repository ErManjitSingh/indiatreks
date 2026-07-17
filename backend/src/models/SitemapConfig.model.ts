import { Schema, model, Document, Types } from "mongoose";

export type SitemapName =
  | "index"
  | "treks"
  | "blogs"
  | "destinations"
  | "images"
  | "videos"
  | "categories"
  | "programmatic";

export interface ISitemapEntry {
  name: SitemapName;
  path: string;
  enabled: boolean;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
  lastGeneratedAt?: Date | null;
  urlCount: number;
}

export interface ISitemapConfig extends Document {
  _id: Types.ObjectId;
  key: string;
  baseUrl: string;
  autoUpdate: boolean;
  entries: ISitemapEntry[];
  lastFullGenerateAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const SitemapEntrySchema = new Schema<ISitemapEntry>(
  {
    name: {
      type: String,
      enum: ["index", "treks", "blogs", "destinations", "images", "videos", "categories", "programmatic"],
      required: true,
    },
    path: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    changefreq: {
      type: String,
      enum: ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"],
      default: "weekly",
    },
    priority: { type: Number, default: 0.7, min: 0, max: 1 },
    lastGeneratedAt: { type: Date, default: null },
    urlCount: { type: Number, default: 0 },
  },
  { _id: false },
);

const DEFAULT_ENTRIES: ISitemapEntry[] = [
  { name: "index", path: "/sitemap.xml", enabled: true, changefreq: "daily", priority: 1, urlCount: 0 },
  { name: "treks", path: "/sitemaps/treks.xml", enabled: true, changefreq: "daily", priority: 0.9, urlCount: 0 },
  { name: "blogs", path: "/sitemaps/blogs.xml", enabled: true, changefreq: "weekly", priority: 0.7, urlCount: 0 },
  {
    name: "destinations",
    path: "/sitemaps/destinations.xml",
    enabled: true,
    changefreq: "weekly",
    priority: 0.8,
    urlCount: 0,
  },
  { name: "images", path: "/sitemaps/images.xml", enabled: true, changefreq: "weekly", priority: 0.5, urlCount: 0 },
  { name: "videos", path: "/sitemaps/videos.xml", enabled: true, changefreq: "monthly", priority: 0.4, urlCount: 0 },
  {
    name: "categories",
    path: "/sitemaps/categories.xml",
    enabled: true,
    changefreq: "weekly",
    priority: 0.6,
    urlCount: 0,
  },
  {
    name: "programmatic",
    path: "/sitemaps/programmatic.xml",
    enabled: true,
    changefreq: "weekly",
    priority: 0.7,
    urlCount: 0,
  },
];

const SitemapConfigSchema = new Schema<ISitemapConfig>(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    baseUrl: { type: String, default: "https://treks.indiaholidaydestination.com" },
    autoUpdate: { type: Boolean, default: true },
    entries: { type: [SitemapEntrySchema], default: () => DEFAULT_ENTRIES },
    lastFullGenerateAt: { type: Date, default: null },
  },
  { timestamps: true, collection: "sitemaps" },
);

export const SitemapConfigModel = model<ISitemapConfig>("SitemapConfig", SitemapConfigSchema);
