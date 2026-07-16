"use client";

import { ArrowRight, Mountain } from "lucide-react";
import Link from "next/link";

import { TrekCard } from "@/components/home/trek-card";
import { Container } from "@/components/ui/container";
import { useSiteContent } from "@/providers/site-content-provider";

export function FeaturedTreksSection() {
  const { featuredTreks } = useSiteContent();
  const treks = featuredTreks.slice(0, 4);

  return (
    <section
      id="featured-treks"
      className="relative overflow-hidden bg-white pt-8 pb-10 md:pt-14 md:pb-16"
    >
      <div
        className="pointer-events-none absolute inset-0 hidden opacity-[0.35] md:block"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(163,230,53,0.08), transparent 40%), radial-gradient(circle at 80% 0%, rgba(15,81,50,0.05), transparent 35%), repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(15,81,50,0.03) 28px, rgba(15,81,50,0.03) 29px), repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(15,81,50,0.03) 28px, rgba(15,81,50,0.03) 29px)",
        }}
        aria-hidden
      />

      <Container className="relative z-[1]">
        {/* Mobile header */}
        <div className="mb-4 flex items-center justify-between md:hidden">
          <h2 className="font-heading text-lg font-extrabold tracking-tight text-[#14201a] uppercase">
            Popular Treks
          </h2>
          <Link
            href="/treks"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#6b8f3c]"
          >
            View All
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        {/* Desktop header — matches mockup “Popular Treks” */}
        <div className="mb-9 hidden flex-col items-center text-center md:flex">
          <Mountain className="mb-2 h-7 w-7 text-[#6b8f3c]" strokeWidth={1.4} aria-hidden />
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[#14201a] md:text-[2.15rem]">
            Popular Treks
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#6b7668]">
            Handpicked Himalayan adventures loved by thousands of trekkers.
          </p>
          <Link
            href="/treks"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-[#1a2e1a]/80 px-4 py-2 text-sm font-semibold text-[#14201a] transition hover:bg-[#14201a] hover:text-white"
          >
            View All Treks
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        {/* Mobile: horizontal snap cards */}
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {treks.map((trek) => (
            <div key={trek.id} className="w-[82%] max-w-[320px] shrink-0">
              <TrekCard trek={trek} />
            </div>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-4">
          {treks.map((trek) => (
            <TrekCard key={trek.id} trek={trek} />
          ))}
        </div>
      </Container>
    </section>
  );
}
