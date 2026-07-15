import type { Trek } from "@/types";

export async function getFeaturedTreks(): Promise<Trek[]> {
  // Data layer ready for CMS / API wiring in later phases.
  return [];
}

export async function getTrekBySlug(_slug: string): Promise<Trek | null> {
  return null;
}

export async function searchTreks(_query: string): Promise<Trek[]> {
  return [];
}
