import {
  CalendarDays,
  Gauge,
  Mountain,
  Route,
  Snowflake,
  Users,
  type LucideIcon,
} from "lucide-react";

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
    getValue: (trek) => trek.quickInfo.bestTime,
  },
  {
    label: "Trek Distance",
    icon: Route,
    getValue: (trek) => trek.quickInfo.distance,
  },
  {
    label: "Max Altitude",
    icon: Mountain,
    getValue: (trek) => trek.quickInfo.maxAltitude,
  },
  {
    label: "Group Size",
    icon: Users,
    getValue: (trek) => trek.quickInfo.groupSize.replace("trekkers", "People"),
  },
];

export function TrekQuickInfoBar({ trek }: { trek: TrekDetail }) {
  return (
    <section aria-label="Quick information" className="mb-6 md:mb-8">
      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map(({ label, icon: Icon, getValue }) => (
          <li
            key={label}
            className="rounded-xl border border-[#e8ece6] bg-[#F7F8F6] px-3 py-3.5 text-center md:px-4"
          >
            <Icon className="mx-auto h-5 w-5 text-[#2D5A27]" aria-hidden />
            <p className="mt-2 text-[11px] font-medium text-muted-foreground">{label}</p>
            <p className="mt-0.5 text-sm font-bold text-[#1A1A1A] capitalize">{getValue(trek)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
