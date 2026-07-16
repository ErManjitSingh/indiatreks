"use client";

import {
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import type { TrekFiltersState } from "@/types/trek-listing";

interface AdvancedTrekSearchProps {
  filters: TrekFiltersState;
  onChange: (next: TrekFiltersState) => void;
  onReset: () => void;
}

export function AdvancedTrekSearch({ filters, onChange }: AdvancedTrekSearchProps) {
  const update = (patch: Partial<TrekFiltersState>) => onChange({ ...filters, ...patch });
  const [query, setQuery] = useState(filters.q);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    setQuery(filters.q);
  }, [filters.q]);

  useEffect(() => {
    if (debouncedQuery.trim() === filters.q) return;
    update({ q: debouncedQuery.trim() });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync URL only when debounced value changes
  }, [debouncedQuery]);

  return (
    <section aria-label="Search treks">
      <form
        className="flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 shadow-[0_4px_16px_rgba(17,24,39,0.06)] focus-within:border-[#22C55E]/45 focus-within:ring-2 focus-within:ring-[#22C55E]/15 md:rounded-2xl md:px-4"
        onSubmit={(event) => {
          event.preventDefault();
          update({ q: query.trim() });
        }}
      >
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        <label className="sr-only" htmlFor="treks-listing-search">
          Search trek, destination or adventure
        </label>
        <input
          id="treks-listing-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => {
            if (query.trim() !== filters.q) update({ q: query.trim() });
          }}
          placeholder="Search trek, destination or adventure..."
          className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/80 md:h-12"
        />
        {query ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() => {
              setQuery("");
              update({ q: "" });
            }}
          >
            Clear
          </Button>
        ) : null}
      </form>
    </section>
  );
}
