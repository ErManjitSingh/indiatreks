"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { AccountShell } from "@/components/account/account-shell";
import { Button } from "@/components/ui/button";
import { useBookingsStore } from "@/lib/booking/store";
import type { LocalBookingStatus } from "@/lib/booking/types";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate } from "@/utils";

const TABS: Array<{ id: LocalBookingStatus; label: string }> = [
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

function MyBookingsContent() {
  const bookings = useBookingsStore((s) => s.bookings);
  const cancelBooking = useBookingsStore((s) => s.cancelBooking);
  const [hydrated, setHydrated] = useState(false);
  const [tab, setTab] = useState<LocalBookingStatus>("upcoming");

  useEffect(() => {
    let active = true;
    void (async () => {
      await Promise.resolve(useBookingsStore.persist.rehydrate());
      if (active) setHydrated(true);
    })();
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(
    () => bookings.filter((b) => b.status === tab),
    [bookings, tab],
  );

  return (
    <AccountShell
      title="My bookings"
      description="Track upcoming adventures, past trips, and cancelled bookings."
    >
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              "shrink-0 rounded-xl border px-4 py-2 text-sm font-medium transition",
              tab === item.id
                ? "border-[#2D5A27] bg-[#2D5A27] text-white"
                : "border-[#e8ece6] bg-white text-[#333] hover:border-[#2D5A27]/40",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {!hydrated ? (
          <div className="h-28 animate-pulse rounded-2xl bg-muted" />
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-[#e8ece6] bg-white p-6 text-center">
            <p className="text-sm text-muted-foreground">No {tab} bookings.</p>
            <Button asChild variant="primary" className="mt-4">
              <Link href="/treks">Explore treks</Link>
            </Button>
          </div>
        ) : (
          filtered.map((booking) => (
            <article
              key={booking.id}
              className="rounded-2xl border border-[#e8ece6] bg-white p-4 md:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-heading text-lg font-bold text-[#1A1A1A]">
                    {booking.trekTitle}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {booking.id} · {formatDate(booking.departureDate)} · {booking.batchLabel}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-lg border border-[#e8ece6] bg-[#F7F8F6] px-2.5 py-1 text-xs font-semibold capitalize text-[#2D5A27]">
                    {booking.status}
                  </span>
                  <span className="rounded-lg border border-[#e8ece6] bg-[#F7F8F6] px-2.5 py-1 text-xs font-semibold capitalize text-[#333]">
                    Payment: {booking.paymentStatus}
                  </span>
                </div>
              </div>

              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-muted-foreground">Travellers</dt>
                  <dd className="font-medium">
                    {booking.adults} adult{booking.adults === 1 ? "" : "s"}
                    {booking.children > 0 ? `, ${booking.children} child` : ""}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Advance paid</dt>
                  <dd className="font-medium">
                    {formatCurrency(booking.pricing.advancePayment)}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Grand total</dt>
                  <dd className="font-medium">
                    {formatCurrency(booking.pricing.grandTotal)}
                  </dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => window.print()}>
                  Download Invoice
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    alert(
                      `Voucher ${booking.id}\n${booking.trekTitle}\n${formatDate(booking.departureDate)}`,
                    )
                  }
                >
                  Download Voucher
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/treks/${booking.trekSlug}`}>View trek</Link>
                </Button>
                {booking.status === "upcoming" ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => cancelBooking(booking.id)}
                  >
                    Cancel
                  </Button>
                ) : null}
              </div>
            </article>
          ))
        )}
      </div>
    </AccountShell>
  );
}

export function MyBookingsClient() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#F7F8F6] py-20 text-center text-sm text-muted-foreground">
          Loading bookings…
        </div>
      }
    >
      <MyBookingsContent />
    </Suspense>
  );
}
