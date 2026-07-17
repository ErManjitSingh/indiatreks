import { apiGet, apiPut, apiPost, apiPatch, apiDelete, type ApiSuccess } from "@/lib/api/client";

export type SeoCenterDoc = Record<string, unknown> & { _id?: string };

export async function centerDashboard() {
  const res = await apiGet<Record<string, unknown>>("/seo/center/dashboard");
  return res.data;
}

export async function centerIntegrations() {
  const res = await apiGet<Record<string, unknown>>("/seo/center/integrations");
  return res.data;
}

export async function centerUpdateIntegrations(body: Record<string, unknown>) {
  const res = await apiPut<Record<string, unknown>>("/seo/center/integrations", body);
  return res.data;
}

export async function centerGoogleStatus() {
  const res = await apiGet<Record<string, unknown>>("/auth/google/status");
  return res.data;
}

export async function centerGoogleConnect() {
  const res = await apiGet<{ url: string }>("/auth/google");
  return res.data;
}

export async function centerGoogleDisconnect() {
  const res = await apiPost<{ connected: boolean }>("/auth/google/disconnect", {});
  return res.data;
}

export async function centerGscDashboard(params?: { days?: number; sync?: string }) {
  const res = await apiGet<Record<string, unknown>>("/seo/center/gsc/dashboard", params);
  return res.data;
}

export async function centerGscSync(days = 28) {
  const res = await apiPost<Record<string, unknown>>("/seo/center/gsc/sync", { days });
  return res.data;
}

export async function centerGscSites() {
  const res = await apiGet<unknown[]>("/seo/center/gsc/sites");
  return res.data;
}

export async function centerGscSubmitSitemap(url: string) {
  const res = await apiPost<Record<string, unknown>>("/seo/center/gsc/sitemaps/submit", { url });
  return res.data;
}

export async function centerGscInspect(url: string) {
  const res = await apiPost<Record<string, unknown>>("/seo/center/gsc/inspect", { url });
  return res.data;
}

export async function centerGaDashboard(params?: { days?: number; sync?: string }) {
  const res = await apiGet<Record<string, unknown>>("/seo/center/ga/dashboard", params);
  return res.data;
}

export async function centerGaSync(days = 28) {
  const res = await apiPost<Record<string, unknown>>("/seo/center/ga/sync", { days });
  return res.data;
}

export async function centerCwv(params?: { strategy?: string }) {
  const res = await apiGet<Record<string, unknown>>("/seo/center/cwv", params);
  return res.data;
}

export async function centerCwvRun(body?: { url?: string; strategy?: string }) {
  const res = await apiPost<Record<string, unknown>>("/seo/center/cwv/run", body || {});
  return res.data;
}

export async function centerListKeywords(params?: Record<string, unknown>) {
  const res = await apiGet<SeoCenterDoc[]>("/seo/center/keywords", params);
  return { items: res.data ?? [], meta: res.meta };
}

export async function centerCreateKeyword(body: Record<string, unknown>) {
  const res = await apiPost<SeoCenterDoc>("/seo/center/keywords", body);
  return res.data;
}

export async function centerUpdateKeyword(id: string, body: Record<string, unknown>) {
  const res = await apiPatch<SeoCenterDoc>(`/seo/center/keywords/${id}`, body);
  return res.data;
}

export async function centerDeleteKeyword(id: string) {
  await apiDelete(`/seo/center/keywords/${id}`);
}

export async function centerSyncKeywordsGsc() {
  const res = await apiPost<Record<string, unknown>>("/seo/center/keywords/sync-gsc", {});
  return res.data;
}

export async function centerRunAudit() {
  const res = await apiPost<SeoCenterDoc>("/seo/center/audit/run", {});
  return res.data;
}

export async function centerRobotsPreview() {
  const res = await apiGet<{ config: SeoCenterDoc; preview: string }>("/seo/center/robots/preview");
  return res.data;
}

export async function centerGenerateSitemaps() {
  const res = await apiPost<unknown[]>("/seo/center/sitemaps/generate", {});
  return res.data;
}

export async function centerExportRedirects() {
  const res = await apiGet<Array<Record<string, unknown>>>("/seo/center/redirects/export");
  return res.data;
}

export async function centerImportRedirects(items: Array<Record<string, unknown>>) {
  const res = await apiPost<Record<string, unknown>>("/seo/center/redirects/import", { items });
  return res.data;
}

export async function centerIgnore404(id: string) {
  const res = await apiPatch<SeoCenterDoc>(`/seo/center/404/${id}/ignore`, {});
  return res.data;
}

export async function centerDelete404(id: string) {
  await apiDelete(`/seo/center/404/${id}`);
}

export type { ApiSuccess };
