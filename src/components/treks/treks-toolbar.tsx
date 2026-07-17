"use client";

import { Filter, Grid2X2, Map as MapIcon, Scale } from "lucide-react";

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
  onOpenFilters?: () => void;
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
  onOpenFilters,
  className,
}: TreksToolbarProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Mobile toolbar */}
      <div className="md:hidden">
        <div className="flex items-center gap-2">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Sort treks</span>
            <select
              aria-label="Sort treks"
              value={sort}
              onChange={(event) => onSortChange(event.target.value as TrekSortOption)}
              className="h-10 w-full appearance-none rounded-xl border border-[#E5E7EB] bg-white px-3 pr-8 text-[13px] font-semibold text-[#314034] outline-none"
            >
              <option value="popularity">Sort: Popularity</option>
              <option value="newest">Sort: Newest</option>
              <option value="rating">Sort: Rating</option>
              <option value="price-asc">Sort: Price Low</option>
              <option value="price-desc">Sort: Price High</option>
              <option value="duration">Sort: Duration</option>
            </select>
          </label>

          <div className="flex shrink-0 rounded-xl border border-[#E5E7EB] bg-white p-0.5">
            {(
              [
                { id: "grid" as const, label: "Grid", icon: Grid2X2 },
                { id: "map" as const, label: "Map", icon: MapIcon },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              const active = view === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.label}
                  aria-pressed={active}
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "inline-flex h-9 items-center gap-1 rounded-lg px-2.5 text-[11px] font-semibold",
                    active ? "bg-[#2D5A27] text-white" : "text-[#6B7668]",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {item.label}
                </button>
              );
            })}
          </div>

          {onOpenCompare ? (
            <button
              type="button"
              onClick={onOpenCompare}
              className="inline-flex h-10 shrink-0 items-center gap-1 rounded-xl border border-[#E5E7EB] bg-white px-2.5 text-[11px] font-semibold text-[#314034]"
            >
              <Scale className="h-3.5 w-3.5 text-[#2D5A27]" aria-hidden />
              Compare ({compareCount})
            </button>
          ) : null}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-[13px] text-[#6B7668]">
            Showing{" "}
            <span className="font-heading font-bold text-[#122016]">{resultsCount}</span> Treks
          </p>
          {onOpenFilters ? (
            <button
              type="button"
              onClick={onOpenFilters}
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#2D5A27]"
            >
              <Filter className="h-3.5 w-3.5" aria-hidden />
              Filters
            </button>
          ) : null}
        </div>
      </div>

      {/* Desktop toolbar */}
      <div className="hidden flex-col gap-3 rounded-xl border border-[#E5EBE3] bg-white px-3.5 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between md:flex">
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
    </div>
  );
}
