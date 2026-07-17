import { Types } from "mongoose";
import { KeywordTrackingModel } from "../models/KeywordTracking.model";
import { googleSearchConsoleService } from "./googleSearchConsole.service";
import { ApiError } from "../utils/ApiError";
import { getPagination, paginateMeta } from "../utils/pagination";

async function list(query: { page?: number; limit?: number; active?: boolean; q?: string }) {
  const { page, limit, skip } = getPagination(query);
  const filter: Record<string, unknown> = {};
  if (query.active != null) filter.active = query.active;
  if (query.q) filter.keyword = { $regex: query.q, $options: "i" };

  const [items, total] = await Promise.all([
    KeywordTrackingModel.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit),
    KeywordTrackingModel.countDocuments(filter),
  ]);
  return { items, meta: paginateMeta(total, page, limit) };
}

async function create(
  input: {
    keyword: string;
    landingPage?: string;
    currentPosition?: number;
    searchVolume?: number;
    difficulty?: number;
    notes?: string;
  },
  userId?: string,
) {
  const existing = await KeywordTrackingModel.findOne({
    keyword: input.keyword.trim().toLowerCase(),
    landingPage: input.landingPage || "",
  });
  if (existing) throw new ApiError(409, "Keyword already tracked", "KEYWORD_EXISTS");

  return KeywordTrackingModel.create({
    keyword: input.keyword.trim().toLowerCase(),
    landingPage: input.landingPage || "",
    currentPosition: input.currentPosition ?? null,
    searchVolume: input.searchVolume ?? null,
    difficulty: input.difficulty ?? null,
    notes: input.notes,
    source: "manual",
    createdBy: userId ? new Types.ObjectId(userId) : undefined,
    history: input.currentPosition
      ? [{ date: new Date(), position: input.currentPosition }]
      : [],
  });
}

async function update(id: string, input: Record<string, unknown>) {
  const doc = await KeywordTrackingModel.findById(id);
  if (!doc) throw new ApiError(404, "Keyword not found", "KEYWORD_NOT_FOUND");

  if (input.currentPosition != null && Number(input.currentPosition) !== doc.currentPosition) {
    doc.previousPosition = doc.currentPosition;
    doc.currentPosition = Number(input.currentPosition);
    doc.history.push({
      date: new Date(),
      position: Number(input.currentPosition),
      clicks: doc.clicks,
      impressions: doc.impressions,
    });
    doc.lastCheckedAt = new Date();
  }

  for (const key of ["landingPage", "searchVolume", "difficulty", "notes", "active"] as const) {
    if (input[key] !== undefined) (doc as never as Record<string, unknown>)[key] = input[key];
  }
  await doc.save();
  return doc;
}

async function remove(id: string) {
  const doc = await KeywordTrackingModel.findByIdAndDelete(id);
  if (!doc) throw new ApiError(404, "Keyword not found", "KEYWORD_NOT_FOUND");
  return { deleted: true };
}

/** Pull top queries from GSC cache / live sync into keyword tracker */
async function syncFromGsc() {
  const dash = await googleSearchConsoleService.getDashboard(28, true);
  let upserted = 0;
  for (const row of dash.topQueries.slice(0, 40)) {
    const keyword = row.query.trim().toLowerCase();
    if (!keyword) continue;
    const existing = await KeywordTrackingModel.findOne({ keyword, landingPage: "" });
    if (existing) {
      existing.previousPosition = existing.currentPosition;
      existing.currentPosition = row.position;
      existing.clicks = row.clicks;
      existing.impressions = row.impressions;
      existing.ctr = row.ctr;
      existing.source = "gsc";
      existing.lastCheckedAt = new Date();
      existing.history.push({
        date: new Date(),
        position: row.position,
        clicks: row.clicks,
        impressions: row.impressions,
      });
      await existing.save();
    } else {
      await KeywordTrackingModel.create({
        keyword,
        landingPage: "",
        currentPosition: row.position,
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        source: "gsc",
        lastCheckedAt: new Date(),
        history: [{ date: new Date(), position: row.position, clicks: row.clicks, impressions: row.impressions }],
      });
    }
    upserted += 1;
  }
  return { upserted, connected: dash.connected };
}

export const keywordTrackingService = {
  list,
  create,
  update,
  remove,
  syncFromGsc,
};
