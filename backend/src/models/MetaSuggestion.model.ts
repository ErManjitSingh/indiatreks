import { Schema, model, Document, Types } from "mongoose";

export interface IMetaSuggestion extends Document {
  _id: Types.ObjectId;
  entityType: "trek" | "blog" | "destination" | "category" | "programmatic";
  entityId?: Types.ObjectId;
  inputSnapshot: Record<string, unknown>;
  suggestions: {
    title?: string;
    description?: string;
    canonical?: string;
    slug?: string;
    ogTitle?: string;
    ogDescription?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    focusKeyword?: string;
    keywords?: string[];
  };
  status: "draft" | "accepted" | "rejected" | "edited";
  acceptedFields?: string[];
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MetaSuggestionSchema = new Schema<IMetaSuggestion>(
  {
    entityType: {
      type: String,
      enum: ["trek", "blog", "destination", "category", "programmatic"],
      required: true,
      index: true,
    },
    entityId: { type: Schema.Types.ObjectId },
    inputSnapshot: { type: Schema.Types.Mixed, default: {} },
    suggestions: { type: Schema.Types.Mixed, required: true },
    status: {
      type: String,
      enum: ["draft", "accepted", "rejected", "edited"],
      default: "draft",
      index: true,
    },
    acceptedFields: { type: [String], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, collection: "meta_suggestions" },
);

export const MetaSuggestionModel = model<IMetaSuggestion>("MetaSuggestion", MetaSuggestionSchema);
