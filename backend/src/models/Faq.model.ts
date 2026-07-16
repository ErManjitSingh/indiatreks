import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";

export type FaqStatus = "draft" | "published";

export interface IFaqDoc extends Document {
  _id: Types.ObjectId;
  question: string;
  answer: string;
  category?: string;
  trek?: Types.ObjectId;
  sortOrder: number;
  status: FaqStatus;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const FaqSchema = new Schema<IFaqDoc>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, index: true },
    trek: { type: Schema.Types.ObjectId, ref: "Trek" },
    sortOrder: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "published", index: true },
  },
  { timestamps: true },
);

softDeletePlugin(FaqSchema);

export const FaqModel = model<IFaqDoc>("Faq", FaqSchema);
