import { Schema, model, Document, Types } from "mongoose";

export interface ISearchQuery extends Document {
  _id: Types.ObjectId;
  query: string;
  normalizedQuery: string;
  count: number;
  lastSearchedAt: Date;
  resultCount: number;
  source: "search" | "autocomplete" | "suggestion";
  isPopular: boolean;
  isTrending: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SearchQuerySchema = new Schema<ISearchQuery>(
  {
    query: { type: String, required: true, trim: true },
    normalizedQuery: { type: String, required: true, lowercase: true, trim: true, index: true },
    count: { type: Number, default: 1 },
    lastSearchedAt: { type: Date, default: Date.now, index: true },
    resultCount: { type: Number, default: 0 },
    source: { type: String, enum: ["search", "autocomplete", "suggestion"], default: "search" },
    isPopular: { type: Boolean, default: false, index: true },
    isTrending: { type: Boolean, default: false, index: true },
  },
  { timestamps: true, collection: "search_queries" },
);

SearchQuerySchema.index({ count: -1 });
SearchQuerySchema.index({ lastSearchedAt: -1, count: -1 });

export const SearchQueryModel = model<ISearchQuery>("SearchQuery", SearchQuerySchema);
