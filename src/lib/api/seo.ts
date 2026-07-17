import { apiGet, apiPut, apiPost, apiPatch, apiDelete, type ApiSuccess } from "@/lib/api/client";

export type SeoDoc = Record<string, unknown> & { _id?: string };

function resolveApiBaseUrl(): string {
  const serverOnly = (process.env.API_URL || "").replace(/\/$/, "");
  if (serverOnly) return serverOnly;
  const fromPublic = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
  if (fromPublic) return fromPublic;
  return "https://treks.indiaholidaydestination.com/api/v1";
}

/** Server-side fetch without auth for public SEO endpoints */
async function serverGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${resolveApiBaseUrl()}${path}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiSuccess<T>;
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function fetchSeoBootstrap() {
  return serverGet<Record<string, unknown>>("/seo/bootstrap");
}

export async function fetchProgrammaticSeoPage(slug: string) {
  return serverGet<SeoDoc>(`/seo/programmatic/by-slug/${slug}`);
}

export async function fetchTrekSeoBundle(slug: string) {
  return serverGet<Record<string, unknown>>(`/seo/treks/${slug}`);
}

export async function fetchDestinationSeoBundle(slug: string) {
  return serverGet<Record<string, unknown>>(`/seo/destinations/${slug}`);
}

export async function fetchBlogSeoBundle(slug: string) {
  return serverGet<Record<string, unknown>>(`/seo/blogs/${slug}`);
}

