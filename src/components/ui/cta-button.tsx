import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CtaButtonProps extends ComponentProps<typeof Button> {
  href?: string;
  showArrow?: boolean;
}

export function CtaButton({
  href,
  showArrow = true,
  children,
  className,
  ...props
}: CtaButtonProps) {
  const content = (
    <>
      {children}
      {showArrow ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
    </>
  );

  if (href) {
    return (
      <Button asChild className={cn(className)} {...props}>
        <Link href={href}>{content}</Link>
      </Button>
    );
  }

  return (
    <Button className={cn(className)} {...props}>
      {content}
    </Button>
  );
}
