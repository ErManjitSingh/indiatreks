"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Trash2 } from "lucide-react";

import { AccountShell } from "@/components/account/account-shell";
import { BookNowButton } from "@/components/booking/book-now-button";
import { Button } from "@/components/ui/button";
import { BLUR_DATA_URL } from "@/constants/media";
import { fetchAllTreks } from "@/lib/api/treks";
import { useWishlistStore } from "@/lib/store";
import type { TrekListingItem } from "@/types/trek-listing";
import { formatCurrency } from "@/utils";

function WishlistContent() {
  const trekIds = useWishlistStore((s) => s.trekIds);
  const toggle = useWishlistStore((s) => s.toggle);
  const [hydrated, setHydrated] = useState(false);
  const [catalog, setCatalog] = useState<TrekListingItem[]>([]);

  useEffect(() => {
    let active = true;
    void (async () => {
      await Promise.resolve(useWishlistStore.persist.rehydrate());
      try {
        const items = await fetchAllTreks();
        if (active) setCatalog(items);
      } catch {
        if (active) setCatalog([]);
      }
      if (active) setHydrated(true);
    })();
    return () => {
      active = false;
    };
  }, []);

  const treks = useMemo(
    () =>
      catalog.filter(
        (trek) => trekIds.includes(trek.id) || trekIds.includes(trek.slug),
      ),
    [catalog, trekIds],
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
              <Link href={`/treks/${trek.slug}`} className="relative block aspect-[16/10]">
                <Image
                  src={trek.images[0] || "/images/og-default.jpg"}
                  alt={trek.title}
                  fill
                  sizes="320px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover"
                />
              </Link>
              <div className="space-y-3 p-4">
                <div>
                  <Link
                    href={`/treks/${trek.slug}`}
                    className="font-heading text-lg font-bold text-[#1A1A1A] hover:text-[#2D5A27]"
                  >
                    {trek.title}
                  </Link>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {trek.destinationName || trek.region}
                  </p>
                </div>
                <p className="text-sm font-semibold text-[#2D5A27]">
                  {formatCurrency(trek.basePriceInr)}
                </p>
                <div className="flex gap-2">
                  <BookNowButton trekSlug={trek.slug} className="flex-1" />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label={`Remove ${trek.title} from wishlist`}
                    onClick={() => toggle(trek.id)}
                  >
                    <Trash2 className="h-4 w-4" />
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
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-12">Loading…</div>}>
      <WishlistContent />
    </Suspense>
  );
}
