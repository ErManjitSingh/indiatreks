"use client";

import {
  ChevronDown,
  Clock3,
  Gauge,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { trekListingDestinations } from "@/data/treks";
import { useDebounce } from "@/hooks/use-debounce";
import { useUiStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { DifficultyLevel } from "@/types";
import type { TrekFiltersState } from "@/types/trek-listing";

interface AdvancedTrekSearchProps {
  filters: TrekFiltersState;
  onChange: (next: TrekFiltersState) => void;
  onReset: () => void;
}

const pillClass =
  "relative inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-[#d0d5cc] bg-white pl-3 pr-8 text-sm font-medium text-[#333] shadow-xs transition";

export function AdvancedTrekSearch({ filters, onChange, onReset }: AdvancedTrekSearchProps) {
  const update = (patch: Partial<TrekFiltersState>) => onChange({ ...filters, ...patch });
  const { setTrekFiltersOpen } = useUiStore();
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
    <section className="space-y-3" aria-label="Search and quick filters">
      <form
        className="flex items-center gap-2 rounded-full border border-[#d0d5cc] bg-white px-4 shadow-xs focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/15 md:rounded-xl md:px-3"
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

      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <QuickSelect
          icon={<MapPin className="h-3.5 w-3.5 text-[#2D5A27]" aria-hidden />}
          label="Destination"
          value={filters.destination[0] ?? "all"}
          onChange={(value) => update({ destination: value === "all" ? [] : [value] })}
          options={[
            { value: "all", label: "Any destination" },
            ...trekListingDestinations.map((item) => ({ value: item, label: item })),
          ]}
        />

        <QuickSelect
          icon={<Gauge className="h-3.5 w-3.5 text-[#2D5A27]" aria-hidden />}
          label="Difficulty"
          value={filters.difficulty[0] ?? "all"}
          onChange={(value) =>
            update({
              difficulty: value === "all" ? [] : [value as DifficultyLevel],
            })
          }
          options={[
            { value: "all", label: "Any difficulty" },
            { value: "easy", label: "Easy" },
            { value: "moderate", label: "Moderate" },
            { value: "difficult", label: "Difficult" },
            { value: "challenging", label: "Challenging" },
          ]}
        />

        <QuickSelect
          icon={<Clock3 className="h-3.5 w-3.5 text-[#2D5A27]" aria-hidden />}
          label="Duration"
          value={filters.duration[0] ?? "all"}
          onChange={(value) => update({ duration: value === "all" ? [] : [value] })}
          options={[
            { value: "all", label: "Any duration" },
            { value: "1-2", label: "1–2 Days" },
            { value: "3-4", label: "3–4 Days" },
            { value: "5-7", label: "5–7 Days" },
            { value: "8+", label: "8+ Days" },
          ]}
        />

        <button
          type="button"
          className={cn(pillClass, "pr-3")}
          onClick={() => setTrekFiltersOpen(true)}
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#2D5A27]" aria-hidden />
          More Filters
        </button>

        <button
          type="button"
          className={cn(pillClass, "hidden pr-3 text-muted-foreground md:inline-flex")}
          onClick={onReset}
        >
          Reset
        </button>
      </div>
    </section>
  );
}

function QuickSelect({
  icon,
  label,
  value,
  onChange,
  options,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  const active = value !== "all";

  return (
    <label
      className={cn(
        pillClass,
        active && "border-[#2D5A27]/40 bg-[#E8F5E9] text-[#2D5A27]",
      )}
    >
      {icon}
      <span>{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-muted-foreground"
        aria-hidden
      />
    </label>
  );
}
