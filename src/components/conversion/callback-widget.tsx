"use client";

import { Phone, X } from "lucide-react";
import { useState } from "react";

import { submitCallbackAction } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const TIME_OPTIONS = [
  "Morning (9 AM – 12 PM)",
  "Afternoon (12 PM – 4 PM)",
  "Evening (4 PM – 8 PM)",
  "Anytime",
] as const;

export function CallbackWidget({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<{
    name: string;
    phone: string;
    preferredTime: string;
  }>({
    name: "",
    phone: "",
    preferredTime: TIME_OPTIONS[0],
  });

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const result = await submitCallbackAction(form);
    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    setForm({ name: "", phone: "", preferredTime: TIME_OPTIONS[0] });
    setOpen(false);
  };

  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-8 left-4 z-40 hidden md:block md:left-8",
        className,
      )}
    >
      {open ? (
        <div className="pointer-events-auto w-[min(92vw,20rem)] rounded-2xl border border-[#e8ece6] bg-white p-4 shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
          <div className="mb-3 flex items-start justify-between gap-2">
            <div>
              <p className="font-heading text-base font-bold text-[#1A1A1A]">
                Request Callback
              </p>
              <p className="text-xs text-[#6b7368]">
                Share your details — we&apos;ll call you shortly.
              </p>
            </div>
            <button
              type="button"
              aria-label="Close callback form"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-[#6b7368] transition hover:bg-[#F7F8F6] hover:text-[#1A1A1A]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <form className="space-y-2.5" onSubmit={onSubmit}>
            <Input
              label="Name"
              name="callback-name"
              required
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
            <Input
              label="Phone"
              name="callback-phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            />
            <div className="space-y-1.5">
              <label
                htmlFor="callback-time"
                className="text-sm font-medium text-foreground"
              >
                Preferred Time
              </label>
              <select
                id="callback-time"
                required
                value={form.preferredTime}
                onChange={(e) =>
                  setForm((p) => ({ ...p, preferredTime: e.target.value }))
                }
                className="flex h-12 w-full rounded-xl border border-input bg-card px-4 text-sm text-foreground shadow-xs focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
              >
                {TIME_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" variant="primary" className="w-full" loading={loading}>
              Request Callback
            </Button>
          </form>
        </div>
      ) : (
        <Button
          type="button"
          variant="primary"
          size="md"
          className="pointer-events-auto shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
          onClick={() => setOpen(true)}
        >
          <Phone className="h-4 w-4" aria-hidden />
          Request Callback
        </Button>
      )}
    </div>
  );
}
