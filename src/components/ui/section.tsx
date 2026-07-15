import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  spacing?: "none" | "sm" | "md" | "lg";
  children: ReactNode;
}

const spacingMap = {
  none: "py-0",
  sm: "py-12 md:py-16",
  md: "section-spacing",
  lg: "py-20 md:py-28 lg:py-32",
} as const;

export function Section({
  as: Comp = "section",
  spacing = "md",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Comp className={cn("relative w-full", spacingMap[spacing], className)} {...props}>
      {children}
    </Comp>
  );
}
