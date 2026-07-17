import { RedirectModel, type IRedirect, type RedirectType } from "../models/Redirect.model";
import { NotFoundLogModel } from "../models/NotFoundLog.model";
import { getPagination, paginateMeta } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";
import { slugify } from "../utils/slugify";

function normalizePath(path: string): string {
  const trimmed = path.trim();
  if (!trimmed) return "/";
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withSlash.replace(/\/+$/, "") || "/";
}

async function ensureUniqueSlug(
  model: { exists: (filter: Record<string, unknown>) => Promise<unknown> },
  baseSlug: string,
  excludeId?: string,
): Promise<string> {
  const base = slugify(baseSlug) || "item";
  let candidate = base;
  let counter = 1;
  while (
    await model.exists({
      slug: candidate,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    })
  ) {
    candidate = `${base}-${counter}`;
    counter += 1;
  }
  return candidate;
}

async function createSlugRedirect(input: {
  fromPath: string;
  toPath: string;
  entityType: IRedirect["entityType"];
  entityId?: string;
  note?: string;
}) {
  const fromPath = normalizePath(input.fromPath);
  const toPath = normalizePath(input.toPath);
  if (fromPath === toPath) return null;

  return RedirectModel.findOneAndUpdate(
    { fromPath },
    {
      fromPath,
      toPath,
      statusCode: 301 as RedirectType,
      isActive: true,
      entityType: input.entityType,
      entityId: input.entityId,
      note: input.note || `Auto redirect after slug change`,
      deletedAt: null,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
}

async function list(query: { page?: number; limit?: number; q?: string; isActive?: boolean }) {
  const { page, limit, skip } = getPagination(query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (query.q) {
    filter.$or = [
      { fromPath: new RegExp(query.q, "i") },
      { toPath: new RegExp(query.q, "i") },
      { note: new RegExp(query.q, "i") },
    ];
  }
  if (typeof query.isActive === "boolean") filter.isActive = query.isActive;

  const [items, total] = await Promise.all([
    RedirectModel.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit),
    RedirectModel.countDocuments(filter),
  ]);
  return { items, meta: paginateMeta(total, page, limit) };
}

async function resolve(path: string) {
  const fromPath = normalizePath(path);
  const redirect = await RedirectModel.findOne({ fromPath, isActive: true });
  if (!redirect) return null;
  await RedirectModel.updateOne({ _id: redirect._id }, { $inc: { hitCount: 1 } });
  return redirect;
}

async function create(data: Partial<IRedirect>) {
  if (!data.fromPath || !data.toPath) {
    throw new ApiError(400, "fromPath and toPath are required", "REDIRECT_INVALID");
  }
  const fromPath = normalizePath(data.fromPath);
  const existing = await RedirectModel.findOne({ fromPath });
  if (existing) throw new ApiError(409, "Redirect already exists for this path", "REDIRECT_EXISTS");

  return RedirectModel.create({
    ...data,
    fromPath,
    toPath: normalizePath(data.toPath),
    statusCode: data.statusCode ?? 301,
  });
}

async function update(id: string, data: Partial<IRedirect>) {
  const payload: Partial<IRedirect> = { ...data };
  if (data.fromPath) payload.fromPath = normalizePath(data.fromPath);
  if (data.toPath) payload.toPath = normalizePath(data.toPath);

  const redirect = await RedirectModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!redirect) throw new ApiError(404, "Redirect not found", "REDIRECT_NOT_FOUND");
  return redirect;
}

async function softDelete(id: string) {
  const redirect = await RedirectModel.findByIdAndUpdate(
    id,
    { deletedAt: new Date(), isActive: false },
    { new: true },
  );
  if (!redirect) throw new ApiError(404, "Redirect not found", "REDIRECT_NOT_FOUND");
  return redirect;
}

async function logNotFound(input: {
  path: string;
  referer?: string;
  userAgent?: string;
  ip?: string;
}) {
  const path = normalizePath(input.path);
  return NotFoundLogModel.findOneAndUpdate(
    { path },
    {
      $set: {
        path,
        referer: input.referer,
        userAgent: input.userAgent,
        ip: input.ip,
        lastHitAt: new Date(),
      },
      $inc: { hitCount: 1 },
      $setOnInsert: { resolved: false },
    },
    { upsert: true, new: true },
  );
}

async function listNotFound(query: { page?: number; limit?: number; resolved?: boolean }) {
  const { page, limit, skip } = getPagination(query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (typeof query.resolved === "boolean") filter.resolved = query.resolved;

  const [items, total] = await Promise.all([
    NotFoundLogModel.find(filter).sort({ hitCount: -1, lastHitAt: -1 }).skip(skip).limit(limit),
    NotFoundLogModel.countDocuments(filter),
  ]);
  return { items, meta: paginateMeta(total, page, limit) };
}

async function resolveNotFound(id: string, redirectId?: string) {
  const log = await NotFoundLogModel.findByIdAndUpdate(
    id,
    { resolved: true, redirectId },
    { new: true },
  );
  if (!log) throw new ApiError(404, "404 log not found", "NOT_FOUND_LOG_MISSING");
  return log;
}

export const redirectService = {
  normalizePath,
  ensureUniqueSlug,
  createSlugRedirect,
  list,
  resolve,
  create,
  update,
  softDelete,
  logNotFound,
  listNotFound,
  resolveNotFound,
};

export const slugService = {
  slugify,
  ensureUniqueSlug,
  createSlugRedirect,
  normalizePath,
};
