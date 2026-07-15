"use client";

import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BLUR_DATA_URL } from "@/constants/media";
import type { TrekDetail } from "@/types/trek-detail";
import { formatNumber } from "@/utils";

export function TrekItinerary({ trek }: { trek: TrekDetail }) {
  return (
    <section id="itinerary" className="scroll-mt-28 border-t border-[#e8ece6] pt-8">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2D5A27]">
          Day-wise Itinerary
        </p>
        <h2 className="mt-1 font-heading text-2xl font-bold text-[#1A1A1A]">
          Your journey, day by day
        </h2>
      </div>
      <div className="relative border-l border-primary/25 pl-6 md:pl-8">
        <Accordion
          type="multiple"
          defaultValue={[`day-${trek.itinerary[0]?.day}`]}
          className="space-y-4"
        >
          {trek.itinerary.map((day) => (
            <AccordionItem
              key={day.day}
              value={`day-${day.day}`}
              className="relative rounded-2xl border border-border bg-card px-4 shadow-sm md:px-6"
            >
              <span className="absolute -left-[2.05rem] top-5 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground md:-left-[2.35rem]">
                {day.day}
              </span>
              <AccordionTrigger className="py-5 text-left hover:no-underline">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    Day {day.day}
                  </p>
                  <h3 className="mt-1 font-heading text-lg font-bold md:text-xl">{day.title}</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-3 pb-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
                  {day.distanceKm ? <Meta label="Distance" value={`${day.distanceKm} km`} /> : null}
                  {day.altitudeFt ? (
                    <Meta label="Altitude" value={`${formatNumber(day.altitudeFt)} ft`} />
                  ) : null}
                  {day.walkingHours ? <Meta label="Walking Hours" value={day.walkingHours} /> : null}
                  <Meta label="Meals" value={day.meals.join(", ")} />
                  <Meta label="Stay" value={day.accommodation} />
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  {day.description}
                </p>
                {day.images.length ? (
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {day.images.map((src) => (
                      <div key={src} className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                        <Image
                          src={src}
                          alt={`${day.title} gallery`}
                          fill
                          sizes="280px"
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
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/60 px-3 py-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-medium text-foreground">{value}</p>
    </div>
  );
}
