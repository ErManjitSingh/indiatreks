import {
  CalendarDays,
  Gauge,
  Mountain,
  Route,
  Snowflake,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { TrekDetail } from "@/types/trek-detail";
import { formatTrekDuration } from "@/utils";

const cards: Array<{
  label: string;
  icon: LucideIcon;
  getValue: (trek: TrekDetail) => string;
  tone: { card: string; iconWrap: string };
}> = [
  {
    label: "Difficulty",
    icon: Gauge,
    getValue: (trek) =>
      trek.difficulty.charAt(0).toUpperCase() + trek.difficulty.slice(1),
    tone: { card: "bg-[#fff3e8] ring-[#f5d5b8]", iconWrap: "bg-[#F97316]" },
  },
  {
    label: "Duration",
    icon: CalendarDays,
    getValue: (trek) => formatTrekDuration(trek.durationDays, trek.durationNights),
    tone: { card: "bg-[#e8f3ff] ring-[#c5def8]", iconWrap: "bg-[#3B82F6]" },
  },
  {
    label: "Best Season",
    icon: Snowflake,
    getValue: (trek) => trek.quickInfo.bestTime || "May–Jun, Sep–Oct",
    tone: { card: "bg-[#e7f7f2] ring-[#bfe8da]", iconWrap: "bg-[#0D9488]" },
  },
  {
    label: "Trek Distance",
    icon: Route,
    getValue: (trek) => trek.quickInfo.distance || `${trek.distanceKm} Km`,
    tone: { card: "bg-[#eef8e4] ring-[#d4ebbc]", iconWrap: "bg-[#8BC34A]" },
  },
  {
    label: "Max Altitude",
    icon: Mountain,
    getValue: (trek) => {
      const ft = trek.maxAltitude;
      const m = Math.round(ft / 3.281);
      return `${ft.toLocaleString("en-IN")} Ft (${m.toLocaleString("en-IN")} M)`;
    },
    tone: { card: "bg-[#f3eefc] ring-[#ddd0f5]", iconWrap: "bg-[#7C3AED]" },
  },
  {
    label: "Group Size",
    icon: Users,
    getValue: (trek) =>
      trek.quickInfo.groupSize?.replace("trekkers", "People") ||
      "Join a Group / Daily Departures",
    tone: { card: "bg-[#fdecef] ring-[#f5c9d2]", iconWrap: "bg-[#E11D48]" },
  },
];

export function TrekQuickInfoBar({ trek }: { trek: TrekDetail }) {
  return (
    <section
      aria-label="Quick information"
      className="border-b border-[#e8ece6] bg-[#fafbf8] py-3 md:py-3.5"
    >
      <Container>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {cards.map(({ label, icon: Icon, getValue, tone }) => (
            <li
              key={label}
              className={cn(
                "flex items-center gap-2 rounded-xl px-2.5 py-2 ring-1 transition hover:-translate-y-0.5",
                tone.card,
              )}
            >
              <span
                className={cn(
                  "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white shadow-sm",
                  tone.iconWrap,
                )}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-wide text-[#5a665c]">
                  {label}
                </p>
                <p className="truncate text-[11px] font-bold capitalize leading-snug text-[#14201a] sm:text-xs">
                  {getValue(trek)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
