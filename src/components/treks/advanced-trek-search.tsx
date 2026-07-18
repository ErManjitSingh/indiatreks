"use client";

import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ChevronDown,
  Clock3,
  Headphones,
  MapPin,
  Mountain,
  RefreshCcw,
  Search,
  Shield,
  Wallet,
  Zap,
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

const featureRow = [
  { label: "Best Price Guarantee", icon: BadgeCheck },
  { label: "Certified Trek Leaders", icon: Shield },
  { label: "24x7 Support", icon: Headphones },
  { label: "Easy Cancellation", icon: RefreshCcw },
  { label: "Instant Booking", icon: Zap },
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
    () => (destinations.length ? destinations : [...heroSearchOptions.destinations]),
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

  const durationOptions = [
    "1–3 Days",
    "4–6 Days",
    "5–7 Days",
    "8+ Days",
    ...heroSearchOptions.durations,
  ];

  return (
    <div className="relative z-20 -mt-10 md:-mt-14 lg:-mt-16" id="trek-search">
      {/* —— Mobile search card (3×2 mockup) —— */}
      <div className="px-4 md:hidden">
        <form
          className="rounded-[1.25rem] bg-white p-3.5 shadow-[0_12px_32px_rgba(15,23,42,0.14)] ring-1 ring-black/[0.04]"
          onSubmit={(e) => {
            e.preventDefault();
            applySearch();
          }}
          aria-label="Search Himalayan treks"
        >
          <div className="grid grid-cols-3 gap-2">
            <MobileField
              icon={Search}
              label="Search Trek"
              placeholder="Any Trek"
              value={query}
              onChange={setQuery}
              type="text"
            />
            <MobileSelect
              icon={MapPin}
              label="Destination"
              placeholder="Any Destination"
              value={destination}
              onChange={setDestination}
              options={destinationOptions}
            />
            <MobileSelect
              icon={Clock3}
              label="Duration"
              placeholder="Any Duration"
              value={duration}
              onChange={setDuration}
              options={durationOptions}
            />
            <MobileSelect
              icon={Mountain}
              label="Difficulty"
              placeholder="Any Level"
              value={difficulty}
              onChange={setDifficulty}
              options={heroSearchOptions.difficulties}
            />
            <MobileSelect
              icon={CalendarDays}
              label="Month"
              placeholder="Any Month"
              value={month}
              onChange={setMonth}
              options={heroSearchOptions.months}
            />
            <MobileSelect
              icon={Wallet}
              label="Price Range"
              placeholder="Any Budget"
              value={budget}
              onChange={setBudget}
              options={heroSearchOptions.budgets}
            />
          </div>

          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2D5A27] py-3.5 text-[14px] font-bold !text-white"
          >
            Search Treks
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </form>

        <ul className="mt-7 flex justify-between gap-1 px-0.5 pb-1">
          {featureRow.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label} className="flex w-[18%] flex-col items-center text-center">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF2EC] text-[#2D5A27] shadow-sm ring-1 ring-[#e0e8de]">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <p className="mt-1.5 text-[9px] leading-tight font-medium text-[#4B5563]">
                  {item.label}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* —— Desktop search bar —— */}
      <Container className="hidden md:block">
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

            <DesktopSelect
              icon={MapPin}
              label="Destination"
              placeholder="Any"
              value={destination}
              onChange={setDestination}
              options={destinationOptions}
              className="lg:border-l lg:border-[#e8ece6]"
            />
            <DesktopSelect
              icon={Clock3}
              label="Duration"
              placeholder="Any"
              value={duration}
              onChange={setDuration}
              options={durationOptions}
              className="sm:border-l sm:border-[#e8ece6]"
            />
            <DesktopSelect
              icon={Mountain}
              label="Difficulty"
              placeholder="Any"
              value={difficulty}
              onChange={setDifficulty}
              options={heroSearchOptions.difficulties}
              className="lg:border-l lg:border-[#e8ece6]"
            />
            <DesktopSelect
              icon={CalendarDays}
              label="Month"
              placeholder="Any"
              value={month}
              onChange={setMonth}
              options={heroSearchOptions.months}
              className="sm:border-l sm:border-[#e8ece6]"
            />
            <DesktopSelect
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
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2D5A27] px-4 py-3 text-xs font-extrabold !text-white transition hover:bg-[#244820] sm:text-sm lg:min-w-[9.5rem]"
              >
                Search Treks
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-[#e8ece6] bg-[#eef5e6] px-4 py-2.5 md:px-5">
            {featureRow.map((item) => {
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

function MobileField({
  icon: Icon,
  label,
  placeholder,
  value,
  onChange,
}: {
  icon: LucideIcon;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="flex min-h-[4.5rem] flex-col rounded-xl bg-[#F6F7F5] px-2 py-2">
      <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#6B7668]">
        <Icon className="h-3 w-3 text-[#2D5A27]" aria-hidden />
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full bg-transparent text-[11px] font-semibold text-[#14201a] outline-none placeholder:font-medium placeholder:text-[#9AA39A]"
        aria-label={label}
      />
    </label>
  );
}

function MobileSelect({
  icon: Icon,
  label,
  placeholder,
  value,
  onChange,
  options,
}: {
  icon: LucideIcon;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  const unique = [...new Set(options)];
  return (
    <label className="relative flex min-h-[4.5rem] flex-col rounded-xl bg-[#F6F7F5] px-2 py-2">
      <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#6B7668]">
        <Icon className="h-3 w-3 text-[#2D5A27]" aria-hidden />
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full appearance-none bg-transparent pr-3 text-[11px] font-semibold text-[#14201a] outline-none"
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
        className="pointer-events-none absolute right-2 bottom-2.5 h-3 w-3 text-[#9AA39A]"
        aria-hidden
      />
    </label>
  );
}

function DesktopSelect({
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
