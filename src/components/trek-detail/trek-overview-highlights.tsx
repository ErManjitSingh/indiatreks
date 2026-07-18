"use client";

import { CheckCircle2, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { BLUR_DATA_URL } from "@/constants/media";
import type { TrekDetail } from "@/types/trek-detail";

export function TrekOverviewBlock({ trek }: { trek: TrekDetail }) {
  const [expanded, setExpanded] = useState(false);
  const short = trek.overview.slice(0, 320);
  const needsMore = trek.overview.length > 320;
  const shown = expanded || !needsMore ? trek.overview : `${short.trim()}…`;
  const videoThumb = trek.heroImages[1] || trek.heroImages[0] || trek.gallery[0]?.src;
  const highlights = trek.highlights.slice(0, 6);

  return (
    <section id="overview" data-trek-section="overview" className="scroll-mt-28">
      <h2 className="font-heading text-2xl font-bold text-[#1A1A1A]">About {trek.title}</h2>
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

      {videoThumb ? (
        <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-2xl border border-[#e8ece6]">
          <Image
            src={videoThumb}
            alt={`${trek.title} experience`}
            fill
            sizes="420px"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[#2D5A27] shadow-lg">
              <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden />
            </span>
            <p className="mt-3 text-sm font-bold">{trek.title} Experience</p>
            <p className="text-xs text-white/80">02:45</p>
          </div>
        </div>
      ) : null}

      <div className="mt-6">
        <h3 className="font-heading text-lg font-bold text-[#1A1A1A]">Quick Highlights</h3>
        <ul className="mt-3 space-y-2.5">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-[#333]">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2D5A27]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
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
