import { Schema, model, Document, Types } from "mongoose";

export interface ISeoReport extends Document {
  _id: Types.ObjectId;
  type: "audit" | "content_quality" | "dashboard" | "search_console" | "analytics" | "core_web_vitals";
  title: string;
  summary?: string;
  auditId?: Types.ObjectId;
  payload: Record<string, unknown>;
  generatedBy?: Types.ObjectId;
  generatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SeoReportSchema = new Schema<ISeoReport>(
  {
    type: {
      type: String,
      enum: ["audit", "content_quality", "dashboard", "search_console", "analytics", "core_web_vitals"],
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    summary: { type: String },
    auditId: { type: Schema.Types.ObjectId, ref: "SeoAudit" },
    payload: { type: Schema.Types.Mixed, default: {} },
    generatedBy: { type: Schema.Types.ObjectId, ref: "User" },
    generatedAt: { type: Date },
  },
  { timestamps: true, collection: "seo_reports" },
);

SeoReportSchema.index({ type: 1, createdAt: -1 });

export const SeoReportModel = model<ISeoReport>("SeoReport", SeoReportSchema);
