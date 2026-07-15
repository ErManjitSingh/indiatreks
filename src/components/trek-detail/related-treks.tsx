"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { TrekListingCard } from "@/components/treks/trek-listing-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { TrekListingItem } from "@/types/trek-listing";

export function RelatedTreks({ treks }: { treks: TrekListingItem[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  if (!treks.length) return null;

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.75, 360), behavior: "smooth" });
  };

  return (
    <Section spacing="sm" id="related">
      <Container>
        <SectionHeader
          eyebrow="Related Treks"
          title="You may also love these trails"
          action={
            <div className="flex gap-2">
              <Button
                type="button"
                size="icon"
                variant="outline"
                aria-label="Previous"
                onClick={() => scrollBy(-1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="outline"
                aria-label="Next"
                onClick={() => scrollBy(1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          }
        />
        <div
          ref={scrollerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {treks.map((item) => (
            <div
              key={item.id}
              className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[55%] lg:basis-[38%]"
            >
              <TrekListingCard trek={item} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
