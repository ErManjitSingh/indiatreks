import { getApiBaseUrl, type ApiSuccess } from "@/lib/api/client";

type CachedFetchOptions = {
  /** ISR revalidate seconds (default 600). */
  revalidate?: number | false;
  tags?: string[];
  params?: Record<string, unknown>;
};

function buildUrl(path: string, params?: Record<string, unknown>) {
  const base = getApiBaseUrl().replace(/\/$/, "");
  const url = new URL(`${base}${path.startsWith("/") ? path : `/${path}`}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value == null || value === "") continue;
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

/**
 * Server-side GET that participates in Next.js Data Cache / ISR tags.
 * Prefer this over axios for public SSR reads.
 */
export async function cachedApiGet<T>(
  path: string,
  options: CachedFetchOptions = {},
): Promise<ApiSuccess<T>> {
  const { revalidate = 600, tags, params } = options;
  const res = await fetch(buildUrl(path, params), {
    headers: { Accept: "application/json" },
    ...(revalidate === false
      ? { cache: "no-store" as const }
      : { next: { revalidate, tags } }),
  });

  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status}`);
  }

  return (await res.json()) as ApiSuccess<T>;
}
