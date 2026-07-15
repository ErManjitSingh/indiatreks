import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-[var(--container-max)]",
    },
    padding: {
      none: "px-0",
      sm: "px-4",
      md: "px-[clamp(1rem,4vw,2rem)]",
      lg: "px-[clamp(1.25rem,5vw,3rem)]",
    },
  },
  defaultVariants: {
    size: "full",
    padding: "md",
  },
});

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export function Container({ className, size, padding, ...props }: ContainerProps) {
  return <div className={cn(containerVariants({ size, padding }), className)} {...props} />;
}
