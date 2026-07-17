import { Schema, model, Document, Types } from "mongoose";
import { softDeletePlugin } from "./plugins/softDelete.plugin";

export type RedirectType = 301 | 302 | 307 | 308;

export interface IRedirect extends Document {
  _id: Types.ObjectId;
  fromPath: string;
  toPath: string;
  statusCode: RedirectType;
  isActive: boolean;
  hitCount: number;
  note?: string;
  entityType?: "trek" | "blog" | "destination" | "page" | "manual";
  entityId?: Types.ObjectId;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const RedirectSchema = new Schema<IRedirect>(
  {
    fromPath: { type: String, required: true, unique: true, trim: true, index: true },
    toPath: { type: String, required: true, trim: true },
    statusCode: { type: Number, enum: [301, 302, 307, 308], default: 301 },
    isActive: { type: Boolean, default: true, index: true },
    hitCount: { type: Number, default: 0 },
    note: { type: String },
    entityType: {
      type: String,
      enum: ["trek", "blog", "destination", "page", "manual"],
      default: "manual",
    },
    entityId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true, collection: "redirects" },
);

RedirectSchema.index({ isActive: 1, fromPath: 1 });
softDeletePlugin(RedirectSchema);

export const RedirectModel = model<IRedirect>("Redirect", RedirectSchema);
