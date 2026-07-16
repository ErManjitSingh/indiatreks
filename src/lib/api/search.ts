import { apiGet } from "@/lib/api/client";

export async function globalSearch(q: string) {
  const res = await apiGet<{
    treks: unknown[];
    destinations: unknown[];
    blogs: unknown[];
  }>("/search", { q });
  return res.data;
}
