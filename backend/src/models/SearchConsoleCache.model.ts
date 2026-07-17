import { Schema, model, Document, Types } from "mongoose";

export interface ISearchConsoleCache extends Document {
  _id: Types.ObjectId;
  key: string;
  propertyUrl: string;
  rangeDays: number;
  startDate?: string;
  endDate?: string;
  totals: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  };
  topPages: Array<{
    page: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  topQueries: Array<{
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
    landingPage?: string;
  }>;
  coverage: {
    indexed: number;
    notIndexed: number;
    blocked: number;
    noindex: number;
    crawled: number;
    discovered: number;
    errors: number;
    excluded: number;
  };
  sitemaps: Array<{
    path: string;
    lastSubmitted?: string;
    isPending?: boolean;
    warnings?: number;
    errors?: number;
    contents?: Array<{ type?: string; submitted?: number; indexed?: number }>;
  }>;
  raw?: Record<string, unknown>;
  syncedAt: Date;
  source: "google" | "manual" | "empty";
  createdAt: Date;
  updatedAt: Date;
}

const metricRow = {
  clicks: { type: Number, default: 0 },
  impressions: { type: Number, default: 0 },
  ctr: { type: Number, default: 0 },
  position: { type: Number, default: 0 },
};

const SearchConsoleCacheSchema = new Schema<ISearchConsoleCache>(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    propertyUrl: { type: String, default: "" },
    rangeDays: { type: Number, default: 28 },
    startDate: { type: String },
    endDate: { type: String },
    totals: { type: metricRow, default: () => ({}) },
    topPages: [
      {
        page: String,
        clicks: Number,
        impressions: Number,
        ctr: Number,
        position: Number,
      },
    ],
    topQueries: [
      {
        query: String,
        clicks: Number,
        impressions: Number,
        ctr: Number,
        position: Number,
        landingPage: String,
      },
    ],
    coverage: {
      indexed: { type: Number, default: 0 },
      notIndexed: { type: Number, default: 0 },
      blocked: { type: Number, default: 0 },
      noindex: { type: Number, default: 0 },
      crawled: { type: Number, default: 0 },
      discovered: { type: Number, default: 0 },
      errors: { type: Number, default: 0 },
      excluded: { type: Number, default: 0 },
    },
    sitemaps: [
      {
        path: String,
        lastSubmitted: String,
        isPending: Boolean,
        warnings: Number,
        errors: Number,
        contents: [{ type: String, submitted: Number, indexed: Number }],
      },
    ],
    raw: { type: Schema.Types.Mixed },
    syncedAt: { type: Date, default: Date.now },
    source: { type: String, enum: ["google", "manual", "empty"], default: "empty" },
  },
  { timestamps: true, collection: "search_console_cache" },
);

export const SearchConsoleCacheModel = model<ISearchConsoleCache>(
  "SearchConsoleCache",
  SearchConsoleCacheSchema,
);
