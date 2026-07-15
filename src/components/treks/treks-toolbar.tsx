"use client";

import { Filter, Grid2X2, List } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { TrekViewMode } from "@/types/trek-listing";
import { cn } from "@/lib/utils";

interface TreksToolbarProps {
  resultsCount: number;
  view: TrekViewMode;
  onViewChange: (view: TrekViewMode) => void;
  className?: string;
}

export function TreksToolbar({
  resultsCount,
  view,
  onViewChange,
  className,
}: TreksToolbarProps) {
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <p className="inline-flex items-center gap-2 text-sm text-muted-foreground md:text-base">
        <Filter className="h-4 w-4 text-[#2D5A27] md:hidden" aria-hidden />
        <span>
          Showing{" "}
          <span className="font-heading font-bold text-foreground">{resultsCount}</span> Treks
        </span>
      </p>

      <div className="flex rounded-lg border border-border bg-white p-0.5">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label="Grid view"
          aria-pressed={view === "grid"}
          className={cn(
            "h-9 w-9 rounded-md",
            view === "grid" && "bg-[#E8F5E9] text-[#2D5A27] hover:bg-[#E8F5E9] hover:text-[#2D5A27]",
          )}
          onClick={() => onViewChange("grid")}
        >
          <Grid2X2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label="List view"
          aria-pressed={view === "list"}
          className={cn(
            "h-9 w-9 rounded-md",
            view === "list" && "bg-[#E8F5E9] text-[#2D5A27] hover:bg-[#E8F5E9] hover:text-[#2D5A27]",
          )}
          onClick={() => onViewChange("list")}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
