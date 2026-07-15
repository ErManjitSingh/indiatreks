"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { submitBookingEnquiryAction } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { formatCurrency } from "@/utils";
import { cn } from "@/lib/utils";

interface QuickEnquiryFormProps {
  trekSlug: string;
  trekTitle: string;
  basePriceInr?: number;
  onAdvanceBooking: () => void;
  onClose?: () => void;
  className?: string;
}

export function QuickEnquiryForm({
  trekSlug,
  trekTitle,
  basePriceInr,
  onAdvanceBooking,
  onClose,
  className,
}: QuickEnquiryFormProps) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    persons: "2",
  });

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const result = await submitBookingEnquiryAction({
      trekSlug,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      travelers: Math.max(1, Number(form.persons) || 1),
      preferredDate: new Date().toISOString().slice(0, 10),
      notes: `Quick enquiry from Book Now · Persons: ${form.persons} · Trek: ${trekTitle}`,
    });

    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    setSent(true);
    toast.success(result.message);
  };

  if (sent) {
    return (
      <div className={cn("flex h-full flex-col", className)}>
        <div className="flex flex-1 flex-col items-center justify-center px-2 py-8 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F5E9] text-[#2D5A27]">
            <CheckCircle2 className="h-8 w-8" aria-hidden />
          </div>
          <h2 className="font-heading mt-4 text-xl font-bold text-[#1A1A1A]">
            Query sent successfully
          </h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Our trek specialist will contact you shortly about{" "}
            <span className="font-semibold text-[#1A1A1A]">{trekTitle}</span>.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Want to lock your dates and pay advance now?
          </p>
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="mt-5 w-full max-w-sm"
            onClick={onAdvanceBooking}
          >
            Advance Booking
          </Button>
          {onClose ? (
            <Button type="button" variant="ghost" className="mt-2" onClick={onClose}>
              Close
            </Button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="shrink-0 border-b border-[#e8ece6] pb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#2D5A27]">
          Quick enquiry
        </p>
        <h2 className="font-heading mt-1 text-xl font-bold text-[#1A1A1A]">{trekTitle}</h2>
        {basePriceInr != null ? (
          <p className="mt-1 text-sm text-muted-foreground">
            From {formatCurrency(basePriceInr)} / person
          </p>
        ) : null}
      </div>

      <form className="mt-5 flex flex-1 flex-col gap-3" onSubmit={onSubmit}>
        <Input
          label="Full name"
          required
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Your name"
        />
        <Input
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          placeholder="you@email.com"
        />
        <Input
          label="Phone"
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
          placeholder="10-digit mobile"
        />
        <Input
          label="Total no. of persons"
          type="number"
          min={1}
          max={20}
          required
          value={form.persons}
          onChange={(e) => setForm((prev) => ({ ...prev, persons: e.target.value }))}
        />

        <div className="mt-auto space-y-2 pt-4">
          <Button type="submit" variant="primary" className="w-full" loading={loading}>
            Send Query
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Advance booking opens only after you send this query.
          </p>
        </div>
      </form>
    </div>
  );
}
