"use client";

import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Zero-JS animation wrappers (Framer removed). Same DOM, no motion runtime. */
export function FadeUp({
  children,
  className,
  delay: _delay,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode; delay?: number }) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}

export function Stagger({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}
