"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const SAMPLE_BOOKINGS = [
  "Rahul from Delhi booked Kedarkantha Trek.",
  "Priya from Mumbai booked Hampta Pass Trek.",
  "Amit from Bangalore booked Triund Trek.",
  "Sneha from Pune booked Sar Pass Trek.",
  "Vikram from Hyderabad booked Beas Kund Trek.",
  "Ananya from Jaipur booked Kheerganga Trek.",
  "Rohan from Chandigarh booked Bhrigu Lake Trek.",
] as const;

const CYCLE_MS = 12_000;
const VISIBLE_MS = 4_000;

export function RecentBookingsToast({ className }: { className?: string }) {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    let dismissTimer: ReturnType<typeof setTimeout> | undefined;

    const showNext = () => {
      setIndex((prev) => (prev + 1) % SAMPLE_BOOKINGS.length);
      setVisible(true);
      dismissTimer = setTimeout(() => setVisible(false), VISIBLE_MS);
    };

    const startDelay = setTimeout(showNext, 3_000);
    const cycle = setInterval(showNext, CYCLE_MS);

    return () => {
      clearTimeout(startDelay);
      clearInterval(cycle);
      if (dismissTimer) clearTimeout(dismissTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed bottom-24 left-4 z-40 hidden max-w-[18rem] animate-fade-in rounded-xl border border-[#e8ece6] bg-white/95 px-3.5 py-2.5 text-sm text-[#1A1A1A] shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm md:left-8 md:block",
        className,
      )}
    >
      <p className="flex items-start gap-2">
        <span
          className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#2D5A27]"
          aria-hidden
        />
        <span>{SAMPLE_BOOKINGS[index]}</span>
      </p>
    </div>
  );
}
