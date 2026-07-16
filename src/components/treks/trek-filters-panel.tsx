"use client";

import type { TrekFiltersState, TrekTypeTag, SuitableFor } from "@/types/trek-listing";
import type { DifficultyLevel, Season } from "@/types";
import {
  trekListingDestinations,
  trekListingRegions,
  trekListingStates,
  TREK_ALTITUDE_BOUNDS,
  TREK_PRICE_BOUNDS,
} from "@/data/trek-listing-meta";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils";

interface TrekFiltersPanelProps {
  filters: TrekFiltersState;
  onChange: (next: TrekFiltersState) => void;
  onReset: () => void;
  onApply?: () => void;
  className?: string;
  destinations?: string[];
  states?: string[];
  regions?: string[];
}

const difficulties: DifficultyLevel[] = ["easy", "moderate", "difficult", "challenging"];
const seasons: Season[] = ["summer", "monsoon", "autumn", "winter", "spring"];
const durations = [
  { value: "1-2", label: "1–3 Days" },
  { value: "3-4", label: "4–5 Days" },
  { value: "5-7", label: "5–7 Days" },
  { value: "8+", label: "8+ Days" },
];
const trekTypes: Array<{ value: TrekTypeTag; label: string }> = [
  { value: "weekend", label: "Weekend" },
  { value: "snow", label: "Snow" },
  { value: "camping", label: "Camping" },
  { value: "family", label: "Family Friendly" },
];
const suitableOptions: Array<{ value: SuitableFor; label: string }> = [
  { value: "family", label: "Family" },
  { value: "solo", label: "Solo" },
  { value: "couples", label: "Couples" },
  { value: "beginners", label: "Beginners" },
  { value: "experienced", label: "Experienced" },
];

