import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { trekImages } from "@/constants/trek-images";
import { popularTrekSearches } from "@/data/trek-listing-meta";

const chipImages = [
  trekImages.mountains1,
  trekImages.mountains2,
  trekImages.mountains3,
  trekImages.landscape1,
  trekImages.landscape2,
  trekImages.landscape3,
  trekImages.camp1,
  trekImages.forest1,
  trekImages.meadow1,
  trekImages.india1,
  trekImages.camp2,
] as const;

export function PopularSearches() {
  return (
    <div className="bg-transparent py-1 md:bg-[#F7F8F6] md:py-3.5">
      {/* Mobile — circular chips */}
      <div className="md:hidden">
        <div className="mb-3 flex items-center justify-between px-4">
          <h2 className="font-heading text-[15px] font-bold text-[#122016]">Popular Searches</h2>
          <Link href="/treks" className="text-[12px] font-semibold text-[#2D5A27]">
            View All &gt;
          </Link>
        </div>
        <div className="-mx-0 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex w-max gap-4">
            {popularTrekSearches.map((item, index) => (
              <li key={item.label} className="w-[4.5rem]">
                <Link href={item.href} className="flex flex-col items-center gap-1.5 text-center">
                  <span className="relative block h-14 w-14 overflow-hidden rounded-full ring-2 ring-[#E8ECE6]">
                    <Image
                      src={chipImages[index % chipImages.length]}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </span>
                  <span className="line-clamp-2 text-[10px] font-semibold leading-tight text-[#314034]">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Desktop — pill chips */}
      <Container className="hidden flex-wrap items-center gap-2 md:flex">
        <span className="mr-1 text-[11px] font-semibold tracking-[0.14em] text-[#6B7280] uppercase">
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