export async function fetchSitemapXml(name: string) {
  try {
    const res = await fetch(`${resolveApiBaseUrl()}/seo/sitemaps/${name}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/xml" },
    });
    if (!res.ok) return null;
    return res.text();
  } catch {
    return null;
  }
}

export async function fetchRobotsTxt() {
  try {
    const res = await fetch(`${resolveApiBaseUrl()}/seo/robots.txt`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.text();
  } catch {
    return null;
  }
}

export async function resolveRedirect(path: string) {
  return serverGet<{ fromPath: string; toPath: string; statusCode: number } | null>(
    `/seo/redirects/resolve?path=${encodeURIComponent(path)}`,
  );
}

/* Admin SEO APIs */
export async function adminGetSeoSettings() {
  const res = await apiGet<SeoDoc>("/seo/settings");
  return res.data;
}

export async function adminUpdateSeoSettings(body: Record<string, unknown>) {
  const res = await apiPut<SeoDoc>("/seo/settings", body);
  return res.data;
}

export async function adminGetRobots() {
  const res = await apiGet<SeoDoc>("/seo/robots");
  return res.data;
}

export async function adminUpdateRobots(body: Record<string, unknown>) {
  const res = await apiPut<SeoDoc>("/seo/robots", body);
  return res.data;
}

export async function adminGetSitemapConfig() {
  const res = await apiGet<SeoDoc>("/seo/sitemap-config");
  return res.data;
}

export async function adminUpdateSitemapConfig(body: Record<string, unknown>) {
  const res = await apiPut<SeoDoc>("/seo/sitemap-config", body);
  return res.data;
}

export async function adminGenerateSitemaps() {
  const res = await apiPost<{ name: string; count: number }[]>("/seo/sitemaps/generate", {});
  return res.data;
}

export async function adminListRedirects(params?: Record<string, unknown>) {
  const res = await apiGet<SeoDoc[]>("/seo/redirects", params);
  return { items: res.data ?? [], meta: res.meta };
}

export async function adminCreateRedirect(body: Record<string, unknown>) {
  const res = await apiPost<SeoDoc>("/seo/redirects", body);
  return res.data;
}

export async function adminDeleteRedirect(id: string) {
  await apiDelete(`/seo/redirects/${id}`);
}

export async function adminList404(params?: Record<string, unknown>) {
  const res = await apiGet<SeoDoc[]>("/seo/404", params);
  return { items: res.data ?? [], meta: res.meta };
}

export async function adminGetSearchConsole() {
  const res = await apiGet<SeoDoc>("/seo/search-console");
  return res.data;
}

export async function adminUpdateSearchConsole(body: Record<string, unknown>) {
  const res = await apiPut<SeoDoc>("/seo/search-console", body);
  return res.data;
}

export async function adminGetAnalyticsConfig() {
  const res = await apiGet<SeoDoc>("/seo/analytics-config");
  return res.data;
}

export async function adminUpdateAnalyticsConfig(body: Record<string, unknown>) {
  const res = await apiPut<SeoDoc>("/seo/analytics-config", body);
  return res.data;
}

export async function adminListProgrammatic(params?: Record<string, unknown>) {
  const res = await apiGet<SeoDoc[]>("/seo/programmatic", params);
  return { items: res.data ?? [], meta: res.meta };
}

export async function adminSeedProgrammatic() {
  const res = await apiPost<{ count: number }>("/seo/programmatic/seed", {});
  return res.data;
}

export async function adminScoreEntity(type: "trek" | "blog" | "destination", id: string) {
  const res = await apiPost<{ score: Record<string, unknown> }>("/seo/score", { type, id });
  return res.data;
}

export async function adminUpsertSeoPage(body: Record<string, unknown>) {
  const res = await apiPut<SeoDoc>("/seo", body);
  return res.data;
}

export async function adminPatchRedirect(id: string, body: Record<string, unknown>) {
  const res = await apiPatch<SeoDoc>(`/seo/redirects/${id}`, body);
  return res.data;
}

/* ---------- AI SEO Engine ---------- */
export async function adminAiDashboard() {
  const res = await apiGet<Record<string, unknown>>("/seo/ai/dashboard");
  return res.data;
}

export async function adminRunSeoAudit() {
  const res = await apiPost<SeoDoc>("/seo/ai/audit", {});
  return res.data;
}

export async function adminListSeoAudits(params?: Record<string, unknown>) {
  const res = await apiGet<SeoDoc[]>("/seo/ai/audits", params);
  return { items: res.data ?? [], meta: res.meta };
}

export async function adminSuggestMeta(body: Record<string, unknown>) {
  const res = await apiPost<{
    suggestionId: string;
    requiresReview: boolean;
    suggestions: Record<string, unknown>;
  }>("/seo/ai/meta/suggest", body);
  return res.data;
}

export async function adminSuggestFaqs(body: Record<string, unknown>) {
  const res = await apiPost<{
    suggestionId: string;
    requiresReview: boolean;
    faqs: Array<{ question: string; answer: string }>;
  }>("/seo/ai/faq/suggest", body);
  return res.data;
}

export async function adminPreviewSchema(body: Record<string, unknown>) {
  const res = await apiPost<{ requiresReview: boolean; schemas: unknown[] }>("/seo/ai/schema/preview", body);
  return res.data;
}

export async function adminSuggestInternalLinks(body: Record<string, unknown>) {
  const res = await apiPost<{
    requiresReview: boolean;
    suggestions: Array<Record<string, unknown>>;
  }>("/seo/ai/internal-links/suggest", body);
  return res.data;
}

export async function adminSuggestRelated(body: Record<string, unknown>) {
  const res = await apiPost<Record<string, unknown>>("/seo/ai/related", body);
  return res.data;
}

export async function adminContentQuality(body: Record<string, unknown>) {
  const res = await apiPost<Record<string, unknown>>("/seo/ai/content-quality", body);
  return res.data;
}

export async function adminSuggestImageSeo(body: Record<string, unknown>) {
  const res = await apiPost<{
    requiresReview: boolean;
    suggestions: Record<string, string>;
  }>("/seo/ai/image/suggest", body);
  return res.data;
}

export async function adminBlogAssist(body: Record<string, unknown>) {
  const res = await apiPost<Record<string, unknown>>("/seo/ai/blog/assist", body);
  return res.data;
}

export async function adminLandingAssist(body: Record<string, unknown>) {
  const res = await apiPost<Record<string, unknown>>("/seo/ai/landing/assist", body);
  return res.data;
}

export async function adminTrekWorkflow(body: Record<string, unknown>) {
  const res = await apiPost<Record<string, unknown>>("/seo/ai/workflow/trek", body);
  return res.data;
}
