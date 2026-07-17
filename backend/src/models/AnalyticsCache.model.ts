import { Schema, model, Document, Types } from "mongoose";

export interface IAnalyticsCache extends Document {
  _id: Types.ObjectId;
  key: string;
  propertyId: string;
  rangeDays: number;
  startDate?: string;
  endDate?: string;
  totals: {
    sessions: number;
    users: number;
    newUsers: number;
    organicUsers: number;
    organicSessions: number;
    realtimeUsers: number;
    conversions: number;
    bounceRate: number;
    averageEngagementSeconds: number;
  };
  topPages: Array<{
    page: string;
    sessions: number;
    users: number;
    bounceRate?: number;
    engagementSeconds?: number;
  }>;
  syncedAt: Date;
  source: "google" | "manual" | "empty";
  createdAt: Date;
  updatedAt: Date;
}

const AnalyticsCacheSchema = new Schema<IAnalyticsCache>(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    propertyId: { type: String, default: "" },
    rangeDays: { type: Number, default: 28 },
    startDate: { type: String },
    endDate: { type: String },
    totals: {
      sessions: { type: Number, default: 0 },
      users: { type: Number, default: 0 },
      newUsers: { type: Number, default: 0 },
      organicUsers: { type: Number, default: 0 },
      organicSessions: { type: Number, default: 0 },
      realtimeUsers: { type: Number, default: 0 },
      conversions: { type: Number, default: 0 },
      bounceRate: { type: Number, default: 0 },
      averageEngagementSeconds: { type: Number, default: 0 },
    },
    topPages: [
      {
        page: String,
        sessions: Number,
        users: Number,
        bounceRate: Number,
        engagementSeconds: Number,
      },
    ],
    syncedAt: { type: Date, default: Date.now },
    source: { type: String, enum: ["google", "manual", "empty"], default: "empty" },
  },
  { timestamps: true, collection: "analytics_cache" },
);

export const AnalyticsCacheModel = model<IAnalyticsCache>("AnalyticsCache", AnalyticsCacheSchema);