function toggleValue<T extends string>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function TrekFiltersPanel({
  filters,
  onChange,
  onReset,
  onApply,
  className,
  destinations,
  states,
  regions,
}: TrekFiltersPanelProps) {
  const update = (patch: Partial<TrekFiltersState>) => onChange({ ...filters, ...patch });
  const destinationOptions = destinations?.length
    ? destinations
    : [...trekListingDestinations];
  const stateOptions = states?.length ? states : [...trekListingStates];
  const regionOptions = regions?.length ? regions : [...trekListingRegions];

  return (
    <aside
      className={cn(
        "rounded-xl border border-border bg-white p-4 shadow-xs md:p-5",
        className,
      )}
      aria-label="Trek filters"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[#1A1A1A]">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-semibold text-[#2D5A27] transition hover:underline"
        >
          Reset
        </button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["destination", "difficulty", "duration", "price", "season", "type"]}
        className="space-y-1"
      >
        <FilterBlock title="Destination" value="destination">
          <select
            className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary/40"
            value={filters.destination[0] ?? ""}
            aria-label="Destination"
            onChange={(event) =>
              update({
                destination: event.target.value ? [event.target.value] : [],
              })
            }
          >
            <option value="">Any destination</option>
            {destinationOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </FilterBlock>

        <FilterBlock title="Difficulty" value="difficulty">
          <CheckboxGroup
            options={difficulties.map((item) => ({
              value: item,
              label: item.charAt(0).toUpperCase() + item.slice(1),
            }))}
            selected={filters.difficulty}
            onToggle={(value) =>
              update({ difficulty: toggleValue(filters.difficulty, value as DifficultyLevel) })
            }
          />
        </FilterBlock>

        <FilterBlock title="Duration" value="duration">
          <CheckboxGroup
            options={durations}
            selected={filters.duration}
            onToggle={(value) => update({ duration: toggleValue(filters.duration, value) })}
          />
        </FilterBlock>

        <FilterBlock title="Altitude" value="altitude">
          <select
            className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary/40"
            value={
              filters.altitudeMax < TREK_ALTITUDE_BOUNDS.max
                ? String(filters.altitudeMax)
                : ""
            }
            aria-label="Altitude"
            onChange={(event) =>
              update({
                altitudeMin: TREK_ALTITUDE_BOUNDS.min,
                altitudeMax: event.target.value
                  ? Number(event.target.value)
                  : TREK_ALTITUDE_BOUNDS.max,
              })
            }
          >
            <option value="">Any altitude</option>
            <option value="10000">Under 10,000 ft</option>
            <option value="14000">Under 14,000 ft</option>
            <option value="18000">Under 18,000 ft</option>
          </select>
        </FilterBlock>

        <FilterBlock title="Price Range" value="price">
          <RangeFields
            min={filters.priceMin}
            max={filters.priceMax}
            bounds={TREK_PRICE_BOUNDS}
            format={(value) => formatCurrency(value)}
            onMin={(value) => update({ priceMin: value })}
            onMax={(value) => update({ priceMax: value })}
            labelMin="Min"
            labelMax="Max"
          />
        </FilterBlock>

        <FilterBlock title="Best Season" value="season">
          <CheckboxGroup
            options={seasons.map((item) => ({
              value: item,
              label: item.charAt(0).toUpperCase() + item.slice(1),
            }))}
            selected={filters.season}
            onToggle={(value) => update({ season: toggleValue(filters.season, value as Season) })}
          />
        </FilterBlock>

        <FilterBlock title="Region / State" value="region">
          <div className="space-y-3">
            <select
              className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary/40"
              value={filters.state[0] ?? ""}
              aria-label="State"
              onChange={(event) =>
                update({ state: event.target.value ? [event.target.value] : [] })
              }
            >
              <option value="">Any state</option>
              {stateOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary/40"
              value={filters.region[0] ?? ""}
              aria-label="Region"
              onChange={(event) =>
                update({ region: event.target.value ? [event.target.value] : [] })
              }
            >
              <option value="">Any region</option>
              {regionOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </FilterBlock>

        <FilterBlock title="Trek Type" value="type">
          <CheckboxGroup
            options={trekTypes}
            selected={filters.trekType}
            onToggle={(value) =>
              update({ trekType: toggleValue(filters.trekType, value as TrekTypeTag) })
            }
          />
        </FilterBlock>

        <FilterBlock title="Suitable For" value="suitable">
          <CheckboxGroup
            options={suitableOptions}
            selected={filters.suitableFor}
            onToggle={(value) =>
              update({ suitableFor: toggleValue(filters.suitableFor, value as SuitableFor) })
            }
          />
        </FilterBlock>
      </Accordion>

      <div className="mt-5 space-y-2">
        <Button
          type="button"
          className="w-full border border-[#d0d5cc] bg-white text-[#1A1A1A] hover:bg-[#F7F8F6]"
          variant="primary"
          onClick={onApply}
        >
          Apply Filters
        </Button>
        <Button type="button" variant="outline" className="w-full border-border bg-white" onClick={onReset}>
          Clear All
        </Button>
      </div>
    </aside>
  );
}

function FilterBlock({
  title,
  value,
  children,
}: {
  title: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <AccordionItem value={value} className="border-border">
      <AccordionTrigger className="py-3 text-sm font-semibold">{title}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
}

function CheckboxGroup({
  options,
  selected,
  onToggle,
}: {
  options: Array<{ value: string; label: string }>;
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <ul className="space-y-2.5">
      {options.map((option) => {
        const checked = selected.includes(option.value);
        return (
          <li key={option.value}>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(option.value)}
                className="h-4 w-4 rounded border-input text-primary accent-[#2D5A27] focus-visible:ring-2 focus-visible:ring-ring"
              />
              <span>{option.label}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

function RangeFields({
  min,
  max,
  bounds,
  onMin,
  onMax,
  format,
  labelMin,
  labelMax,
  step = 500,
}: {
  min: number;
  max: number;
  bounds: { min: number; max: number };
  onMin: (value: number) => void;
  onMax: (value: number) => void;
  format: (value: number) => string;
  labelMin: string;
  labelMax: string;
  step?: number;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {labelMin}: {format(min)}
        </span>
        <span>
          {labelMax}: {format(max)}
        </span>
      </div>
      <input
        type="range"
        min={bounds.min}
        max={bounds.max}
        step={step}
        value={max}
        aria-label={labelMax}
        onChange={(event) => onMax(Math.max(Number(event.target.value), min))}
        className="w-full accent-[#2D5A27]"
      />
      <input
        type="range"
        min={bounds.min}
        max={bounds.max}
        step={step}
        value={min}
        aria-label={labelMin}
        onChange={(event) => onMin(Math.min(Number(event.target.value), max))}
        className="w-full accent-[#2D5A27]"
      />
    </div>
  );
}
