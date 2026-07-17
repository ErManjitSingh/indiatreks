import { Schema, model, Document, Types } from "mongoose";

export interface IContentQualityReport extends Document {
  _id: Types.ObjectId;
  entityType: "trek" | "blog" | "destination" | "programmatic";
  entityId?: Types.ObjectId;
  entitySlug?: string;
  title?: string;
  scores: {
    overall: number;
    headings: number;
    paragraphs: number;
    images: number;
    faqs: number;
    cta: number;
    length: number;
  };
  analysis: {
    headingStructure: string[];
    paragraphCount: number;
    avgParagraphLength: number;
    imageCount: number;
    missingAltCount: number;
    hasCta: boolean;
    hasFaqs: boolean;
    wordCount: number;
    h1Count: number;
  };
  improvements: string[];
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ContentQualityReportSchema = new Schema<IContentQualityReport>(
  {
    entityType: {
      type: String,
      enum: ["trek", "blog", "destination", "programmatic"],
      required: true,
      index: true,
    },
    entityId: { type: Schema.Types.ObjectId },
    entitySlug: { type: String },
    title: { type: String },
    scores: {
      overall: { type: Number, default: 0 },
      headings: { type: Number, default: 0 },
      paragraphs: { type: Number, default: 0 },
      images: { type: Number, default: 0 },
      faqs: { type: Number, default: 0 },
      cta: { type: Number, default: 0 },
      length: { type: Number, default: 0 },
    },
    analysis: {
      headingStructure: { type: [String], default: [] },
      paragraphCount: { type: Number, default: 0 },
      avgParagraphLength: { type: Number, default: 0 },
      imageCount: { type: Number, default: 0 },
      missingAltCount: { type: Number, default: 0 },
      hasCta: { type: Boolean, default: false },
      hasFaqs: { type: Boolean, default: false },
      wordCount: { type: Number, default: 0 },
      h1Count: { type: Number, default: 0 },
    },
    improvements: { type: [String], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, collection: "content_quality_reports" },
);

ContentQualityReportSchema.index({ entityType: 1, createdAt: -1 });

export const ContentQualityReportModel = model<IContentQualityReport>(
  "ContentQualityReport",
  ContentQualityReportSchema,
);
