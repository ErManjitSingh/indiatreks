import { Schema, model, Document, Types } from "mongoose";

export interface INotFoundLog extends Document {
  _id: Types.ObjectId;
  path: string;
  referer?: string;
  userAgent?: string;
  ip?: string;
  hitCount: number;
  lastHitAt: Date;
  resolved: boolean;
  ignored: boolean;
  redirectId?: Types.ObjectId;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NotFoundLogSchema = new Schema<INotFoundLog>(
  {
    path: { type: String, required: true, unique: true, trim: true, index: true },
    referer: { type: String },
    userAgent: { type: String },
    ip: { type: String },
    hitCount: { type: Number, default: 1 },
    lastHitAt: { type: Date, default: Date.now, index: true },
    resolved: { type: Boolean, default: false, index: true },
    ignored: { type: Boolean, default: false, index: true },
    redirectId: { type: Schema.Types.ObjectId, ref: "Redirect" },
    notes: { type: String },
  },
  { timestamps: true, collection: "not_found_logs" },
);

NotFoundLogSchema.index({ hitCount: -1 });

export const NotFoundLogModel = model<INotFoundLog>("NotFoundLog", NotFoundLogSchema);
