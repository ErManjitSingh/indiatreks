import Link from "next/link";

import { Container } from "@/components/ui/container";
import { popularTrekSearches } from "@/data/treks";

export function PopularSearches() {
  return (
    <div className="border-b border-border bg-card/60 py-4">
      <Container className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Popular searches
        </span>
        {popularTrekSearches.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
          >
            {item.label}
          </Link>
        ))}
      </Container>
    </div>
  );
}
