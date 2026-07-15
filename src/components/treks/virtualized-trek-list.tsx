"use client";

import { TrekListingCard } from "@/components/treks/trek-listing-card";
import { TrekCollectionPromo } from "@/components/treks/trek-collection-promo";
import type { TrekListingItem, TrekViewMode } from "@/types/trek-listing";
import { cn } from "@/lib/utils";

interface VirtualizedTrekListProps {
  treks: TrekListingItem[];
  view: TrekViewMode;
  showPromoAtIndex?: number;
}

/**
 * Plain document-flow list — no nested overflow scrollport.
 * Nested max-height scroll made the header + search look “fixed” on mobile.
 */
export function VirtualizedTrekList({
  treks,
  view,
  showPromoAtIndex = 1,
}: VirtualizedTrekListProps) {
  const isList = view === "list";

  return (
    <div className={cn(isList ? "space-y-4" : "grid gap-4 md:grid-cols-2")}>
      {treks.map((trek, index) => (
        <div key={trek.id} className="space-y-4">
          <TrekListingCard trek={trek} view={view} />
          {index === showPromoAtIndex ? (
            <div className="hidden md:block">
              <TrekCollectionPromo />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
