"use client";

import { Columns2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCompareStore, useUiStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function CompareBar() {
  const trekIds = useCompareStore((state) => state.trekIds);
  const clear = useCompareStore((state) => state.clear);
  const setTrekCompareOpen = useUiStore((state) => state.setTrekCompareOpen);

  if (trekIds.length === 0) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-20 z-40 mx-auto flex w-[min(92vw,36rem)] items-center justify-between gap-3 rounded-2xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur-xl md:bottom-6",
      )}
      role="status"
    >
      <p className="text-sm font-medium">
        <span className="font-heading font-bold">{trekIds.length}</span> treks selected
      </p>
      <div className="flex gap-2">
        <Button type="button" variant="ghost" size="sm" onClick={clear}>
          Clear
        </Button>
        <Button type="button" variant="primary" size="sm" onClick={() => setTrekCompareOpen(true)}>
          <Columns2 className="h-4 w-4" aria-hidden />
          Compare
        </Button>
      </div>
    </div>
  );
}
