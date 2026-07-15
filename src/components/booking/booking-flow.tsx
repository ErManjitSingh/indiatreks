"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Tag, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PriceSummary } from "@/components/booking/price-summary";
import { TrustBadges } from "@/components/booking/trust-badges";
import {
  BATCH_OPTIONS,
  BOOKING_ADDONS,
  BOOKING_COUPONS,
} from "@/lib/booking/constants";
import { calculateBookingPrice } from "@/lib/booking/pricing";
import { useBookingDraftStore } from "@/lib/booking/store";
import type { BookingFlowStep, BookingGender } from "@/lib/booking/types";
import { formatCurrency, formatDate } from "@/utils";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/toast";
import type { TrekDeparture } from "@/types/trek-detail";

const STEPS = [
  "Departure",
  "Traveller",
  "Add-ons",
  "Summary",
  "Review",
] as const;

interface BookingFlowProps {
  trekSlug: string;
  trekTitle: string;
  basePriceInr: number;
  departures: TrekDeparture[];
  mode?: "page" | "drawer";
  onClose?: () => void;
  initialDate?: string;
}

export function BookingFlow({
  trekSlug,
  trekTitle,
  basePriceInr,
  departures,
  mode = "page",
  onClose,
  initialDate,
}: BookingFlowProps) {
  const router = useRouter();
  const { draft, initDraft, patchDraft, setStep } = useBookingDraftStore();
  const [couponInput, setCouponInput] = useState("");
  const [couponPulse, setCouponPulse] = useState(false);

  useEffect(() => {
    useBookingDraftStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const storedDate =
      typeof window !== "undefined"
        ? sessionStorage.getItem(`ihd-booking-date:${trekSlug}`)
        : null;
    const preferredDate = initialDate || storedDate || undefined;
    if (storedDate) {
      sessionStorage.removeItem(`ihd-booking-date:${trekSlug}`);
    }

    const openDeparture =
      departures.find((d) => d.date === preferredDate && d.status !== "sold-out") ??
      departures.find((d) => d.status !== "sold-out") ??
      departures[0];

    if (!draft || draft.trekSlug !== trekSlug) {
      initDraft({
        trekSlug,
        trekTitle,
        departureId: openDeparture?.id ?? "",
        departureDate: openDeparture?.date ?? "",
      });
    } else if (preferredDate && draft.departureDate !== preferredDate) {
      const match = departures.find((d) => d.date === preferredDate);
      if (match) {
        patchDraft({ departureId: match.id, departureDate: match.date });
      }
    }
  }, [departures, draft, initDraft, initialDate, patchDraft, trekSlug, trekTitle]);

  const active = draft?.trekSlug === trekSlug ? draft : null;

  const selectedDeparture =
    departures.find((d) => d.id === active?.departureId) ??
    departures.find((d) => d.date === active?.departureDate);

  const unitPrice = selectedDeparture?.priceInr ?? basePriceInr;

  const pricing = useMemo(() => {
    if (!active) {
      return calculateBookingPrice({
        unitPriceInr: unitPrice,
        adults: 1,
        children: 0,
        privateGroup: false,
        addonIds: [],
      });
    }
    return calculateBookingPrice({
      unitPriceInr: unitPrice,
      adults: active.adults,
      children: active.children,
      privateGroup: active.privateGroup,
      addonIds: active.addonIds,
      couponCode: active.couponCode,
      couponApplied: active.couponApplied,
    });
  }, [active, unitPrice]);

  if (!active) {
    return (
      <div className="space-y-3 p-4">
        <div className="h-8 animate-pulse rounded-lg bg-muted" />
        <div className="h-40 animate-pulse rounded-2xl bg-muted" />
      </div>
    );
  }

  const step = active.step;

  const goNext = () => {
    if (step === 0) {
      if (!active.departureDate) {
        toast.error("Select a departure date");
        return;
      }
      if (active.adults + active.children < 1) {
        toast.error("Add at least one traveller");
        return;
      }
    }
    if (step === 1) {
      const t = active.traveller;
      if (!t.fullName || !t.phone || !t.email || !t.city || !t.age || !t.gender) {
        toast.error("Please complete traveller details");
        return;
      }
    }
    if (step === 4 && !active.termsAccepted) {
      toast.error("Please accept terms & cancellation policy");
      return;
    }
    if (step < 4) {
      setStep((step + 1) as BookingFlowStep);
      return;
    }
    router.push("/checkout");
    onClose?.();
  };

  const goBack = () => {
    if (step === 0) {
      onClose?.();
      return;
    }
    setStep((step - 1) as BookingFlowStep);
  };

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!BOOKING_COUPONS[code]) {
      toast.error("Invalid coupon code");
      patchDraft({ couponApplied: false, couponCode: "" });
      return;
    }
    patchDraft({ couponCode: code, couponApplied: true });
    setCouponPulse(true);
    toast.success(`${BOOKING_COUPONS[code].label} applied`);
    window.setTimeout(() => setCouponPulse(false), 900);
  };

  const toggleAddon = (id: string) => {
    const exists = active.addonIds.includes(id);
    patchDraft({
      addonIds: exists
        ? active.addonIds.filter((item) => item !== id)
        : [...active.addonIds, id],
    });
  };

  return (
    <div className={cn("flex h-full flex-col", mode === "page" && "min-h-[70vh]")}>
      <div className="shrink-0 border-b border-[#e8ece6] pb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#2D5A27]">
              Book your trek
            </p>
            <h2 className="font-heading mt-1 text-xl font-bold text-[#1A1A1A]">{trekTitle}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              From {formatCurrency(basePriceInr)} / person
            </p>
          </div>
          {mode === "drawer" && onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
              aria-label="Close booking"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
        <ol className="mt-4 flex gap-1.5">
          {STEPS.map((label, index) => (
            <li
              key={label}
              className={cn(
                "flex-1 rounded-full px-1 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wide",
                index <= step ? "bg-[#2D5A27] text-white" : "bg-muted text-muted-foreground",
              )}
            >
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{index + 1}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        {step === 0 ? (
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">Select departure date</label>
              <div className="grid gap-2 sm:grid-cols-2">
                {departures.map((dep) => {
                  const selected = active.departureId === dep.id || active.departureDate === dep.date;
                  const sold = dep.status === "sold-out";
                  return (
                    <button
                      key={dep.id}
                      type="button"
                      disabled={sold}
                      onClick={() =>
                        patchDraft({
                          departureId: dep.id,
                          departureDate: dep.date,
                        })
                      }
                      className={cn(
                        "rounded-xl border px-3 py-3 text-left transition",
                        selected
                          ? "border-[#2D5A27] bg-[#eef5ec]"
                          : "border-[#e8ece6] hover:border-[#2D5A27]/40",
                        sold && "cursor-not-allowed opacity-50",
                      )}
                    >
                      <div className="text-sm font-semibold">{formatDate(dep.date)}</div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {sold ? "Sold out" : `${dep.seats} seats · ${formatCurrency(dep.priceInr)}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Select batch</label>
              <div className="space-y-2">
                {BATCH_OPTIONS.map((batch) => (
                  <button
                    key={batch.id}
                    type="button"
                    onClick={() => patchDraft({ batchLabel: batch.label })}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm",
                      active.batchLabel === batch.label
                        ? "border-[#2D5A27] bg-[#eef5ec] font-semibold"
                        : "border-[#e8ece6]",
                    )}
                  >
                    {batch.label}
                    {active.batchLabel === batch.label ? (
                      <Check className="h-4 w-4 text-[#2D5A27]" />
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-1.5 text-sm">
                <span className="font-medium">Adults</span>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={active.adults}
                  onChange={(e) =>
                    patchDraft({ adults: Math.max(1, Number(e.target.value) || 1) })
                  }
                  className="h-11 w-full rounded-xl border border-[#d0d5cc] px-3 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                />
              </label>
              <label className="space-y-1.5 text-sm">
                <span className="font-medium">Children</span>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={active.children}
                  onChange={(e) =>
                    patchDraft({ children: Math.max(0, Number(e.target.value) || 0) })
                  }
                  className="h-11 w-full rounded-xl border border-[#d0d5cc] px-3 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                />
              </label>
            </div>

            <label className="flex items-center justify-between rounded-xl border border-[#e8ece6] px-3 py-3">
              <div>
                <div className="text-sm font-semibold">Private group</div>
                <div className="text-xs text-muted-foreground">Exclusive batch · +20%</div>
              </div>
              <input
                type="checkbox"
                checked={active.privateGroup}
                onChange={(e) => patchDraft({ privateGroup: e.target.checked })}
                className="h-5 w-5 accent-[#2D5A27]"
              />
            </label>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["fullName", "Full name", "text"],
                ["phone", "Phone", "tel"],
                ["email", "Email", "email"],
                ["city", "City", "text"],
                ["emergencyContact", "Emergency contact", "tel"],
                ["age", "Age", "number"],
                ["nationality", "Nationality", "text"],
              ] as const
            ).map(([key, label, type]) => (
              <Input
                key={key}
                label={label}
                type={type}
                required
                value={active.traveller[key]}
                onChange={(e) =>
                  patchDraft({
                    traveller: { ...active.traveller, [key]: e.target.value },
                  })
                }
              />
            ))}
            <label className="space-y-1.5 text-sm sm:col-span-2">
              <span className="font-medium">Gender</span>
              <select
                value={active.traveller.gender}
                onChange={(e) =>
                  patchDraft({
                    traveller: {
                      ...active.traveller,
                      gender: e.target.value as BookingGender | "",
                    },
                  })
                }
                className="h-11 w-full rounded-xl border border-[#d0d5cc] bg-white px-3 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-3">
            {BOOKING_ADDONS.map((addon) => {
              const selected = active.addonIds.includes(addon.id);
              return (
                <button
                  key={addon.id}
                  type="button"
                  onClick={() => toggleAddon(addon.id)}
                  className={cn(
                    "flex w-full items-start justify-between gap-3 rounded-xl border px-3 py-3 text-left transition",
                    selected ? "border-[#2D5A27] bg-[#eef5ec]" : "border-[#e8ece6]",
                  )}
                >
                  <div>
                    <div className="text-sm font-semibold">{addon.name}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {addon.description}
                    </div>
                  </div>
                  <div className="shrink-0 text-sm font-semibold text-[#2D5A27]">
                    {formatCurrency(addon.priceInr)}
                  </div>
                </button>
              );
            })}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4">
            <div
              className={cn(
                "rounded-2xl border border-[#e8ece6] p-3 transition",
                couponPulse && "animate-pulse border-[#2D5A27] bg-[#eef5ec]",
              )}
            >
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Tag className="h-4 w-4 text-[#2D5A27]" />
                Apply coupon
              </div>
              <div className="flex gap-2">
                <input
                  value={couponInput || active.couponCode}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="HIMALAYA10 / EXIT10"
                  className="h-11 flex-1 rounded-xl border border-[#d0d5cc] px-3 text-sm outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                />
                {active.couponApplied ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setCouponInput("");
                      patchDraft({ couponApplied: false, couponCode: "" });
                    }}
                  >
                    Remove
                  </Button>
                ) : (
                  <Button type="button" variant="primary" onClick={applyCoupon}>
                    Apply
                  </Button>
                )}
              </div>
            </div>
            <PriceSummary pricing={pricing} highlightTotal />
            <TrustBadges />
          </div>
        ) : null}

        {step === 4 ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#e8ece6] p-4 text-sm">
              <h3 className="font-heading text-base font-bold">Review booking</h3>
              <dl className="mt-3 space-y-2">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Trek</dt>
                  <dd className="font-medium">{trekTitle}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Departure</dt>
                  <dd className="font-medium">
                    {active.departureDate ? formatDate(active.departureDate) : "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Batch</dt>
                  <dd className="font-medium">{active.batchLabel}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Travellers</dt>
                  <dd className="font-medium">
                    {active.adults} adult{active.adults === 1 ? "" : "s"}
                    {active.children > 0 ? `, ${active.children} child` : ""}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Lead traveller</dt>
                  <dd className="font-medium">{active.traveller.fullName || "—"}</dd>
                </div>
              </dl>
            </div>
            <PriceSummary pricing={pricing} highlightTotal />
            <label className="flex items-start gap-3 rounded-xl border border-[#e8ece6] p-3 text-sm">
              <input
                type="checkbox"
                checked={active.termsAccepted}
                onChange={(e) => patchDraft({ termsAccepted: e.target.checked })}
                className="mt-0.5 h-4 w-4 accent-[#2D5A27]"
              />
              <span>
                I agree to the Terms & Conditions and Cancellation Policy of{" "}
                {trekTitle} booking.
              </span>
            </label>
          </div>
        ) : null}
      </div>

      <div className="sticky bottom-0 shrink-0 border-t border-[#e8ece6] bg-white pt-3">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {step === 4 ? "Advance due" : "Estimated total"}
          </span>
          <span className="font-heading text-lg font-bold text-[#2D5A27]">
            {formatCurrency(step === 4 ? pricing.advancePayment : pricing.grandTotal)}
          </span>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" className="flex-1" onClick={goBack}>
            {step === 0 ? (mode === "drawer" ? "Close" : "Back") : "Back"}
          </Button>
          <Button type="button" variant="primary" className="flex-1" onClick={goNext}>
            {step === 4 ? "Proceed to payment" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
