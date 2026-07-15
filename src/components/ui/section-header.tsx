import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 md:mb-14",
        align === "center" && "mx-auto max-w-3xl items-center text-center",
        action && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("space-y-3", align === "center" && "flex flex-col items-center")}>
        {eyebrow ? <Badge variant="soft">{eyebrow}</Badge> : null}
        <Heading as="h2" size="lg">
          {title}
        </Heading>
        {description ? (
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
