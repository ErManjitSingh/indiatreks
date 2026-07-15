"use client";

import { Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { buildGeneralWhatsAppHref } from "@/lib/booking/whatsapp";
import { cn } from "@/lib/utils";

const HIDDEN_PREFIXES = [
  "/checkout",
  "/payment-success",
  "/payment-failed",
  "/booking",
] as const;

function shouldHide(pathname: string) {
  if (/^\/treks\/.+/.test(pathname)) return true;
  return HIDDEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function hasMobileBottomNav(pathname: string) {
  const isTreksListing = pathname === "/treks";
  const isTrekDetail = /^\/treks\/.+/.test(pathname);
  return !isTreksListing && !isTrekDetail;
}

export function StickyContactBar() {
  const pathname = usePathname();

  if (shouldHide(pathname)) return null;

  const navVisible = hasMobileBottomNav(pathname);
  const telHref = `tel:${siteConfig.phone.replace(/\s/g, "")}`;
  const waHref = buildGeneralWhatsAppHref(
    "Hi! I want help choosing a trek.",
  );

  return (
    <div
      className={cn(
        "fixed right-3 z-40 flex flex-col gap-2 md:hidden",
        navVisible ? "bottom-20" : "bottom-4",
      )}
      aria-label="Quick contact"
    >
      <Link
        href={telHref}
        aria-label="Call us"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#244820] bg-[#2D5A27] text-white shadow-[0_8px_20px_rgba(45,90,39,0.35)]"
      >
        <Phone className="h-5 w-5" aria-hidden />
      </Link>
      <Link
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#d0d5cc] bg-white text-[#1A1A1A] shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
      >
        <WhatsAppGlyph className="h-5 w-5" />
      </Link>
    </div>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.33.16 11.9c0 2.1.55 4.14 1.6 5.95L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44ZM12.07 21.15h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.64-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.98c0 5.45-4.44 9.88-9.89 9.88Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}
