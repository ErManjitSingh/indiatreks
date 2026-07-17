import Link from "next/link";
import { Flame } from "lucide-react";

import { Container } from "@/components/ui/container";
import { popularTrekSearches } from "@/data/trek-listing-meta";

export function PopularSearches() {
  return (
    <div className="bg-[#F7F8F6] py-3.5">
      <Container className="flex flex-wrap items-center gap-2">
        <span className="mr-1 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
          <Flame className="h-3.5 w-3.5 text-[#EA580C]" aria-hidden />
          Popular searches
        </span>
        {popularTrekSearches.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-full border border-[#E5E7EB] bg-white px-3.5 py-1.5 text-sm font-medium text-[#111827] shadow-sm transition hover:border-[#2D5A27]/40 hover:text-[#2D5A27]"
          >
            {item.label}
          </Link>
        ))}
      </Container>
    </div>
  );
}
