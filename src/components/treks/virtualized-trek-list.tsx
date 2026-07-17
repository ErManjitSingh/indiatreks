"use client";

import { TrekListingCard } from "@/components/treks/trek-listing-card";
import type { TrekListingItem, TrekViewMode } from "@/types/trek-listing";
import { cn } from "@/lib/utils";

interface VirtualizedTrekListProps {
  treks: TrekListingItem[];
  view: TrekViewMode;
}

/**
 * Plain document-flow list — no nested overflow scrollport.
 */
export function VirtualizedTrekList({ treks, view }: VirtualizedTrekListProps) {
  const isList = view === "list";

  return (
    <div
      className={cn(
        isList
          ? "space-y-3.5 md:space-y-4"
          : "grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3",
      )}
    >
      {treks.map((trek) => (
        <TrekListingCard key={trek.id} trek={trek} view={view} />
      ))}
    </div>
  );
}
