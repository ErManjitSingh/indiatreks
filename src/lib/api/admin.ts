import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
  apiPut,
  getApiClient,
  type ApiSuccess,
} from "@/lib/api/client";

export type AdminMeta = ApiSuccess<unknown>["meta"];

export type AdminDoc = {
  _id: string;
  id?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
};

async function listResource<T>(
  path: string,
  params?: Record<string, unknown>,
): Promise<{ items: T[]; meta?: AdminMeta }> {
  const res = await apiGet<T[]>(path, params);
  return { items: res.data ?? [], meta: res.meta };
}

/* ---------- Treks ---------- */
export async function adminListTreks(params?: Record<string, unknown>) {
  return listResource<AdminDoc>("/treks", { limit: 50, ...params });
}

export type TrekAdminStats = {
  total: number;
  published: number;
  draft: number;
  archived: number;
  regions: string[];
};

export async function adminGetTrekStats(): Promise<TrekAdminStats> {
  const res = await apiGet<TrekAdminStats>("/treks/stats");
  return (
    res.data ?? {
      total: 0,
      published: 0,
      draft: 0,
      archived: 0,
      regions: [],
    }
  );
}

export async function adminGetTrek(id: string) {
  const res = await apiGet<AdminDoc>(`/treks/id/${id}`);
  return res.data;
}

export async function adminCreateTrek(body: Record<string, unknown>) {
  const res = await apiPost<AdminDoc>("/treks", body);
  return res.data;
}

export async function adminUpdateTrek(id: string, body: Record<string, unknown>) {
  const res = await apiPatch<AdminDoc>(`/treks/${id}`, body);
  return res.data;
}

export async function adminDeleteTrek(id: string) {
  await apiDelete(`/treks/${id}`);
}

/* ---------- Destinations ---------- */
export async function adminListDestinations(params?: Record<string, unknown>) {
  return listResource<AdminDoc>("/destinations", { limit: 100, ...params });
}

export async function adminGetDestination(id: string) {
  const res = await apiGet<AdminDoc>(`/destinations/id/${id}`);
  return res.data;
}

export async function adminCreateDestination(body: Record<string, unknown>) {
  const res = await apiPost<AdminDoc>("/destinations", body);
  return res.data;
}

export async function adminUpdateDestination(id: string, body: Record<string, unknown>) {
  const res = await apiPatch<AdminDoc>(`/destinations/${id}`, body);
  return res.data;
}

export async function adminDeleteDestination(id: string) {
  await apiDelete(`/destinations/${id}`);
}

/* ---------- Blogs ---------- */
export async function adminListBlogs(params?: Record<string, unknown>) {
  return listResource<AdminDoc>("/blogs", { limit: 100, ...params });
}

export async function adminGetBlog(id: string) {
  const res = await apiGet<AdminDoc>(`/blogs/id/${id}`);
  return res.data;
}

export async function adminCreateBlog(body: Record<string, unknown>) {
  const res = await apiPost<AdminDoc>("/blogs", body);
  return res.data;
}

export async function adminUpdateBlog(id: string, body: Record<string, unknown>) {
  const res = await apiPatch<AdminDoc>(`/blogs/${id}`, body);
  return res.data;
}

export async function adminDeleteBlog(id: string) {
  await apiDelete(`/blogs/${id}`);
}

/* ---------- FAQs ---------- */
export async function adminListFaqs(params?: Record<string, unknown>) {
  return listResource<AdminDoc>("/faqs", { limit: 100, ...params });
}

export async function adminCreateFaq(body: Record<string, unknown>) {
  const res = await apiPost<AdminDoc>("/faqs", body);
  return res.data;
}

export async function adminUpdateFaq(id: string, body: Record<string, unknown>) {
  const res = await apiPatch<AdminDoc>(`/faqs/${id}`, body);
  return res.data;
}

export async function adminDeleteFaq(id: string) {
  await apiDelete(`/faqs/${id}`);
}

