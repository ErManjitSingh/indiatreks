"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { Container } from "@/components/ui/container";
import type { TrekSortOption } from "@/types/trek-listing";

interface TreksHeroProps {
  totalTreks: number;
  sort?: TrekSortOption;
  onSortChange?: (sort: TrekSortOption) => void;
  onOpenSort?: () => void;
}

export function TreksHero({
  totalTreks,
  sort = "popularity",
  onSortChange,
  onOpenSort,
}: TreksHeroProps) {
  return (
    <section className="border-b border-border/60 bg-white md:bg-[#F7F8F6]">
      <Container className="py-5 md:py-10">
        <nav aria-label="Breadcrumb" className="mb-3 text-xs text-muted-foreground md:mb-4 md:text-sm">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="transition hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-muted-foreground/60">
              ›
            </li>
            <li className="text-foreground/70">Treks</li>
          </ol>
        </nav>

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="font-heading text-[1.65rem] font-bold leading-tight tracking-tight text-[#1A1A1A] md:text-4xl lg:text-[2.75rem]">
              Explore All Himalayan Treks
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground md:mt-2 md:text-base">
              {totalTreks}+ curated trekking adventures across India
            </p>
          </div>

          {/* Mobile sort chip */}
          {onOpenSort ? (
            <button
              type="button"
              onClick={onOpenSort}
              className="mt-1 inline-flex shrink-0 items-center gap-1 rounded-full border border-[#d0d5cc] bg-white px-3 py-1.5 text-xs font-semibold text-[#333] md:hidden"
            >
              Sort
              <ChevronDown className="h-3.5 w-3.5" aria-hidden />
            </button>
          ) : null}

          {/* Desktop sort */}
          {onSortChange ? (
            <label className="hidden shrink-0 items-center gap-2 text-sm text-muted-foreground md:inline-flex">
              <span>Sort by:</span>
              <select
                aria-label="Sort treks"
                value={sort}
                onChange={(event) => onSortChange(event.target.value as TrekSortOption)}
                className="h-10 rounded-lg border border-border bg-white px-3 text-sm font-medium text-foreground outline-none focus:border-primary/40"
              >
                <option value="popularity">Popularity</option>
                <option value="newest">Newest</option>
                <option value="rating">Rating</option>
                <option value="price-asc">Price Low</option>
                <option value="price-desc">Price High</option>
                <option value="duration">Duration</option>
              </select>
            </label>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
