"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useUiStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface StickyBookingButtonProps {
  href?: string;
  label?: string;
  className?: string;
}

export function StickyBookingButton({
  href = "/booking",
  label = "Book Now",
  className,
}: StickyBookingButtonProps) {
  const { setEnquireModalOpen } = useUiStore();

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-xl md:hidden",
        className,
      )}
    >
      <div className="mx-auto flex max-w-lg gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => setEnquireModalOpen(true)}
        >
          Enquire
        </Button>
        <Button asChild variant="accent" className="flex-1">
          <Link href={href}>{label}</Link>
        </Button>
      </div>
    </div>
  );
}
