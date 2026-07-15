"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

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
 * Renders only visible trek cards (windowed). Keeps LCP/INP healthy on long result sets.
 */
export function VirtualizedTrekList({
  treks,
  view,
  showPromoAtIndex = 1,
}: VirtualizedTrekListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const isList = view === "list";

  const rowVirtualizer = useVirtualizer({
    count: treks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (isList ? 240 : 420),
    overscan: 3,
  });

  if (treks.length <= 8) {
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

  return (
    <div
      ref={parentRef}
      className="max-h-[min(160vh,1400px)] overflow-auto [-webkit-overflow-scrolling:touch]"
    >
      <div
        className="relative w-full"
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const trek = treks[virtualRow.index];
          if (!trek) return null;
          return (
            <div
              key={trek.id}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              className="absolute top-0 left-0 w-full pb-4"
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              <TrekListingCard trek={trek} view={view} />
              {virtualRow.index === showPromoAtIndex ? (
                <div className="mt-4 hidden md:block">
                  <TrekCollectionPromo />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
