import { NewsletterModel } from "../models/Newsletter.model";
import { getPagination, paginateMeta } from "../utils/pagination";

interface ListQuery {
  page?: number;
  limit?: number;
  status?: string;
}

async function subscribe(email: string, source?: string) {
  const normalized = email.toLowerCase().trim();
  const subscriber = await NewsletterModel.findOneAndUpdate(
    { email: normalized },
    { email: normalized, status: "subscribed", source, deletedAt: null },
    { new: true, upsert: true, runValidators: true },
  );
  return subscriber;
}

async function unsubscribe(email: string) {
  const subscriber = await NewsletterModel.findOneAndUpdate(
    { email: email.toLowerCase().trim() },
    { status: "unsubscribed" },
    { new: true },
  );
  return subscriber;
}

async function list(query: ListQuery) {
  const { page, limit, skip } = getPagination(query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (query.status) filter.status = query.status;

  const [items, total] = await Promise.all([
    NewsletterModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    NewsletterModel.countDocuments(filter),
  ]);
  return { items, meta: paginateMeta(total, page, limit) };
}

export const newsletterService = {
  subscribe,
  unsubscribe,
  list,
};
