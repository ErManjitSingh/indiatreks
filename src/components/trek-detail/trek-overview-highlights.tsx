"use client";

import {
  Banknote,
  CheckCircle2,
  Clock3,
  MapPin,
  Signal,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import type { TrekDetail } from "@/types/trek-detail";

const highlightIcons = [Sparkles, CheckCircle2, MapPin, Signal] as const;

export function TrekOverviewBlock({ trek }: { trek: TrekDetail }) {
  const [expanded, setExpanded] = useState(false);
  const short = trek.overview.slice(0, 280);
  const needsMore = trek.overview.length > 280;
  const shown = expanded || !needsMore ? trek.overview : `${short.trim()}…`;

  const logistics = [
    {
      label: "Pickup Point",
      value: trek.quickInfo.startingPoint,
      icon: MapPin,
    },
    {
      label: "Pickup Time",
      value: "7:00 AM",
      icon: Clock3,
    },
    {
      label: "Mobile Network",
      value: "BSNL / Jio",
      icon: Signal,
    },
    {
      label: "ATM",
      value: trek.quickInfo.startingPoint,
      icon: Banknote,
    },
    {
      label: "Last ATM",
      value: trek.state === "Uttarakhand" ? "Dehradun" : "Manali",
      icon: Banknote,
    },
  ];

  const topHighlights = trek.highlights.slice(0, 4);

  return (
    <section id="overview" className="scroll-mt-28">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#1A1A1A]">
            About {trek.title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#444] md:text-[15px] md:leading-8">
            {shown}
          </p>
          {needsMore ? (
            <button
              type="button"
              className="mt-2 text-sm font-semibold text-[#2D5A27] hover:underline"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          ) : null}

          <ul className="mt-5 grid gap-3 rounded-xl border border-[#e8ece6] bg-[#F7F8F6] p-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-[#e0e5de]">
            {logistics.map(({ label, value, icon: Icon }) => (
              <li key={label} className="flex items-start gap-2 px-2 py-1.5 sm:flex-col sm:items-center sm:text-center lg:py-2">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#2D5A27] sm:mt-0" aria-hidden />
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
                  <p className="text-xs font-bold text-[#1A1A1A] md:text-sm">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-xl font-bold text-[#1A1A1A]">Trek Highlights</h3>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {topHighlights.map((item, index) => {
              const Icon = highlightIcons[index % highlightIcons.length];
              return (
                <li
                  key={item}
                  className="rounded-xl border border-[#e8ece6] bg-white p-4 shadow-xs"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8F5E9] text-[#2D5A27]">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="mt-3 text-sm font-semibold leading-snug text-[#1A1A1A]">{item}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Kept for any legacy imports */
export function TrekOverview({ trek }: { trek: TrekDetail }) {
  return <TrekOverviewBlock trek={trek} />;
}

export function TrekHighlights({ trek }: { trek: TrekDetail }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {trek.highlights.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2D5A27]" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}
