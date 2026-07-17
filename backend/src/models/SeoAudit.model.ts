import { Schema, model, Document, Types } from "mongoose";

export type AuditSeverity = "critical" | "warning" | "info";
export type AuditEntityType = "trek" | "blog" | "destination" | "category" | "programmatic" | "page" | "global";

export interface ISeoAuditIssue {
  code: string;
  severity: AuditSeverity;
  entityType: AuditEntityType;
  entityId?: string;
  entitySlug?: string;
  path?: string;
  title?: string;
  message: string;
  suggestion?: string;
}

export interface ISeoAudit extends Document {
  _id: Types.ObjectId;
  status: "running" | "completed" | "failed";
  triggeredBy?: Types.ObjectId;
  startedAt: Date;
  completedAt?: Date | null;
  summary: {
    healthScore: number;
    totalIssues: number;
    critical: number;
    warning: number;
    info: number;
    pagesScanned: number;
  };
  counts: {
    missingMeta: number;
    missingSchema: number;
    duplicateTitles: number;
    duplicateDescriptions: number;
    missingAlt: number;
    missingCanonicals: number;
    brokenInternalLinks: number;
    missingFaqs: number;
    lowContentQuality: number;
    duplicateSlugs: number;
    duplicateCanonicals: number;
    missingImages: number;
    missingH1: number;
    multipleH1: number;
    orphanPages: number;
  };
  issues: ISeoAuditIssue[];
  suggestions: string[];
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const IssueSchema = new Schema<ISeoAuditIssue>(
  {
    code: { type: String, required: true },
    severity: { type: String, enum: ["critical", "warning", "info"], required: true },
    entityType: {
      type: String,
      enum: ["trek", "blog", "destination", "category", "programmatic", "page", "global"],
      required: true,
    },
    entityId: { type: String },
    entitySlug: { type: String },
    path: { type: String },
    title: { type: String },
    message: { type: String, required: true },
    suggestion: { type: String },
  },
  { _id: false },
);

const SeoAuditSchema = new Schema<ISeoAudit>(
  {
    status: { type: String, enum: ["running", "completed", "failed"], default: "running", index: true },
    triggeredBy: { type: Schema.Types.ObjectId, ref: "User" },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date, default: null },
    summary: {
      healthScore: { type: Number, default: 0 },
      totalIssues: { type: Number, default: 0 },
      critical: { type: Number, default: 0 },
      warning: { type: Number, default: 0 },
      info: { type: Number, default: 0 },
      pagesScanned: { type: Number, default: 0 },
    },
    counts: {
      missingMeta: { type: Number, default: 0 },
      missingSchema: { type: Number, default: 0 },
      duplicateTitles: { type: Number, default: 0 },
      duplicateDescriptions: { type: Number, default: 0 },
      missingAlt: { type: Number, default: 0 },
      missingCanonicals: { type: Number, default: 0 },
      brokenInternalLinks: { type: Number, default: 0 },
      missingFaqs: { type: Number, default: 0 },
      lowContentQuality: { type: Number, default: 0 },
      duplicateSlugs: { type: Number, default: 0 },
      duplicateCanonicals: { type: Number, default: 0 },
      missingImages: { type: Number, default: 0 },
      missingH1: { type: Number, default: 0 },
      multipleH1: { type: Number, default: 0 },
      orphanPages: { type: Number, default: 0 },
    },
    issues: { type: [IssueSchema], default: [] },
    suggestions: { type: [String], default: [] },
    errorMessage: { type: String },
  },
  { timestamps: true, collection: "seo_audits" },
);

SeoAuditSchema.index({ createdAt: -1 });

export const SeoAuditModel = model<ISeoAudit>("SeoAudit", SeoAuditSchema);
