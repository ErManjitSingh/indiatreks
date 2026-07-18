"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin } from "lucide-react";

import { BookNowButton } from "@/components/booking/book-now-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BLUR_DATA_URL } from "@/constants/media";
import { fetchAllTreks } from "@/lib/api/treks";
import type { TrekListingItem } from "@/types/trek-listing";
import { formatCurrency } from "@/utils";

function BookingHubContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trekQuery = searchParams.get("trek");
  const [popular, setPopular] = useState<TrekListingItem[]>([]);

  useEffect(() => {
    if (trekQuery) {
      router.replace(`/booking/${trekQuery}`);
    }
  }, [router, trekQuery]);

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const items = await fetchAllTreks();
        if (!active) return;
        setPopular(
          [...items].sort((a, b) => b.popularity - a.popularity).slice(0, 8),
        );
      } catch {
        if (active) setPopular([]);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (trekQuery) {
    return (
      <section className="bg-[#F7F8F6] py-16">
        <Container className="text-center text-sm text-muted-foreground">
          Opening booking for {trekQuery}…
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-[#F7F8F6] py-10 md:py-14">
      <Container>
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#2D5A27]">
            Start booking
          </p>
          <h1 className="font-heading mt-1 text-2xl font-bold text-[#1A1A1A] md:text-3xl">
            Choose a trek to book
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Pick a popular trek below, or browse the full catalogue.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/treks">View all treks</Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((trek) => (
            <article
              key={trek.id}
              className="overflow-hidden rounded-2xl border border-[#e8ece6] bg-white"
            >
              <Link href={`/treks/${trek.slug}`} className="relative block aspect-[4/3]">
                <Image
                  src={trek.images[0] || "/images/og-default.jpg"}
                  alt={trek.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover"
                />
              </Link>
              <div className="p-4">
                <h2 className="font-heading text-base font-bold text-[#1A1A1A]">
                  {trek.title}
                </h2>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {trek.destinationName}
                </p>
                <p className="mt-2 text-sm font-semibold text-[#2D5A27]">
                  From {formatCurrency(trek.basePriceInr)}
                </p>
                <BookNowButton trekSlug={trek.slug} size="sm" className="mt-3 w-full">
                  Book now
                </BookNowButton>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function BookingHubClient() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#F7F8F6] py-20 text-center text-sm text-muted-foreground">
          Loading booking…
        </div>
      }
    >
      <BookingHubContent />
    </Suspense>
  );
}
