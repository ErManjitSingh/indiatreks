"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Landmark,
  ShieldCheck,
  Smartphone,
  Wallet,
  Lock,
  BadgeCheck,
  RotateCcw,
} from "lucide-react";

import { submitConfirmedBookingAction } from "@/actions/contact";
import { PriceSummary } from "@/components/booking/price-summary";
import { TrustBadges } from "@/components/booking/trust-badges";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { toast } from "@/components/ui/toast";
import { fetchTrekBySlug } from "@/lib/api/treks";
import { calculateBookingPrice, createBookingId } from "@/lib/booking/pricing";
import {
  useBookingDraftStore,
  useBookingsStore,
} from "@/lib/booking/store";
import type { PaymentMethodId, SavedBooking } from "@/lib/booking/types";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate } from "@/utils";

const PAYMENT_METHODS: Array<{
  id: PaymentMethodId;
  label: string;
  hint: string;
  icon: typeof CreditCard;
}> = [
  { id: "razorpay", label: "Razorpay", hint: "Cards, UPI & more", icon: BadgeCheck },
  { id: "phonepe", label: "PhonePe", hint: "UPI & wallet", icon: Smartphone },
  { id: "upi", label: "UPI", hint: "Any UPI app", icon: Smartphone },
  { id: "credit-card", label: "Credit Card", hint: "Visa / Mastercard / Amex", icon: CreditCard },
  { id: "debit-card", label: "Debit Card", hint: "All major banks", icon: CreditCard },
  { id: "net-banking", label: "Net Banking", hint: "Secure bank transfer", icon: Landmark },
  { id: "wallet", label: "Wallet", hint: "Paytm / Amazon Pay", icon: Wallet },
];

