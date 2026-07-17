import { Schema, model, Document, Types } from "mongoose";

export interface ISearchConsole extends Document {
  _id: Types.ObjectId;
  key: string;
  propertyUrl: string;
  verificationMetaTag?: string;
  verificationHtmlFile?: string;
  verificationMethod?: "meta" | "html" | "dns" | "ga";
  isVerified: boolean;
  sitemapsSubmitted: Array<{
    url: string;
    submittedAt: Date;
    status: "pending" | "success" | "error";
    lastCheckedAt?: Date;
    errorMessage?: string;
  }>;
  indexingRequests: Array<{
    url: string;
    requestedAt: Date;
    status: "pending" | "submitted" | "indexed" | "error";
    note?: string;
  }>;
  lastSyncAt?: Date | null;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SearchConsoleSchema = new Schema<ISearchConsole>(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    propertyUrl: { type: String, default: "https://treks.indiaholidaydestination.com" },
    verificationMetaTag: { type: String },
    verificationHtmlFile: { type: String },
    verificationMethod: { type: String, enum: ["meta", "html", "dns", "ga"] },
    isVerified: { type: Boolean, default: false },
    sitemapsSubmitted: [
      {
        url: { type: String, required: true },
        submittedAt: { type: Date, default: Date.now },
        status: { type: String, enum: ["pending", "success", "error"], default: "pending" },
        lastCheckedAt: { type: Date },
        errorMessage: { type: String },
      },
    ],
    indexingRequests: [
      {
        url: { type: String, required: true },
        requestedAt: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: ["pending", "submitted", "indexed", "error"],
          default: "pending",
        },
        note: { type: String },
      },
    ],
    lastSyncAt: { type: Date, default: null },
    notes: { type: String },
  },
  { timestamps: true, collection: "search_console" },
);

export const SearchConsoleModel = model<ISearchConsole>("SearchConsole", SearchConsoleSchema);
