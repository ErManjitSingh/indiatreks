"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CalendarDays, FileText, Heart, User, Users } from "lucide-react";

import { AccountShell } from "@/components/account/account-shell";
import { Button } from "@/components/ui/button";
import {
  useBookingsStore,
  useProfileStore,
} from "@/lib/booking/store";
import { useWishlistStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/utils";

function MyAccountContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const bookings = useBookingsStore((s) => s.bookings);
  const profile = useProfileStore();
  const wishlistCount = useWishlistStore((s) => s.trekIds.length);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    void (async () => {
      await Promise.resolve(useBookingsStore.persist.rehydrate());
      await Promise.resolve(useProfileStore.persist.rehydrate());
      await Promise.resolve(useWishlistStore.persist.rehydrate());
      if (active) setHydrated(true);
    })();
    return () => {
      active = false;
    };
  }, []);

  const upcoming = useMemo(
    () => bookings.filter((b) => b.status === "upcoming"),
    [bookings],
  );
  const completed = useMemo(
    () => bookings.filter((b) => b.status === "completed"),
    [bookings],
  );

  if (tab === "travellers") {
    return (
      <AccountShell
        title="Saved travellers"
        description="Quickly reuse traveller details on future bookings."
      >
        <div className="rounded-2xl border border-[#e8ece6] bg-white p-5 md:p-6">
          {!hydrated ? (
            <div className="h-24 animate-pulse rounded-xl bg-muted" />
          ) : profile.savedTravellers.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No saved travellers yet. Add them from your profile or during booking.
            </p>
          ) : (
            <ul className="space-y-3">
              {profile.savedTravellers.map((traveller, index) => (
                <li
                  key={`${traveller.name}-${index}`}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#e8ece6] px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">{traveller.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Age {traveller.age || "—"} · {traveller.phone || "No phone"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <Button asChild variant="outline" className="mt-4">
            <Link href="/profile">Manage in profile</Link>
          </Button>
        </div>
      </AccountShell>
    );
  }

  if (tab === "invoices") {
    return (
      <AccountShell
        title="Invoices"
        description="Download invoices for paid bookings."
      >
        <div className="rounded-2xl border border-[#e8ece6] bg-white p-5 md:p-6">
          {!hydrated ? (
            <div className="h-24 animate-pulse rounded-xl bg-muted" />
          ) : bookings.length === 0 ? (
            <p className="text-sm text-muted-foreground">No invoices yet.</p>
          ) : (
            <ul className="space-y-3">
              {bookings.map((booking) => (
                <li
                  key={booking.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e8ece6] px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">{booking.trekTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.id} · {formatDate(booking.departureDate)} ·{" "}
                      {formatCurrency(booking.pricing.grandTotal)}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.print()}
                  >
                    Download
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </AccountShell>
    );
  }

  return (
    <AccountShell
      title="Dashboard"
      description="Overview of your bookings, wishlist, and profile."
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Upcoming",
            value: hydrated ? String(upcoming.length) : "—",
            icon: CalendarDays,
          },
          {
            label: "Completed",
            value: hydrated ? String(completed.length) : "—",
            icon: FileText,
          },
          {
            label: "Wishlist",
            value: hydrated ? String(wishlistCount) : "—",
            icon: Heart,
          },
          {
            label: "Travellers",
            value: hydrated ? String(profile.savedTravellers.length) : "—",
            icon: Users,
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#e8ece6] bg-white p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <Icon className="h-4 w-4 text-[#2D5A27]" />
              </div>
              <p className="font-heading mt-2 text-3xl font-bold text-[#1A1A1A]">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[#e8ece6] bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Quick links</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild variant="primary" size="sm">
              <Link href="/my-bookings">My bookings</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/wishlist">Wishlist</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/profile">
                <User className="h-4 w-4" />
                Profile
              </Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link href="/treks">Browse treks</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e8ece6] bg-white p-5">
          <h2 className="font-heading text-lg font-bold">Recent bookings</h2>
          {!hydrated ? (
            <div className="mt-4 h-20 animate-pulse rounded-xl bg-muted" />
          ) : bookings.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              No bookings yet. Start from any trek page.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {bookings.slice(0, 3).map((booking) => (
                <li
                  key={booking.id}
                  className="rounded-xl border border-[#e8ece6] px-3 py-2.5 text-sm"
                >
                  <p className="font-semibold text-[#1A1A1A]">{booking.trekTitle}</p>
                  <p className="text-muted-foreground">
                    {formatDate(booking.departureDate)} · {booking.status} ·{" "}
                    {booking.paymentStatus}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AccountShell>
  );
}

export function MyAccountClient() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#F7F8F6] py-20 text-center text-sm text-muted-foreground">
          Loading account…
        </div>
      }
    >
      <MyAccountContent />
    </Suspense>
  );
}
