import { Schema, model, Document, Types } from "mongoose";

export interface ISeoReport extends Document {
  _id: Types.ObjectId;
  type: "audit" | "content_quality" | "dashboard" | "search_console" | "analytics";
  title: string;
  auditId?: Types.ObjectId;
  payload: Record<string, unknown>;
  generatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SeoReportSchema = new Schema<ISeoReport>(
  {
    type: {
      type: String,
      enum: ["audit", "content_quality", "dashboard", "search_console", "analytics"],
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    auditId: { type: Schema.Types.ObjectId, ref: "SeoAudit" },
    payload: { type: Schema.Types.Mixed, default: {} },
    generatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, collection: "seo_reports" },
);

SeoReportSchema.index({ type: 1, createdAt: -1 });

export const SeoReportModel = model<ISeoReport>("SeoReport", SeoReportSchema);
