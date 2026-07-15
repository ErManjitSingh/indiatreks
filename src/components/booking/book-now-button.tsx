"use client";

import { useRouter } from "next/navigation";
import {
  type ButtonHTMLAttributes,
  type ReactNode,
  useCallback,
} from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useBookingUiStore } from "@/lib/booking/store";
import { cn } from "@/lib/utils";

interface BookNowButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  trekSlug: string;
  departureDate?: string;
  children?: ReactNode;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  asChild?: never;
}

function isDesktopViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(min-width: 768px)").matches;
}

/** Opens quick enquiry first. Full booking starts only after Advance Booking. */
export function BookNowButton({
  trekSlug,
  departureDate,
  children = "Book Now",
  variant = "accent",
  size,
  className,
  onClick,
  ...props
}: BookNowButtonProps) {
  const router = useRouter();
  const openSheet = useBookingUiStore((s) => s.openSheet);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;

      const query = departureDate
        ? `?date=${encodeURIComponent(departureDate)}`
        : "";

      if (isDesktopViewport()) {
        openSheet(trekSlug, { departureDate });
      } else {
        router.push(`/booking/${trekSlug}${query}`);
      }
    },
    [departureDate, onClick, openSheet, router, trekSlug],
  );

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn(className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
}
