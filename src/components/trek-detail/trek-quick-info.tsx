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
import type { TrekDetail } from "@/types/trek-detail";
import { formatTrekDuration } from "@/utils";

const cards: Array<{
  label: string;
  icon: LucideIcon;
  getValue: (trek: TrekDetail) => string;
}> = [
  {
    label: "Difficulty",
    icon: Gauge,
    getValue: (trek) =>
      trek.difficulty.charAt(0).toUpperCase() + trek.difficulty.slice(1),
  },
  {
    label: "Duration",
    icon: CalendarDays,
    getValue: (trek) => formatTrekDuration(trek.durationDays, trek.durationNights),
  },
  {
    label: "Best Season",
    icon: Snowflake,
    getValue: (trek) => trek.quickInfo.bestTime || "May–Jun, Sep–Oct",
  },
  {
    label: "Trek Distance",
    icon: Route,
    getValue: (trek) => trek.quickInfo.distance || `${trek.distanceKm} Km`,
  },
  {
    label: "Max Altitude",
    icon: Mountain,
    getValue: (trek) => {
      const ft = trek.maxAltitude;
      const m = Math.round(ft / 3.281);
      return `${ft.toLocaleString("en-IN")} Ft (${m.toLocaleString("en-IN")} M)`;
    },
  },
  {
    label: "Group Size",
    icon: Users,
    getValue: (trek) =>
      trek.quickInfo.groupSize?.replace("trekkers", "People") ||
      "Join a Group / Daily Departures",
  },
];

export function TrekQuickInfoBar({ trek }: { trek: TrekDetail }) {
  return (
    <section
      aria-label="Quick information"
      className="border-b border-[#e8ece6] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
    >
      <Container>
        <ul className="grid grid-cols-2 divide-y divide-[#e8ece6] sm:grid-cols-3 lg:grid-cols-6 lg:divide-x lg:divide-y-0">
          {cards.map(({ label, icon: Icon, getValue }) => (
            <li
              key={label}
              className="flex flex-col items-center justify-center gap-1.5 px-3 py-5 text-center sm:px-4"
            >
              <Icon className="h-5 w-5 text-[#2D5A27]" aria-hidden />
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {label}
              </p>
              <p className="text-sm font-bold capitalize leading-snug text-[#1A1A1A]">
                {getValue(trek)}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
