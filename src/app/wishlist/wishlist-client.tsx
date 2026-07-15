"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Trash2 } from "lucide-react";

import { AccountShell } from "@/components/account/account-shell";
import { BookNowButton } from "@/components/booking/book-now-button";
import { Button } from "@/components/ui/button";
import { BLUR_DATA_URL } from "@/constants/media";
import { allTreks } from "@/data/treks";
import { useWishlistStore } from "@/lib/store";
import { formatCurrency } from "@/utils";

function WishlistContent() {
  const trekIds = useWishlistStore((s) => s.trekIds);
  const toggle = useWishlistStore((s) => s.toggle);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    void (async () => {
      await Promise.resolve(useWishlistStore.persist.rehydrate());
      if (active) setHydrated(true);
    })();
    return () => {
      active = false;
    };
  }, []);

  const treks = useMemo(
    () => allTreks.filter((trek) => trekIds.includes(trek.id)),
    [trekIds],
  );

  return (
    <AccountShell
      title="Wishlist"
      description="Treks you saved for later — remove or move straight to booking."
    >
      {!hydrated ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : treks.length === 0 ? (
        <div className="rounded-2xl border border-[#e8ece6] bg-white p-8 text-center">
          <p className="text-sm text-muted-foreground">Your wishlist is empty.</p>
          <Button asChild variant="primary" className="mt-4">
            <Link href="/treks">Browse treks</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {treks.map((trek) => (
            <article
              key={trek.id}
              className="overflow-hidden rounded-2xl border border-[#e8ece6] bg-white"
            >
              <Link href={`/treks/${trek.slug}`} className="relative block aspect-[4/3]">
                <Image
                  src={trek.images[0]}
                  alt={trek.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover"
                />
              </Link>
              <div className="p-4">
                <h2 className="font-heading text-lg font-bold text-[#1A1A1A]">
                  <Link href={`/treks/${trek.slug}`} className="hover:text-[#2D5A27]">
                    {trek.title}
                  </Link>
                </h2>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {trek.destinationName}
                </p>
                <p className="font-heading mt-2 text-lg font-bold text-[#2D5A27]">
                  {formatCurrency(trek.basePriceInr)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <BookNowButton trekSlug={trek.slug} size="sm" className="flex-1">
                    Move To Booking
                  </BookNowButton>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => toggle(trek.id)}
                    aria-label={`Remove ${trek.title} from wishlist`}
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </AccountShell>
  );
}

export function WishlistClient() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#F7F8F6] py-20 text-center text-sm text-muted-foreground">
          Loading wishlist…
        </div>
      }
    >
      <WishlistContent />
    </Suspense>
  );
}
