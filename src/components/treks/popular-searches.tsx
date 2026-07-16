import Link from "next/link";

import { Container } from "@/components/ui/container";
import { popularTrekSearches } from "@/data/treks";

export function PopularSearches() {
  return (
    <div className="border-b border-[#E8ECF1] bg-white py-3.5 md:bg-[#F7F8F6]">
      <Container className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
          Popular searches
        </span>
        {popularTrekSearches.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm font-medium text-[#111827] shadow-sm transition hover:border-[#22C55E]/50 hover:text-[#166534]"
          >
            {item.label}
          </Link>
        ))}
      </Container>
    </div>
  );
}
