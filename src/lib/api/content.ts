import { apiGet, getApiBaseUrl } from "@/lib/api/client";

export type SiteBootstrap = {
  site: {
    name?: string;
    shortName?: string;
    tagline?: string;
    description?: string;
    url?: string;
    logo?: string;
    phone?: string;
    email?: string;
    whatsapp?: string;
    social?: Record<string, string>;
    ogImage?: string;
    [key: string]: unknown;
  } | null;
  navigation: {
    main?: unknown;
    footer?: unknown;
    social?: unknown;
  } | null;
  homepage: Record<string, unknown> | null;
  trekFacets: Record<string, unknown> | null;
  imageMap: Record<string, string> | null;
  destinations?: unknown[];
  faqs?: unknown[];
  testimonials?: unknown[];
  blogs?: unknown[];
  media?: Array<{ url: string; alt?: string; publicId?: string }>;
  meta?: { trekCount?: number };
};

export async function fetchBootstrap(): Promise<SiteBootstrap | null> {
  try {
    // Prefer absolute fetch on server
    if (typeof window === "undefined") {
      const base = getApiBaseUrl();
      const res = await fetch(`${base}/content/bootstrap`, {
        next: { revalidate: 600, tags: ["bootstrap"] },
        headers: { Accept: "application/json" },
      });
      if (!res.ok) return null;
      const json = (await res.json()) as { data?: SiteBootstrap };
      return json.data ?? null;
    }
    const res = await apiGet<SiteBootstrap>("/content/bootstrap");
    return res.data ?? null;
  } catch {
    return null;
  }
}
