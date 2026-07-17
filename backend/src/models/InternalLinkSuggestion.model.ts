import { Schema, model, Document, Types } from "mongoose";

export interface IInternalLinkSuggestion extends Document {
  _id: Types.ObjectId;
  sourceType: "trek" | "blog" | "destination" | "category" | "programmatic";
  sourceId?: Types.ObjectId;
  sourceSlug?: string;
  suggestions: Array<{
    targetType: "trek" | "blog" | "destination" | "category";
    targetId?: string;
    targetSlug: string;
    targetTitle: string;
    url: string;
    anchorText: string;
    relevanceScore: number;
    reason: string;
  }>;
  status: "draft" | "accepted" | "rejected";
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const InternalLinkSuggestionSchema = new Schema<IInternalLinkSuggestion>(
  {
    sourceType: {
      type: String,
      enum: ["trek", "blog", "destination", "category", "programmatic"],
      required: true,
      index: true,
    },
    sourceId: { type: Schema.Types.ObjectId },
    sourceSlug: { type: String },
    suggestions: [
      {
        targetType: { type: String, enum: ["trek", "blog", "destination", "category"], required: true },
        targetId: { type: String },
        targetSlug: { type: String, required: true },
        targetTitle: { type: String, required: true },
        url: { type: String, required: true },
        anchorText: { type: String, required: true },
        relevanceScore: { type: Number, default: 0 },
        reason: { type: String, default: "" },
      },
    ],
    status: { type: String, enum: ["draft", "accepted", "rejected"], default: "draft", index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, collection: "internal_link_suggestions" },
);

export const InternalLinkSuggestionModel = model<IInternalLinkSuggestion>(
  "InternalLinkSuggestion",
  InternalLinkSuggestionSchema,
);
