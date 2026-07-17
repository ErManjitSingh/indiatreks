import { Schema, model, Document, Types } from "mongoose";

export interface IRobotsRule {
  userAgent: string;
  allow: string[];
  disallow: string[];
  crawlDelay?: number;
}

export interface IRobotsConfig extends Document {
  _id: Types.ObjectId;
  key: string;
  enabled: boolean;
  rules: IRobotsRule[];
  sitemaps: string[];
  host?: string;
  customContent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RobotsRuleSchema = new Schema<IRobotsRule>(
  {
    userAgent: { type: String, default: "*" },
    allow: { type: [String], default: ["/"] },
    disallow: {
      type: [String],
      default: ["/admin", "/api", "/private", "/checkout", "/wishlist", "/my-account", "/my-bookings", "/profile"],
    },
    crawlDelay: { type: Number },
  },
  { _id: false },
);

const RobotsConfigSchema = new Schema<IRobotsConfig>(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    enabled: { type: Boolean, default: true },
    rules: { type: [RobotsRuleSchema], default: [{ userAgent: "*", allow: ["/"], disallow: ["/admin", "/api", "/private"] }] },
    sitemaps: {
      type: [String],
      default: [
        "/sitemap.xml",
        "/sitemaps/treks.xml",
        "/sitemaps/blogs.xml",
        "/sitemaps/destinations.xml",
        "/sitemaps/images.xml",
        "/sitemaps/videos.xml",
        "/sitemaps/categories.xml",
      ],
    },
    host: { type: String },
    customContent: { type: String },
  },
  { timestamps: true, collection: "robots" },
);

export const RobotsConfigModel = model<IRobotsConfig>("RobotsConfig", RobotsConfigSchema);
