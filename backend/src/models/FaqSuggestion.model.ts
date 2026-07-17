import { Schema, model, Document, Types } from "mongoose";

export interface IFaqSuggestion extends Document {
  _id: Types.ObjectId;
  entityType: "trek" | "blog" | "destination" | "programmatic";
  entityId?: Types.ObjectId;
  inputSnapshot: Record<string, unknown>;
  faqs: Array<{ question: string; answer: string }>;
  status: "draft" | "accepted" | "rejected" | "edited";
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FaqSuggestionSchema = new Schema<IFaqSuggestion>(
  {
    entityType: {
      type: String,
      enum: ["trek", "blog", "destination", "programmatic"],
      required: true,
      index: true,
    },
    entityId: { type: Schema.Types.ObjectId },
    inputSnapshot: { type: Schema.Types.Mixed, default: {} },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["draft", "accepted", "rejected", "edited"],
      default: "draft",
      index: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, collection: "faq_suggestions" },
);

export const FaqSuggestionModel = model<IFaqSuggestion>("FaqSuggestion", FaqSuggestionSchema);
