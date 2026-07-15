import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const headingVariants = cva("font-heading tracking-tight text-balance text-foreground", {
  variants: {
    size: {
      xs: "text-lg font-semibold",
      sm: "text-xl font-semibold md:text-2xl",
      md: "text-2xl font-bold md:text-3xl",
      lg: "text-3xl font-bold md:text-4xl lg:text-5xl",
      xl: "text-4xl font-extrabold md:text-5xl lg:text-6xl",
      display: "text-5xl font-extrabold md:text-6xl lg:text-7xl",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: ElementType;
}

export function Heading({ as: Comp = "h2", size, className, ...props }: HeadingProps) {
  return <Comp className={cn(headingVariants({ size }), className)} {...props} />;
}
