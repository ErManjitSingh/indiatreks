"use client";

import { Filter, Grid2X2, List, Map as MapIcon, Scale } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { TrekSortOption, TrekViewMode } from "@/types/trek-listing";
import { cn } from "@/lib/utils";

interface TreksToolbarProps {
  resultsCount: number;
  view: TrekViewMode;
  sort: TrekSortOption;
  compareCount?: number;
  onViewChange: (view: TrekViewMode) => void;
  onSortChange: (sort: TrekSortOption) => void;
  onOpenCompare?: () => void;
  className?: string;
}

export function TreksToolbar({
  resultsCount,
  view,
  sort,
  compareCount = 0,
  onViewChange,
  onSortChange,
  onOpenCompare,
  className,
}: TreksToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-[#E5EBE3] bg-white px-3.5 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="inline-flex items-center gap-2 text-sm text-[#6B7668] md:text-[15px]">
        <Filter className="h-4 w-4 text-[#2D5A27]" aria-hidden />
        <span>
          Showing{" "}
          <span className="font-heading font-bold text-[#122016]">{resultsCount}</span> Treks
        </span>
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex items-center gap-2 text-sm text-[#6B7668]">
          <span className="hidden sm:inline">Sort by:</span>
          <select
            aria-label="Sort treks"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as TrekSortOption)}
            className="h-9 rounded-lg border border-[#D8E2D4] bg-white px-2.5 text-sm font-semibold text-[#314034] outline-none focus:border-[#2D5A27]/40"
          >
            <option value="popularity">Popularity</option>
            <option value="newest">Newest</option>
            <option value="rating">Rating</option>
            <option value="price-asc">Price Low</option>
            <option value="price-desc">Price High</option>
            <option value="duration">Duration</option>
          </select>
        </label>

        <div className="flex rounded-lg border border-[#D8E2D4] bg-[#F7F8F6] p-0.5">
          {(
            [
              { id: "grid" as const, label: "Grid view", icon: Grid2X2 },
              { id: "list" as const, label: "List view", icon: List },
              { id: "map" as const, label: "Map view", icon: MapIcon },
            ] as const
          ).map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                type="button"
                size="icon"
                variant="ghost"
                aria-label={item.label}
                aria-pressed={view === item.id}
                className={cn(
                  "h-8 w-8 rounded-md",
                  view === item.id &&
                    "bg-white text-[#2D5A27] shadow-sm hover:bg-white hover:text-[#2D5A27]",
                )}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="h-4 w-4" />
              </Button>
            );
          })}
        </div>

        {onOpenCompare ? (
          <button
            type="button"
            onClick={onOpenCompare}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#D8E2D4] bg-white px-3 text-sm font-semibold text-[#314034] transition hover:bg-[#F4F8F2]"
          >
            <Scale className="h-3.5 w-3.5 text-[#2D5A27]" aria-hidden />
            Compare
            {compareCount > 0 ? (
              <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#2D5A27] px-1 text-[10px] font-bold text-white">
                {compareCount}
              </span>
            ) : null}
          </button>
        ) : null}
      </div>
    </div>
  );
}
