import { Schema, model, Document, Types } from "mongoose";

export interface IGoogleAccount extends Document {
  _id: Types.ObjectId;
  key: string;
  provider: "google";
  name?: string;
  email?: string;
  googleUserId?: string;
  /** Encrypted access token */
  accessTokenEnc?: string;
  /** Encrypted refresh token */
  refreshTokenEnc?: string;
  scope?: string[];
  tokenType?: string;
  expiryDate?: Date | null;
  connected: boolean;
  connectedAt?: Date | null;
  disconnectedAt?: Date | null;
  lastError?: string;
  searchConsoleProperty?: string;
  ga4PropertyId?: string;
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const GoogleAccountSchema = new Schema<IGoogleAccount>(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    provider: { type: String, enum: ["google"], default: "google" },
    name: { type: String },
    email: { type: String },
    googleUserId: { type: String },
    accessTokenEnc: { type: String, select: false },
    refreshTokenEnc: { type: String, select: false },
    scope: [{ type: String }],
    tokenType: { type: String },
    expiryDate: { type: Date, default: null },
    connected: { type: Boolean, default: false, index: true },
    connectedAt: { type: Date, default: null },
    disconnectedAt: { type: Date, default: null },
    lastError: { type: String },
    searchConsoleProperty: { type: String },
    ga4PropertyId: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, collection: "google_accounts" },
);

export const GoogleAccountModel = model<IGoogleAccount>("GoogleAccount", GoogleAccountSchema);
