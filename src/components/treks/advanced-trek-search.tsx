"use client";

import {
  BadgeCheck,
  CalendarDays,
  ChevronDown,
  Clock3,
  Headphones,
  MapPin,
  Mountain,
  Search,
  Shield,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Container } from "@/components/ui/container";
import { useDebounce } from "@/hooks/use-debounce";
import { budgetLabelToPriceRange } from "@/lib/trek-filters";
import { useSiteContent } from "@/providers/site-content-provider";
import { cn } from "@/lib/utils";
import type { DifficultyLevel } from "@/types";
import type { TrekFiltersState } from "@/types/trek-listing";

const guarantees = [
  { label: "Best Price Guarantee", icon: BadgeCheck },
  { label: "Certified Trek Leaders", icon: Shield },
  { label: "Medical Support", icon: Headphones },
  { label: "24x7 Customer Support", icon: Headphones },
  { label: "Easy Cancellation", icon: Wallet },
  { label: "Instant Booking", icon: BadgeCheck },
];

interface AdvancedTrekSearchProps {
  filters: TrekFiltersState;
  onChange: (next: TrekFiltersState) => void;
  onReset: () => void;
  destinations?: string[];
}

function durationToBuckets(label: string): string[] {
  if (label.startsWith("2") || label.includes("1-3") || label.includes("1–3")) return ["1-2"];
  if (label.startsWith("4") || label.includes("4-6") || label.includes("4–6")) return ["3-4"];
  if (label.startsWith("7") || label.includes("5-7")) return ["5-7"];
  if (label.startsWith("10") || label.includes("8+")) return ["8+"];
  return [];
}

export function AdvancedTrekSearch({
  filters,
  onChange,
  destinations = [],
}: AdvancedTrekSearchProps) {
  const { heroSearchOptions } = useSiteContent();
  const [query, setQuery] = useState(filters.q);
  const debouncedQuery = useDebounce(query, 300);

  const [destination, setDestination] = useState<string>(filters.destination[0] || "");
  const [difficulty, setDifficulty] = useState<string>(filters.difficulty[0] || "");
  const [duration, setDuration] = useState<string>(filters.duration[0] || "");
  const [month, setMonth] = useState<string>(filters.month[0] || "");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    setQuery(filters.q);
    setDestination(filters.destination[0] || "");
    setDifficulty(filters.difficulty[0] || "");
    setDuration(filters.duration[0] || "");
    setMonth(filters.month[0] || "");
  }, [filters.q, filters.destination, filters.difficulty, filters.duration, filters.month]);

  useEffect(() => {
    if (debouncedQuery.trim() === filters.q) return;
    onChange({ ...filters, q: debouncedQuery.trim() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const destinationOptions = useMemo(
    () =>
      destinations.length
        ? destinations
        : [...heroSearchOptions.destinations],
    [destinations, heroSearchOptions.destinations],
  );

  const applySearch = () => {
    const range = budget ? budgetLabelToPriceRange(budget) : {};
    const durationBuckets = durationToBuckets(duration);
    onChange({
      ...filters,
      q: query.trim(),
      destination: destination ? [destination] : [],
      difficulty: difficulty ? [difficulty.toLowerCase() as DifficultyLevel] : [],
      duration: durationBuckets.length ? durationBuckets : duration ? [duration] : [],
      month: month ? [month] : [],
      priceMin: range.priceMin ?? filters.priceMin,
      priceMax: range.priceMax ?? filters.priceMax,
    });
    document.getElementById("trek-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative z-20 -mt-10 md:-mt-16 lg:-mt-20">
      <Container>
        <form
          className="overflow-hidden rounded-2xl border border-[#e4e9df] bg-white text-[#14201a] shadow-[0_20px_48px_rgba(15,23,42,0.14)]"
          onSubmit={(e) => {
            e.preventDefault();
            applySearch();
          }}
          aria-label="Search Himalayan treks"
        >
          <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr_1fr_1fr_1fr_1fr_auto]">
            <label className="relative flex min-w-0 flex-col gap-0.5 border-b border-[#e8ece6] px-3.5 py-3 lg:border-b-0">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.14em] text-[#6b7668] uppercase sm:text-[10px]">
                <Search className="h-3.5 w-3.5 text-[#6b8f3c]" aria-hidden />
                Search Trek
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Triund, Kedarkantha…"
                className="h-7 w-full bg-transparent text-xs font-semibold text-[#14201a] outline-none placeholder:text-[#9aa39a] sm:text-sm"
                aria-label="Search trek"
              />
            </label>

            <SearchSelect
              icon={MapPin}
              label="Destination"
              placeholder="Any"
              value={destination}
              onChange={setDestination}
              options={destinationOptions}
              className="lg:border-l lg:border-[#e8ece6]"
            />
            <SearchSelect
              icon={Clock3}
              label="Duration"
              placeholder="Any"
              value={duration}
              onChange={setDuration}
              options={["1–3 Days", "4–6 Days", "5–7 Days", "8+ Days", ...heroSearchOptions.durations]}
              className="sm:border-l sm:border-[#e8ece6]"
            />
            <SearchSelect
              icon={Mountain}
              label="Difficulty"
              placeholder="Any"
              value={difficulty}
              onChange={setDifficulty}
              options={heroSearchOptions.difficulties}
              className="lg:border-l lg:border-[#e8ece6]"
            />
            <SearchSelect
              icon={CalendarDays}
              label="Month"
              placeholder="Any"
              value={month}
              onChange={setMonth}
              options={heroSearchOptions.months}
              className="sm:border-l sm:border-[#e8ece6]"
            />
            <SearchSelect
              icon={Wallet}
              label="Price Range"
              placeholder="Any"
              value={budget}
              onChange={setBudget}
              options={heroSearchOptions.budgets}
              className="lg:border-l lg:border-[#e8ece6]"
            />

            <div className="flex items-stretch p-2.5 sm:col-span-2 lg:col-span-1 lg:p-3">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2D5A27] px-4 py-3 text-xs font-extrabold text-white transition hover:bg-[#244820] sm:text-sm lg:min-w-[9.5rem]"
              >
                Search Treks
                <Search className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-[#e8ece6] bg-[#eef5e6] px-4 py-2.5 md:px-5">
            {guarantees.map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#3d4a3a] sm:text-[11px]"
                >
                  <Icon className="h-3.5 w-3.5 text-[#6b8f3c]" aria-hidden />
                  {item.label}
                </span>
              );
            })}
          </div>
        </form>
      </Container>
    </div>
  );
}

function SearchSelect({
  icon: Icon,
  label,
  placeholder,
  value,
  onChange,
  options,
  className,
}: {
  icon: LucideIcon;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  className?: string;
}) {
  const unique = [...new Set(options)];
  return (
    <label
      className={cn(
        "relative flex min-w-0 cursor-pointer flex-col gap-0.5 border-b border-[#e8ece6] px-3.5 py-3 lg:border-b-0",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.14em] text-[#6b7668] uppercase sm:text-[10px]">
        <Icon className="h-3.5 w-3.5 text-[#6b8f3c]" aria-hidden />
        {label}
      </span>
      <span className="relative">
        <select
          className="h-7 w-full appearance-none bg-transparent pr-5 text-xs font-semibold text-[#14201a] outline-none sm:text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
        >
          <option value="">{placeholder}</option>
          {unique.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-0 h-3.5 w-3.5 -translate-y-1/2 text-[#8a939c]"
          aria-hidden
        />
      </span>
    </label>
  );
}
