import { apiGet } from "@/lib/api/client";

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
};

export async function fetchDestinations() {
  const res = await apiGet<ApiDestination[]>("/destinations", { limit: 50 });
  return res.data ?? [];
}

export async function fetchDestinationBySlug(slug: string) {
  const res = await apiGet<ApiDestination>(`/destinations/${slug}`);
  return res.data;
}
