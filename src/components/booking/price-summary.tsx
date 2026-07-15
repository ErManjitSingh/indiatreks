"use client";

import { formatCurrency } from "@/utils";
import type { BookingPriceBreakdown } from "@/lib/booking/types";
import { cn } from "@/lib/utils";

interface PriceSummaryProps {
  pricing: BookingPriceBreakdown;
  className?: string;
  highlightTotal?: boolean;
}

function Row({
  label,
  value,
  mute,
  strong,
}: {
  label: string;
  value: string;
  mute?: boolean;
  strong?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 text-sm",
        mute && "text-muted-foreground",
        strong && "font-semibold text-[#1A1A1A]",
      )}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export function PriceSummary({ pricing, className, highlightTotal }: PriceSummaryProps) {
  return (
    <div className={cn("space-y-2.5 rounded-2xl border border-[#e8ece6] bg-[#F7F8F6] p-4", className)}>
      <Row label="Base price" value={formatCurrency(pricing.basePrice)} />
      {pricing.privateGroupFee > 0 ? (
        <Row label="Private group" value={formatCurrency(pricing.privateGroupFee)} />
      ) : null}
      {pricing.addonsTotal > 0 ? (
        <Row label="Add-ons" value={formatCurrency(pricing.addonsTotal)} />
      ) : null}
      {pricing.discount > 0 ? (
        <Row
          label={pricing.couponCode ? `Discount (${pricing.couponCode})` : "Discount"}
          value={`−${formatCurrency(pricing.discount)}`}
        />
      ) : null}
      <Row label="GST (5%)" value={formatCurrency(pricing.gst)} mute />
      <Row label="Convenience fee" value={formatCurrency(pricing.convenienceFee)} mute />
      <div className="border-t border-[#dfe5da] pt-2.5">
        <Row
          label="Grand total"
          value={formatCurrency(pricing.grandTotal)}
          strong
        />
      </div>
      <Row label="Advance payment" value={formatCurrency(pricing.advancePayment)} />
      <Row label="Remaining amount" value={formatCurrency(pricing.remainingAmount)} mute />
      {highlightTotal ? (
        <p className="pt-1 text-xs text-muted-foreground">
          Pay advance now. Remaining is collected before departure.
        </p>
      ) : null}
    </div>
  );
}
