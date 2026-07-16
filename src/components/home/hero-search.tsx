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
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type ComponentType } from "react";

import { Container } from "@/components/ui/container";
import { budgetLabelToPriceRange } from "@/lib/trek-filters";
import { useSiteContent } from "@/providers/site-content-provider";
import { cn } from "@/lib/utils";

const guarantees = [
  { label: "Best Price Guarantee", icon: BadgeCheck },
  { label: "No Hidden Costs", icon: Wallet },
  { label: "Expert Local Guides", icon: Shield },
  { label: "24x7 Support", icon: Headphones },
];

export function HeroSearch() {
  const router = useRouter();
  const { heroSearchOptions } = useSiteContent();
  const [destination, setDestination] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [month, setMonth] = useState("");
  const [budget, setBudget] = useState("");

  const onSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (difficulty) params.set("difficulty", difficulty.toLowerCase());
    if (duration) {
      // Map hero labels onto trek duration filter buckets
      if (duration.startsWith("2")) params.set("duration", "1-2,3-4");
      else if (duration.startsWith("4")) params.set("duration", "3-4,5-7");
      else if (duration.startsWith("7")) params.set("duration", "5-7,8+");
      else if (duration.startsWith("10")) params.set("duration", "8+");
    }
    if (month) params.set("month", month);
    if (budget) {
      const range = budgetLabelToPriceRange(budget);
      if (range.priceMin != null) params.set("priceMin", String(range.priceMin));
      if (range.priceMax != null) params.set("priceMax", String(range.priceMax));
    }
    router.push(`/treks${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const fields = {
    destination,
    setDestination,
    difficulty,
    setDifficulty,
    duration,
    setDuration,
    month,
    setMonth,
    budget,
    setBudget,
  };

  return (
    <>
      {/* —— Mobile only (mockup white card) —— */}
      <div className="relative z-20 -mt-10 px-4 md:hidden">
        <form
          className="rounded-2xl bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.12)] ring-1 ring-black/[0.04]"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
          aria-label="Find your perfect trek"
        >
          <p className="mb-3 inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-[0.14em] text-[#1B3022] uppercase">
            <Mountain className="h-3.5 w-3.5 text-[#6b8f3c]" aria-hidden />
            Find Your Perfect Trek
          </p>

          <div className="space-y-2.5">
            <MobileField
              icon={MapPin}
              label="Destination"
              placeholder="Where to?"
              value={destination}
              onChange={setDestination}
              options={heroSearchOptions.destinations}
            />
            <MobileField
              icon={Mountain}
              label="Difficulty"
              placeholder="Level"
              value={difficulty}
              onChange={setDifficulty}
              options={heroSearchOptions.difficulties}
            />
            <MobileField
              icon={Clock3}
              label="Duration"
              placeholder="Duration"
              value={duration}
              onChange={setDuration}
              options={heroSearchOptions.durations}
            />
            <MobileField
              icon={CalendarDays}
              label="Month"
              placeholder="When"
              value={month}
              onChange={setMonth}
              options={heroSearchOptions.months}
            />
            <MobileField
              icon={Wallet}
              label="Budget"
              placeholder="Budget"
              value={budget}
              onChange={setBudget}
              options={heroSearchOptions.budgets}
            />
          </div>

          <button
            type="submit"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#d0d5cc] bg-white px-4 py-3.5 text-sm font-extrabold text-[#1A1A1A] shadow-sm hover:bg-[#F7F8F6]"
          >
            <Search className="h-4 w-4" aria-hidden />
            Search Treks
          </button>
        </form>
      </div>

      {/* —— Desktop / tablet (white mockup bar) —— */}
      <Container className="relative z-20 -mt-28 hidden md:block lg:-mt-32">
        <form
          className="overflow-hidden rounded-2xl border border-[#e4e9df] bg-white text-[#14201a] shadow-[0_20px_48px_rgba(15,23,42,0.14)] md:rounded-[1.25rem]"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
          aria-label="Find your trek"
        >
          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]">
            <DesktopField
              icon={MapPin}
              label="Destination"
              placeholder="Where to?"
              value={fields.destination}
              onChange={fields.setDestination}
              options={heroSearchOptions.destinations}
            />
            <DesktopField
              icon={Mountain}
              label="Difficulty"
              placeholder="Level"
              value={fields.difficulty}
              onChange={fields.setDifficulty}
              options={heroSearchOptions.difficulties}
              className="sm:border-l sm:border-[#e8ece6]"
            />
            <DesktopField
              icon={Clock3}
              label="Duration"
              placeholder="Duration"
              value={fields.duration}
              onChange={fields.setDuration}
              options={heroSearchOptions.durations}
              className="lg:border-l lg:border-[#e8ece6]"
            />
            <DesktopField
              icon={CalendarDays}
              label="Month"
              placeholder="When"
              value={fields.month}
              onChange={fields.setMonth}
              options={heroSearchOptions.months}
              className="sm:border-l sm:border-[#e8ece6] lg:border-l"
            />
            <DesktopField
              icon={Wallet}
              label="Budget"
              placeholder="Budget"
              value={fields.budget}
              onChange={fields.setBudget}
              options={heroSearchOptions.budgets}
              className="lg:border-l lg:border-[#e8ece6]"
            />

            <div className="flex items-stretch p-2.5 sm:col-span-2 lg:col-span-1 lg:p-3">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#244820] bg-[#2D5A27] px-4 py-3 text-xs font-extrabold !text-white transition hover:bg-[#244820] sm:text-sm lg:min-w-[10rem]"
              >
                <Search className="h-3.5 w-3.5" aria-hidden />
                Find Your Trek
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-t border-[#e8ece6] bg-[#eef5e6] px-4 py-2.5 md:px-5">
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
    </>
  );
}

function MobileField({
  icon: Icon,
  label,
  placeholder,
  value,
  onChange,
  options,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <label className="relative flex items-center gap-2.5 rounded-xl border border-[#e5e7eb] bg-[#f8faf8] px-3 py-2.5">
      <Icon className="h-4 w-4 shrink-0 text-[#6b8f3c]" aria-hidden />
      <span className="sr-only">{label}</span>
      <select
        className="h-7 w-full appearance-none bg-transparent pr-6 text-[13px] font-semibold text-[#14201a] outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      >
        <option value="">{placeholder}</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#8a939c]"
        aria-hidden
      />
    </label>
  );
}

function DesktopField({
  icon: Icon,
  label,
  placeholder,
  value,
  onChange,
  options,
  className,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  className?: string;
}) {
  return (
    <label
      className={cn(
        "relative flex min-w-0 cursor-pointer flex-col gap-0.5 border-b border-[#e8ece6] px-3.5 py-3 sm:py-3.5 lg:border-b-0",
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
          {options.map((item) => (
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