/** No GET /faqs/:id route — resolve from list. */
export async function adminGetFaq(id: string) {
  const { items } = await adminListFaqs({ limit: 100 });
  const found = items.find((item) => String(item._id) === id);
  if (!found) throw new Error("FAQ not found");
  return found;
}

/* ---------- Testimonials ---------- */
export async function adminListTestimonials(params?: Record<string, unknown>) {
  return listResource<AdminDoc>("/testimonials", { limit: 100, ...params });
}

/** No GET /testimonials/:id route — resolve from list. */
export async function adminGetTestimonial(id: string) {
  const { items } = await adminListTestimonials({ limit: 100 });
  const found = items.find((item) => String(item._id) === id);
  if (!found) throw new Error("Testimonial not found");
  return found;
}

export async function adminCreateTestimonial(body: Record<string, unknown>) {
  const res = await apiPost<AdminDoc>("/testimonials", body);
  return res.data;
}

export async function adminUpdateTestimonial(id: string, body: Record<string, unknown>) {
  const res = await apiPatch<AdminDoc>(`/testimonials/${id}`, body);
  return res.data;
}

export async function adminDeleteTestimonial(id: string) {
  await apiDelete(`/testimonials/${id}`);
}

/* ---------- Categories ---------- */
export async function adminListCategories(params?: Record<string, unknown>) {
  return listResource<AdminDoc>("/categories", { limit: 100, ...params });
}

export async function adminGetCategory(id: string) {
  const res = await apiGet<AdminDoc>(`/categories/${id}`);
  return res.data;
}

export async function adminCreateCategory(body: Record<string, unknown>) {
  const res = await apiPost<AdminDoc>("/categories", body);
  return res.data;
}

export async function adminUpdateCategory(id: string, body: Record<string, unknown>) {
  const res = await apiPatch<AdminDoc>(`/categories/${id}`, body);
  return res.data;
}

export async function adminDeleteCategory(id: string) {
  await apiDelete(`/categories/${id}`);
}

/* ---------- Media ---------- */
export async function adminListMedia(params?: Record<string, unknown>) {
  return listResource<AdminDoc>("/media", { limit: 100, ...params });
}

export async function adminDeleteMedia(id: string) {
  await apiDelete(`/media/${id}`);
}

export async function adminUploadMedia(file: File, folder = "site-assets", alt = "") {
  const form = new FormData();
  form.append("file", file);
  form.append("folder", folder);
  if (alt) form.append("alt", alt);
  const res = await getApiClient().post<ApiSuccess<AdminDoc>>("/media/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
}

/* ---------- Settings ---------- */
export async function adminGetSettings(group?: string) {
  const res = await apiGet<Record<string, unknown>>("/settings", group ? { group } : undefined);
  return res.data ?? {};
}

export type AdminDashboardStats = {
  treks?: { total?: number; published?: number };
  content?: {
    destinations?: number;
    faqs?: number;
    blogs?: number;
    categories?: number;
  };
  bookings?: { total?: number; confirmed?: number; pending?: number };
  users?: { total?: number };
  enquiries?: { new?: number };
  revenue?: { total?: number; thisMonth?: number; lastMonth?: number };
};

export async function adminGetDashboardStats(): Promise<AdminDashboardStats> {
  const res = await apiGet<AdminDashboardStats>("/analytics/dashboard");
  return res.data ?? {};
}

export async function adminUpsertSetting(key: string, value: unknown, group?: string) {
  const res = await apiPut<AdminDoc>("/settings", { key, value, group });
  return res.data;
}

export async function adminBulkUpsertSettings(
  settings: Array<{ key: string; value: unknown; group?: string }>,
) {
  const res = await apiPut<Record<string, unknown>>("/settings/bulk", { settings });
  return res.data;
}

export function getErrorMessage(err: unknown, fallback = "Request failed") {
  if (err && typeof err === "object" && "response" in err) {
    const response = (err as { response?: { data?: { message?: string } } }).response;
    if (response?.data?.message) return String(response.data.message);
  }
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}

export function linesToArray(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function arrayToLines(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value.map(String).join("\n");
}
