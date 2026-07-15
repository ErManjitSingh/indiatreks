"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { BookNowButton } from "@/components/booking/book-now-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { BLUR_DATA_URL } from "@/constants/media";
import { allTreks } from "@/data/treks";
import { useRecentlyViewedStore, useUiStore } from "@/lib/store";
import { formatCurrency, formatDate, formatTrekDuration } from "@/utils";
import { formatAltitude } from "@/utils/trek";

export function TrekPreviewDrawer() {
  const { trekPreviewId, setTrekPreviewId } = useUiStore();
  const addRecent = useRecentlyViewedStore((state) => state.add);
  const trek = allTreks.find((item) => item.id === trekPreviewId) ?? null;
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
    if (trek) addRecent(trek.id);
  }, [trek, addRecent]);

  return (
    <Drawer
      open={Boolean(trek)}
      onOpenChange={(open) => {
        if (!open) setTrekPreviewId(null);
      }}
    >
      <DrawerContent side="right" className="w-[min(100vw,28rem)] overflow-y-auto">
        {trek ? (
          <>
            <DrawerTitle className="sr-only">{trek.title} preview</DrawerTitle>
            <DrawerDescription className="sr-only">{trek.summary}</DrawerDescription>

            <div className="relative -mx-6 -mt-6 aspect-[16/11] overflow-hidden">
              <Image
                src={trek.images[imageIndex] ?? trek.images[0]}
                alt={trek.title}
                fill
                sizes="420px"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {trek.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl"
                  onClick={() => setImageIndex(index)}
                  aria-label={`Preview image ${index + 1}`}
                >
                  <Image src={image} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              <Badge variant="soft" className="capitalize">
                {trek.difficulty}
              </Badge>
              <h3 className="font-heading text-2xl font-bold">{trek.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{trek.summary}</p>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">Duration</dt>
                  <dd className="font-semibold">
                    {formatTrekDuration(trek.durationDays, trek.durationNights)}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Altitude</dt>
                  <dd className="font-semibold">{formatAltitude(trek.maxAltitude)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Price</dt>
                  <dd className="font-semibold">{formatCurrency(trek.basePriceInr)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Seats left</dt>
                  <dd className="font-semibold">{trek.seatsLeft}</dd>
                </div>
              </dl>

              <div>
                <h4 className="mb-2 text-sm font-semibold">Upcoming departures</h4>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {trek.departures.slice(0, 4).map((date) => (
                    <li key={date}>{formatDate(date)}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <Button asChild variant="outline" className="flex-1">
                <Link href={`/treks/${trek.slug}`} onClick={() => setTrekPreviewId(null)}>
                  View Details
                </Link>
              </Button>
              <BookNowButton
                trekSlug={trek.slug}
                variant="accent"
                className="flex-1"
                onClick={() => setTrekPreviewId(null)}
              >
                Book Now
              </BookNowButton>
            </div>
          </>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
}