export function CheckoutClient() {
  const router = useRouter();
  const { draft, patchDraft, clearDraft } = useBookingDraftStore();
  const addBooking = useBookingsStore((s) => s.addBooking);
  const [hydrated, setHydrated] = useState(false);
  const [pending, startTransition] = useTransition();
  const [unitPrice, setUnitPrice] = useState(0);

  useEffect(() => {
    let active = true;
    void (async () => {
      await Promise.resolve(useBookingDraftStore.persist.rehydrate());
      await Promise.resolve(useBookingsStore.persist.rehydrate());
      if (active) setHydrated(true);
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated || !draft?.trekSlug) {
      setUnitPrice(0);
      return;
    }
    let active = true;
    void (async () => {
      try {
        const detail = await fetchTrekBySlug(draft.trekSlug);
        if (!active) return;
        const dep = detail?.departures.find(
          (d) => d.id === draft.departureId || d.date === draft.departureDate,
        );
        setUnitPrice(dep?.priceInr ?? detail?.basePriceInr ?? 0);
      } catch {
        if (active) setUnitPrice(0);
      }
    })();
    return () => {
      active = false;
    };
  }, [hydrated, draft]);

  const pricing = useMemo(() => {
    if (!draft) {
      return calculateBookingPrice({
        unitPriceInr: 0,
        adults: 1,
        children: 0,
        privateGroup: false,
        addonIds: [],
      });
    }
    return calculateBookingPrice({
      unitPriceInr: unitPrice,
      adults: draft.adults,
      children: draft.children,
      privateGroup: draft.privateGroup,
      addonIds: draft.addonIds,
      couponCode: draft.couponCode,
      couponApplied: draft.couponApplied,
    });
  }, [draft, unitPrice]);

  useEffect(() => {
    if (!hydrated) return;
    if (!draft) {
      router.replace("/treks");
    }
  }, [draft, hydrated, router]);

  const payAdvance = () => {
    if (!draft) return;
    if (!draft.paymentMethod) {
      toast.error("Select a payment method");
      return;
    }

    startTransition(async () => {
      const id = createBookingId();
      const booking: SavedBooking = {
        id,
        trekSlug: draft.trekSlug,
        trekTitle: draft.trekTitle,
        departureDate: draft.departureDate,
        batchLabel: draft.batchLabel,
        adults: draft.adults,
        children: draft.children,
        privateGroup: draft.privateGroup,
        traveller: draft.traveller,
        addonIds: draft.addonIds,
        couponCode: pricing.couponCode,
        pricing,
        status: "upcoming",
        paymentStatus: "paid",
        paymentMethod: draft.paymentMethod,
        createdAt: new Date().toISOString(),
      };

      addBooking(booking);

      const result = await submitConfirmedBookingAction({
        bookingId: id,
        trekTitle: draft.trekTitle,
        trekSlug: draft.trekSlug,
        departureDate: draft.departureDate,
        adults: draft.adults,
        children: draft.children,
        customerName: draft.traveller.fullName,
        customerEmail: draft.traveller.email,
        customerPhone: draft.traveller.phone,
        city: draft.traveller.city,
        grandTotal: pricing.grandTotal,
        advancePayment: pricing.advancePayment,
        remainingAmount: pricing.remainingAmount,
        paymentMethod: draft.paymentMethod,
        couponCode: pricing.couponCode,
      });

      if (!result.success) {
        toast.info(result.message || "Booking saved locally. Email notification pending.");
      } else {
        toast.success("Payment successful");
      }

      clearDraft();
      router.push(`/payment-success?id=${encodeURIComponent(id)}`);
    });
  };

  const simulateFail = () => {
    router.push("/payment-failed");
  };

  if (!hydrated || !draft) {
    return (
      <section className="bg-[#F7F8F6] py-14">
        <Container className="max-w-3xl">
          <div className="space-y-3 rounded-2xl border border-[#e8ece6] bg-white p-6">
            <div className="h-8 animate-pulse rounded-lg bg-muted" />
            <div className="h-40 animate-pulse rounded-2xl bg-muted" />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-[#F7F8F6] py-10 md:py-14">
      <Container className="max-w-5xl">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#2D5A27]">
            Secure checkout
          </p>
          <h1 className="font-heading mt-1 text-2xl font-bold text-[#1A1A1A] md:text-3xl">
            Complete your payment
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Pay the advance now. Remaining balance is collected before departure.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <div className="rounded-2xl border border-[#e8ece6] bg-white p-5 md:p-6">
              <h2 className="font-heading text-lg font-bold text-[#1A1A1A]">Booking summary</h2>
              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Trek</dt>
                  <dd className="font-medium text-right">{draft.trekTitle}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Departure</dt>
                  <dd className="font-medium">
                    {draft.departureDate ? formatDate(draft.departureDate) : "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Batch</dt>
                  <dd className="font-medium">{draft.batchLabel}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Travellers</dt>
                  <dd className="font-medium">
                    {draft.adults} adult{draft.adults === 1 ? "" : "s"}
                    {draft.children > 0 ? `, ${draft.children} child` : ""}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Lead traveller</dt>
                  <dd className="font-medium">{draft.traveller.fullName || "—"}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-[#e8ece6] bg-white p-5 md:p-6">
              <h2 className="font-heading text-lg font-bold text-[#1A1A1A]">Payment method</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Gateway placeholders — select any method to continue.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  const selected = draft.paymentMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => patchDraft({ paymentMethod: method.id })}
                      className={cn(
                        "flex items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition",
                        selected
                          ? "border-[#2D5A27] bg-[#eef5ec] ring-1 ring-[#2D5A27]/30"
                          : "border-[#e8ece6] bg-white hover:border-[#2D5A27]/40",
                      )}
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#2D5A27]" />
                      <span>
                        <span className="block text-sm font-semibold text-[#1A1A1A]">
                          {method.label}
                        </span>
                        <span className="block text-xs text-muted-foreground">{method.hint}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              <div className="flex items-center gap-2 rounded-xl border border-[#e8ece6] bg-white px-3 py-2.5 text-xs font-medium text-[#333]">
                <ShieldCheck className="h-4 w-4 text-[#2D5A27]" />
                Secure Payment Badge
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-[#e8ece6] bg-white px-3 py-2.5 text-xs font-medium text-[#333]">
                <Lock className="h-4 w-4 text-[#2D5A27]" />
                SSL Protected
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-[#e8ece6] bg-white px-3 py-2.5 text-xs font-medium text-[#333]">
                <RotateCcw className="h-4 w-4 text-[#2D5A27]" />
                Money Back Guarantee
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <PriceSummary pricing={pricing} highlightTotal />
            <TrustBadges />
            <div className="rounded-2xl border border-[#e8ece6] bg-white p-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Advance due now</span>
                <span className="font-heading text-xl font-bold text-[#2D5A27]">
                  {formatCurrency(pricing.advancePayment)}
                </span>
              </div>
              <Button
                type="button"
                variant="primary"
                className="w-full"
                disabled={pending}
                loading={pending}
                onClick={payAdvance}
              >
                Pay Advance
              </Button>
              <Button
                type="button"
                variant="outline"
                className="mt-2 w-full"
                disabled={pending}
                onClick={simulateFail}
              >
                Simulate payment failure
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
