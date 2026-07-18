"use client";

import {
  Droplets,
  Mountain,
  Route,
  Tent,
  Trees,
  UtensilsCrossed,
} from "lucide-react";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BLUR_DATA_URL } from "@/constants/media";
import type { TrekDetail, TrekItineraryDay } from "@/types/trek-detail";
import { formatNumber } from "@/utils";

export function TrekItinerary({ trek }: { trek: TrekDetail }) {
  return (
    <section id="itinerary" className="scroll-mt-28">
      <h2 className="font-heading text-2xl font-bold text-[#2D5A27]">Itinerary</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Day-by-day plan for {trek.title}
      </p>

      <div className="relative mt-6 border-l-2 border-[#d7e0d4] pl-6">
        <Accordion
          type="multiple"
          defaultValue={trek.itinerary.slice(0, 2).map((d) => `day-${d.day}`)}
          className="space-y-5"
        >
          {trek.itinerary.map((day) => (
            <AccordionItem
              key={day.day}
              value={`day-${day.day}`}
              className="relative border-0 bg-transparent"
            >
              <span className="absolute -left-[2.05rem] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#2D5A27] text-[11px] font-bold text-white shadow-sm">
                D{day.day}
              </span>
              <AccordionTrigger className="rounded-xl border border-[#e8ece6] bg-white px-4 py-4 text-left hover:no-underline data-[state=open]:rounded-b-none data-[state=open]:border-b-0">
                <div className="min-w-0 pr-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2D5A27]">
                    Day {day.day}
                  </p>
                  <h3 className="mt-1 font-heading text-base font-bold text-[#1A1A1A] md:text-lg">
                    {day.startLocation && day.endLocation
                      ? `${day.startLocation} to ${day.endLocation}`
                      : day.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium text-muted-foreground">
                    {day.distanceKm ? <span>{day.distanceKm} Km</span> : null}
                    {day.walkingHours ? <span>{day.walkingHours}</span> : null}
                    {day.altitudeFt ? (
                      <span>
                        {formatNumber(day.altitudeFt)} Ft /{" "}
                        {Math.round(day.altitudeFt / 3.281).toLocaleString("en-IN")} M
                      </span>
                    ) : null}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="rounded-b-xl border border-t-0 border-[#e8ece6] bg-white px-4 pb-4 pt-0">
                <p className="whitespace-pre-line text-sm leading-relaxed text-[#444]">
                  {day.description}
                </p>
                <DayFactRow day={day} />
                {day.highlights?.length ? (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#333]">
                    {day.highlights.slice(0, 4).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {day.images.length ? (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {day.images.slice(0, 2).map((src) => (
                      <div
                        key={src}
                        className="relative aspect-[16/10] overflow-hidden rounded-xl"
                      >
                        <Image
                          src={src}
                          alt={`${day.title} gallery`}
                          fill
                          sizes="200px"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-5 rounded-xl border border-dashed border-[#c5d4c2] bg-[#F7FBF6] px-4 py-3 text-xs leading-relaxed text-[#2D5A27]">
        Itineraries are flexible and can be customized for private groups, fitness levels, and
        seasonal conditions. Your trek leader confirms the exact plan each morning.
      </div>
    </section>
  );
}

function DayFactRow({ day }: { day: TrekItineraryDay }) {
  const facts = [
    {
      label: "Meals",
      value: day.meals.join(", ") || "As per plan",
      icon: UtensilsCrossed,
    },
    {
      label: "Stay",
      value: day.accommodation || "Camp / Homestay",
      icon: Tent,
    },
    {
      label: "Trail",
      value: day.trailType || "Himalayan trail",
      icon: day.trailType?.toLowerCase().includes("forest") ? Trees : Route,
    },
    {
      label: "Water Source",
      value: "Available",
      icon: Droplets,
    },
  ];

  if (day.difficulty) {
    facts.push({
      label: "Difficulty",
      value: day.difficulty,
      icon: Mountain,
    });
  }

  return (
    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
      {facts.slice(0, 4).map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="rounded-lg border border-[#eef2ee] bg-[#F7F8F6] px-2.5 py-2"
        >
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            <Icon className="h-3.5 w-3.5 text-[#2D5A27]" aria-hidden />
            {label}
          </div>
          <p className="mt-1 text-xs font-semibold leading-snug text-[#1A1A1A]">{value}</p>
        </div>
      ))}
    </div>
  );
}
