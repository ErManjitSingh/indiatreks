"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { BLUR_DATA_URL } from "@/constants/media";
import { fetchAllTreks } from "@/lib/api/treks";
import { useRecentlyViewedStore } from "@/lib/store";
import type { TrekListingItem } from "@/types/trek-listing";
import { formatCurrency } from "@/utils";

export function RecentlyViewedTreks() {
  const trekIds = useRecentlyViewedStore((state) => state.trekIds);
  const [hydrated, setHydrated] = useState(false);
  const [treks, setTreks] = useState<TrekListingItem[]>([]);

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (!hydrated || trekIds.length === 0) return;
    let active = true;
    void (async () => {
      try {
        const catalog = await fetchAllTreks();
        if (!active) return;
        const matched = trekIds
          .map(
            (id) =>
              catalog.find((trek) => trek.id === id || trek.slug === id) ?? null,
          )
          .filter((trek): trek is TrekListingItem => Boolean(trek));
        setTreks(matched);
      } catch {
        if (active) setTreks([]);
      }
    })();
    return () => {
      active = false;
    };
  }, [hydrated, trekIds]);

  if (!hydrated || trekIds.length === 0 || !treks.length) return null;

  return (
    <Section spacing="sm" className="bg-muted/20">
      <Container>
        <SectionHeader eyebrow="Recently Viewed" title="Continue exploring" />
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {treks.map((trek) => (
            <Link
              key={trek.id}
              href={`/treks/${trek.slug}`}
              className="group w-64 shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={trek.images[0] || "/images/og-default.jpg"}
                  alt={trek.title}
                  fill
                  sizes="256px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-3">
                <h3 className="font-heading text-sm font-bold">{trek.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatCurrency(trek.basePriceInr)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
