import type { TrekDetail } from "@/types/trek-detail";

/**
 * Static trek details removed — use getTrekDetail() from @/services/treks.service.
 * These stubs keep older imports from breaking during the API-only migration.
 */

/** @deprecated Empty — trek details are loaded from the API. */
export const trekDetails: TrekDetail[] = [];

/** @deprecated Use getTrekDetail(slug) from services (async, API). */
export function getTrekDetailBySlug(_slug: string): TrekDetail | undefined {
  return undefined;
}

/** @deprecated Use getAllTrekSlugs() from @/services/treks.service. */
export function getAllTrekDetailSlugs(): string[] {
  return [];
}
