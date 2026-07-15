"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { submitBookingEnquiryAction } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import type { TrekDetail } from "@/types/trek-detail";
import { formatCurrency, formatDate } from "@/utils";
import { cn } from "@/lib/utils";

const bookingSchema = z.object({
  date: z.string().min(1, "Select a departure date"),
  travelers: z.number().int().min(1).max(20),
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone"),
  notes: z.string().optional(),
  coupon: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const steps = ["Date", "Travelers", "Details", "Summary"] as const;

interface TrekBookingFormProps {
  trek: TrekDetail;
}

export function TrekBookingForm({ trek }: TrekBookingFormProps) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: trek.departures.find((d) => d.status !== "sold-out")?.date ?? "",
      travelers: 2,
      name: "",
      email: "",
      phone: "",
      notes: "",
      coupon: "",
    },
    mode: "onTouched",
  });

  const values = form.watch();
  const selectedDeparture = trek.departures.find((d) => d.date === values.date);
  const unitPrice = selectedDeparture?.priceInr ?? trek.basePriceInr;

  const discount = useMemo(() => {
    let amount = 0;
    if (trek.earlyBirdDiscountPercent) {
      amount += Math.round((unitPrice * trek.earlyBirdDiscountPercent) / 100);
    }
    if (values.coupon?.trim().toUpperCase() === "HIMALAYA10") {
      amount += Math.round(unitPrice * 0.1);
    }
    return amount;
  }, [trek.earlyBirdDiscountPercent, unitPrice, values.coupon]);

  const total = Math.max((unitPrice - discount) * (values.travelers || 1), 0);

  const next = async () => {
    const fields: Array<keyof BookingFormValues> =
      step === 0 ? ["date"] : step === 1 ? ["travelers"] : step === 2 ? ["name", "email", "phone"] : [];
    const valid = fields.length ? await form.trigger(fields) : true;
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true);
    const result = await submitBookingEnquiryAction({
      trekSlug: trek.slug,
      name: data.name,
      email: data.email,
      phone: data.phone,
      travelers: data.travelers,
      preferredDate: data.date,
      notes: `${data.notes ?? ""}${data.coupon ? ` | Coupon: ${data.coupon}` : ""}`,
    });
    setLoading(false);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success(result.message);
    setStep(0);
    form.reset({
      ...form.getValues(),
      notes: "",
      coupon: "",
    });
  });

  return (
    <section
      id="booking"
      className="rounded-3xl border border-border bg-card p-5 shadow-md md:p-6"
      aria-label="Booking form"
    >
      <h2 className="font-heading text-xl font-bold">Book {trek.title}</h2>
      <ol className="mt-4 flex gap-2">
        {steps.map((label, index) => (
          <li
            key={label}
            className={cn(
              "flex-1 rounded-full px-2 py-1.5 text-center text-[11px] font-semibold uppercase tracking-wide",
              index <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
            )}
          >
            {label}
          </li>
        ))}
      </ol>

      <form className="mt-5 space-y-4" onSubmit={onSubmit}>
        {step === 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-medium">Select Date</p>
            <div className="grid gap-2">
              {trek.departures.map((dep) => (
                <label
                  key={dep.id}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-xl border px-3 py-3 text-sm transition",
                    values.date === dep.date
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50",
                    dep.status === "sold-out" && "cursor-not-allowed opacity-50",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={dep.date}
                      disabled={dep.status === "sold-out"}
                      checked={values.date === dep.date}
                      onChange={() => form.setValue("date", dep.date, { shouldValidate: true })}
                    />
                    {formatDate(dep.date)}
                  </span>
                  <span className="font-semibold">{formatCurrency(dep.priceInr)}</span>
                </label>
              ))}
            </div>
            {form.formState.errors.date ? (
              <p className="text-xs text-destructive">{form.formState.errors.date.message}</p>
            ) : null}
          </div>
        ) : null}

        {step === 1 ? (
          <Input
            label="Number of travelers"
            type="number"
            min={1}
            max={20}
            error={form.formState.errors.travelers?.message}
            {...form.register("travelers", { valueAsNumber: true })}
          />
        ) : null}

        {step === 2 ? (
          <div className="space-y-3">
            <Input
              label="Full name"
              error={form.formState.errors.name?.message}
              {...form.register("name")}
            />
            <Input
              label="Email"
              type="email"
              error={form.formState.errors.email?.message}
              {...form.register("email")}
            />
            <Input
              label="Phone"
              type="tel"
              error={form.formState.errors.phone?.message}
              {...form.register("phone")}
            />
            <Textarea label="Notes (optional)" {...form.register("notes")} />
            <Input
              label="Coupon code"
              hint="Try HIMALAYA10"
              {...form.register("coupon")}
            />
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-3 rounded-2xl bg-muted/50 p-4 text-sm">
            <Row label="Trek" value={trek.title} />
            <Row label="Date" value={values.date ? formatDate(values.date) : "—"} />
            <Row label="Travelers" value={String(values.travelers || 0)} />
            <Row label="Base" value={formatCurrency(unitPrice * (values.travelers || 1))} />
            <Row label="Discounts" value={`- ${formatCurrency(discount * (values.travelers || 1))}`} />
            <Row label="Estimated total" value={formatCurrency(total)} strong />
            <p className="text-xs text-muted-foreground">{trek.taxNote}</p>
            {trek.groupDiscountNote ? (
              <p className="text-xs text-muted-foreground">{trek.groupDiscountNote}</p>
            ) : null}
          </div>
        ) : null}

        <div className="flex gap-2 pt-2">
          {step > 0 ? (
            <Button type="button" variant="outline" className="flex-1" onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          ) : null}
          {step < steps.length - 1 ? (
            <Button type="button" variant="primary" className="flex-1" onClick={next}>
              Continue
            </Button>
          ) : (
            <Button type="submit" variant="accent" className="flex-1" loading={loading}>
              Confirm Booking Request
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className={strong ? "font-heading text-base font-bold" : "font-medium"}>{value}</span>
    </div>
  );
}
