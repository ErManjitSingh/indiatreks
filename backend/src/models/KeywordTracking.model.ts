import { Schema, model, Document, Types } from "mongoose";

export interface IKeywordTracking extends Document {
  _id: Types.ObjectId;
  keyword: string;
  landingPage?: string;
  currentPosition?: number | null;
  previousPosition?: number | null;
  searchVolume?: number | null;
  difficulty?: number | null;
  clicks?: number;
  impressions?: number;
  ctr?: number;
  source: "manual" | "gsc" | "import";
  lastCheckedAt?: Date | null;
  history: Array<{
    date: Date;
    position?: number | null;
    clicks?: number;
    impressions?: number;
  }>;
  notes?: string;
  active: boolean;
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const KeywordTrackingSchema = new Schema<IKeywordTracking>(
  {
    keyword: { type: String, required: true, trim: true, index: true },
    landingPage: { type: String, trim: true },
    currentPosition: { type: Number, default: null },
    previousPosition: { type: Number, default: null },
    searchVolume: { type: Number, default: null },
    difficulty: { type: Number, default: null },
    clicks: { type: Number, default: 0 },
    impressions: { type: Number, default: 0 },
    ctr: { type: Number, default: 0 },
    source: { type: String, enum: ["manual", "gsc", "import"], default: "manual" },
    lastCheckedAt: { type: Date, default: null },
    history: [
      {
        date: { type: Date, default: Date.now },
        position: { type: Number },
        clicks: { type: Number },
        impressions: { type: Number },
      },
    ],
    notes: { type: String },
    active: { type: Boolean, default: true, index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, collection: "keyword_tracking" },
);

KeywordTrackingSchema.index({ keyword: 1, landingPage: 1 }, { unique: true });

export const KeywordTrackingModel = model<IKeywordTracking>("KeywordTracking", KeywordTrackingSchema);
