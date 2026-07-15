"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useRef,
  type ButtonHTMLAttributes,
  type MouseEvent,
} from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background",
  {
    variants: {
      variant: {
        primary:
          "border border-[#244820] bg-[#2D5A27] text-white shadow-sm hover:bg-[#244820] hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "border border-[#d0d5cc] bg-white text-[#1A1A1A] shadow-sm hover:bg-[#F7F8F6] hover:scale-[1.02] active:scale-[0.98]",
        accent:
          "border border-[#244820] bg-[#2D5A27] text-white shadow-sm hover:bg-[#244820] hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted hover:scale-[1.02] active:scale-[0.98]",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        link: "rounded-none bg-transparent px-0 text-primary underline-offset-4 hover:underline",
        gradient:
          "border border-[#244820] bg-[#2D5A27] text-white shadow-sm hover:bg-[#244820] hover:scale-[1.02] active:scale-[0.98]",
        glass:
          "glass text-foreground shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  ripple?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      ripple = false,
      children,
      onClick,
      disabled,
      ...props
    },
    ref,
  ) => {
    const localRef = useRef<HTMLButtonElement | null>(null);

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        if (ripple && localRef.current) {
          const rect = localRef.current.getBoundingClientRect();
          const circle = document.createElement("span");
          const diameter = Math.max(rect.width, rect.height);
          circle.style.width = `${diameter}px`;
          circle.style.height = `${diameter}px`;
          circle.style.left = `${event.clientX - rect.left - diameter / 2}px`;
          circle.style.top = `${event.clientY - rect.top - diameter / 2}px`;
          circle.className =
            "pointer-events-none absolute rounded-full bg-white/30 animate-[ripple_0.6s_linear]";
          localRef.current.appendChild(circle);
          window.setTimeout(() => circle.remove(), 600);
        }
        onClick?.(event);
      },
      [onClick, ripple],
    );

    if (asChild) {
      return (
        <Slot className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { buttonVariants };
