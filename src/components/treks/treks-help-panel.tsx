"use client";

import { MessageCircle, Phone, Scale } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import { useCompareStore, useUiStore } from "@/lib/store";

export function TreksHelpPanel() {
  const hydrated = useHasHydrated();
  const compareCount = useCompareStore((state) => state.trekIds.length);
  const displayCount = hydrated ? compareCount : 0;
  const { setTrekCompareOpen } = useUiStore();
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hi! I need help choosing the right Himalayan trek.",
  )}`;
  const callHref = `tel:${siteConfig.phone.replace(/\s/g, "")}`;

  return (
    <aside className="space-y-4" aria-label="Trek help and compare">
      <div className="rounded-xl border border-border bg-white p-4 shadow-xs">
        <h2 className="font-heading text-base font-bold text-[#1A1A1A]">Need Help Choosing?</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Talk to our Trek Experts for a free trail recommendation.
        </p>

        <div className="mt-4 space-y-2">
          <Button asChild className="w-full border border-[#d0d5cc] bg-white text-[#1A1A1A] hover:bg-[#F7F8F6]">
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" aria-hidden />
              Chat on WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full border-border bg-white">
            <a href={callHref}>
              <Phone className="h-4 w-4" aria-hidden />
              Call Now
            </a>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-white p-4 shadow-xs">
        <div className="flex items-center gap-2">
          <Scale className="h-4 w-4 text-primary" aria-hidden />
          <h2 className="font-heading text-base font-bold text-[#1A1A1A]">Compare Treks</h2>
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {displayCount} {displayCount === 1 ? "item" : "items"} selected
        </p>
        {displayCount > 0 ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3 w-full"
            onClick={() => setTrekCompareOpen(true)}
          >
            Open Compare
          </Button>
        ) : (
          <p className="mt-3 text-xs text-muted-foreground">
            Use the compare bar after selecting treks.
          </p>
        )}
        <Link
          href="/treks"
          className="mt-3 inline-block text-xs font-semibold text-primary hover:underline"
        >
          Browse all treks →
        </Link>
      </div>
    </aside>
  );
}
