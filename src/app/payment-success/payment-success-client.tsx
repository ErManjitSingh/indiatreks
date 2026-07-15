"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Copy, Download, Home, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { toast } from "@/components/ui/toast";
import { useBookingsStore } from "@/lib/booking/store";
import { formatCurrency, formatDate } from "@/utils";

export function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");
  const bookings = useBookingsStore((s) => s.bookings);
  const [hydrated, setHydrated] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

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

  useEffect(() => {
    if (!hydrated) return;
    const t = window.setTimeout(() => setAnimateIn(true), 40);
    return () => window.clearTimeout(t);
  }, [hydrated]);

  const booking = useMemo(() => {
    if (!bookingId) return bookings[0] ?? null;
    return bookings.find((b) => b.id === bookingId) ?? null;
  }, [bookingId, bookings]);

  const shareBooking = async () => {
    const text = booking
      ? `My trek booking ${booking.id} for ${booking.trekTitle} on ${formatDate(booking.departureDate)}`
      : `Booking ${bookingId ?? ""} confirmed`;
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/my-bookings`
        : "/my-bookings";

    try {
      if (navigator.share) {
        await navigator.share({ title: "Trek booking", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text}\n${url}`);
      toast.success("Booking link copied");
    } catch {
      toast.info("Share cancelled");
    }
  };

  const downloadInvoice = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const downloadVoucher = () => {
    alert(
      booking
        ? `Voucher for ${booking.id} — ${booking.trekTitle}\nDeparture: ${formatDate(booking.departureDate)}`
        : "Voucher download will be available soon.",
    );
  };

  return (
    <section className="bg-[#F7F8F6] py-14 md:py-20">
      <Container className="max-w-lg">
        <div className="rounded-2xl border border-[#e8ece6] bg-white p-6 text-center shadow-sm md:p-8">
          <div
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef5ec] transition-all duration-700 ${
              animateIn ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          >
            <Check
              className={`h-8 w-8 text-[#2D5A27] transition-transform duration-700 delay-150 ${
                animateIn ? "scale-100" : "scale-0"
              }`}
              strokeWidth={2.5}
            />
          </div>

          <h1
            className={`font-heading mt-5 text-2xl font-bold text-[#1A1A1A] transition-all duration-500 delay-200 ${
              animateIn ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            Payment successful
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your advance is confirmed. We have saved your booking locally and notified our team.
          </p>

          <div className="mt-6 rounded-xl border border-[#e8ece6] bg-[#F7F8F6] px-4 py-3 text-left text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Booking ID</span>
              <span className="font-semibold text-[#1A1A1A]">
                {booking?.id ?? bookingId ?? "—"}
              </span>
            </div>
            {booking ? (
              <>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Trek</span>
                  <span className="font-medium text-right">{booking.trekTitle}</span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Departure</span>
                  <span className="font-medium">{formatDate(booking.departureDate)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Advance paid</span>
                  <span className="font-semibold text-[#2D5A27]">
                    {formatCurrency(booking.pricing.advancePayment)}
                  </span>
                </div>
              </>
            ) : null}
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <Button type="button" variant="outline" onClick={downloadInvoice}>
              <Download className="h-4 w-4" />
              Download Invoice
            </Button>
            <Button type="button" variant="outline" onClick={downloadVoucher}>
              <Copy className="h-4 w-4" />
              Download Voucher
            </Button>
            <Button type="button" variant="secondary" onClick={shareBooking}>
              <Share2 className="h-4 w-4" />
              Share Booking
            </Button>
            <Button asChild variant="primary">
              <Link href="/my-bookings">View Booking</Link>
            </Button>
          </div>

          <Button asChild variant="ghost" className="mt-4 w-full">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back To Home
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
