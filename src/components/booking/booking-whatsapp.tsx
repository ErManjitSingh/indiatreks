"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { buildTrekWhatsAppHref } from "@/lib/booking/whatsapp";
import { cn } from "@/lib/utils";

interface BookingWhatsAppProps extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  trekTitle: string;
  departure?: string;
  price?: number | string;
  children?: ReactNode;
}

export function BookingWhatsApp({
  trekTitle,
  departure,
  price,
  className,
  children,
  ...props
}: BookingWhatsAppProps) {
  const href = buildTrekWhatsAppHref(trekTitle, departure, price);

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className)}
      {...props}
    >
      {children ?? "Chat on WhatsApp"}
    </Link>
  );
}
