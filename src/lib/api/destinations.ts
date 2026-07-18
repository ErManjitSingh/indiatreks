import { apiGet, type ApiSuccess } from "@/lib/api/client";
import { cachedApiGet } from "@/lib/api/cached-fetch";

export type ApiDestination = {
  _id?: string;
  slug: string;
  name: string;
  region: string;
  state: string;
  summary: string;
  description?: string;
  coverImage?: string;
  trekCount?: number;
  bestSeasons?: string[];
  highlights?: string[];
  weatherNotes?: string;
  howToReach?: string;
  faqs?: Array<{ question: string; answer: string }>;
  seo?: Record<string, unknown>;
};

async function publicGet<T>(path: string, params?: Record<string, unknown>): Promise<ApiSuccess<T>> {
  if (typeof window === "undefined") {
    return cachedApiGet<T>(path, { params, revalidate: 600, tags: ["destinations"] });
  }
  return apiGet<T>(path, params);
}

export async function fetchDestinations() {
  const res = await publicGet<ApiDestination[]>("/destinations", { limit: 50 });
  return res.data ?? [];
}

export async function fetchDestinationBySlug(slug: string) {
  const res = await publicGet<ApiDestination>(`/destinations/${slug}`);
  return res.data;
}
