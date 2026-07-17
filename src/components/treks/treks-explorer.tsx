"use client";

import { Filter, RefreshCw, Search } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";

import { AdvancedTrekSearch } from "@/components/treks/advanced-trek-search";
import { PopularSearches } from "@/components/treks/popular-searches";
import { TrekFiltersPanel } from "@/components/treks/trek-filters-panel";
import { TreksCtaSection } from "@/components/treks/treks-cta-section";
import { TreksEmptyState } from "@/components/treks/treks-empty-state";
import { TreksHero } from "@/components/treks/treks-hero";
import { TreksToolbar } from "@/components/treks/treks-toolbar";
import { TreksTrustBar } from "@/components/treks/treks-trust-bar";
import { VirtualizedTrekList } from "@/components/treks/virtualized-trek-list";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { TrekCardSkeleton } from "@/components/ui/skeleton";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import {
  countActiveFilters,
  defaultTrekFilters,
  filterTreks,
  filtersFromSearchParams,
  filtersToSearchParams,
} from "@/lib/trek-filters";
import { useCompareStore, useUiStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type {
  TrekFiltersState,
  TrekListingItem,
  TrekSortOption,
  TrekViewMode,
} from "@/types/trek-listing";
import type { DifficultyLevel } from "@/types";

const TrekPreviewDrawer = dynamic(
  () => import("@/components/treks/trek-preview-drawer").then((m) => m.TrekPreviewDrawer),
  { ssr: false },
);

const TrekCompareDrawer = dynamic(
  () => import("@/components/treks/trek-compare-drawer").then((m) => m.TrekCompareDrawer),
  { ssr: false },
);

const CompareBar = dynamic(
  () => import("@/components/treks/compare-bar").then((m) => m.CompareBar),
  { ssr: false },
);

const PAGE_SIZE = 9;

interface TreksExplorerProps {
  initialTreks?: TrekListingItem[];
}

function durationBucket(days: number): string {
  if (days <= 2) return "1-2";
  if (days <= 4) return "3-4";
  if (days <= 7) return "5-7";
  return "8+";
}

export function TreksExplorer({ initialTreks }: TreksExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hydrated = useHasHydrated();
  const [isPending, startTransition] = useTransition();
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const treks = useMemo(() => initialTreks ?? [], [initialTreks]);

  const {
    trekFiltersOpen,
    setTrekFiltersOpen,
    trekSortOpen,
    setTrekSortOpen,
    setTrekCompareOpen,
  } = useUiStore();
  const compareCount = useCompareStore((state) => state.trekIds.length);
  const displayCompare = hydrated ? compareCount : 0;

  const filters = useMemo(
    () => filtersFromSearchParams(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const activeFilterCount = countActiveFilters(filters);
  const results = useMemo(() => filterTreks(treks, filters), [filters, treks]);
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const visibleTreks = results.slice(pageStart, pageStart + PAGE_SIZE);
  const hasMore = safePage < totalPages;
  const showingFrom = results.length ? pageStart + 1 : 0;
  const showingTo = Math.min(pageStart + PAGE_SIZE, results.length);

  const filterOptions = useMemo(() => {
    const destinations = [
      ...new Set(treks.map((t) => t.destinationName).filter(Boolean)),
    ].sort((a, b) => a.localeCompare(b));
    const states = [...new Set(treks.map((t) => t.state).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b),
    );
    const regions = [...new Set(treks.map((t) => t.region).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b),
    );

    const difficultyCounts: Partial<Record<DifficultyLevel, number>> = {};
    const durationCounts: Record<string, number> = {};
    for (const trek of treks) {
      difficultyCounts[trek.difficulty] = (difficultyCounts[trek.difficulty] || 0) + 1;
      const bucket = durationBucket(trek.durationDays);
      durationCounts[bucket] = (durationCounts[bucket] || 0) + 1;
    }

    return { destinations, states, regions, difficultyCounts, durationCounts };
  }, [treks]);

  const listTreks = visibleTreks;
  const listClass =
    filters.view === "list"
      ? "space-y-4"
      : "grid gap-5 sm:grid-cols-2 xl:grid-cols-3";

  useEffect(() => {
    setPage(1);
  }, [searchParams]);

  const pushFilters = useCallback(
    (next: TrekFiltersState) => {
      const params = filtersToSearchParams(next);
      const query = params.toString();
      startTransition(() => {
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
      });
    },
    [pathname, router],
  );

  const resetFilters = () => pushFilters(defaultTrekFilters);

  const loadMore = async () => {
    if (!hasMore) return;
    setLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 250));
    setPage((current) => Math.min(current + 1, totalPages));
    setLoadingMore(false);
  };

  const goToPage = (nextPage: number) => {
    setPage(Math.max(1, Math.min(nextPage, totalPages)));
  };

  return (
    <div className="relative bg-[#F8F8F8] pb-24 md:bg-[#F7F8F6] md:pb-0">
      <TreksHero totalTreks={treks.length} />

      <AdvancedTrekSearch
        filters={filters}
        onChange={pushFilters}
        onReset={resetFilters}
        destinations={filterOptions.destinations}
      />

      <div className="pt-5 md:pt-6">
        <PopularSearches />
      </div>

      {/* Mobile sticky listing header */}
      <div className="sticky top-0 z-40 border-b border-[#E8ECE6] bg-white/95 backdrop-blur-md md:hidden">
        <div className="flex h-12 items-center justify-between gap-2 px-3">
          <Link
            href="/"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#122016]"
            aria-label="Back"
          >
            <span className="text-lg leading-none">←</span>
          </Link>
          <h2 className="font-heading text-[15px] font-bold text-[#122016]">All Himalayan Treks</h2>
          <div className="flex items-center gap-0.5">
            <a
              href="#trek-search"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#314034]"
              aria-label="Search"
            >
              <Search className="h-4 w-4" aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => setTrekFiltersOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#314034]"
              aria-label="Open filters"
            >
              <Filter className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <Container id="trek-results" className="scroll-mt-24 py-4 md:py-8">
        <div className="mb-3 flex items-center justify-between md:hidden">
          <h2 className="font-heading text-[15px] font-bold text-[#122016]">Top Picks For You</h2>
          <a href="#trek-results" className="text-[12px] font-semibold text-[#2D5A27]">
            View All &gt;
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <div className="hidden lg:block">
            <TrekFiltersPanel
              filters={filters}
              onChange={pushFilters}
              onReset={resetFilters}
              onApply={() => undefined}
              destinations={filterOptions.destinations}
              states={filterOptions.states}
              regions={filterOptions.regions}
              difficultyCounts={filterOptions.difficultyCounts}
              durationCounts={filterOptions.durationCounts}
            />
          </div>

          <div className="min-w-0 space-y-4">
            <TreksToolbar
              resultsCount={results.length}
              view={filters.view}
              sort={filters.sort}
              compareCount={displayCompare}
              onViewChange={(view: TrekViewMode) => pushFilters({ ...filters, view })}
              onSortChange={(sort: TrekSortOption) => pushFilters({ ...filters, sort })}
              onOpenCompare={() => setTrekCompareOpen(true)}
              onOpenFilters={() => setTrekFiltersOpen(true)}
            />

            {filters.view === "map" ? (
              <div className="rounded-2xl border border-dashed border-[#D8E2D4] bg-white px-6 py-16 text-center">
                <p className="font-heading text-lg font-semibold text-[#122016]">Map view coming soon</p>
                <p className="mt-2 text-sm text-[#6B7668]">
                  Switch to Grid or List to browse all {results.length} treks.
                </p>
                <Button
                  type="button"
                  className="mt-5 bg-[#2D5A27] hover:bg-[#244820]"
                  onClick={() => pushFilters({ ...filters, view: "grid" })}
                >
                  Back to Grid
                </Button>
              </div>
            ) : isPending ? (
              <div className={listClass}>
                {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                  <TrekCardSkeleton key={index} />
                ))}
              </div>
            ) : results.length === 0 ? (
              <TreksEmptyState
                hasActiveFilters={activeFilterCount > 0}
                onReset={resetFilters}
              />
            ) : (
              <>
                <VirtualizedTrekList treks={listTreks} view={filters.view} />

                {loadingMore ? (
                  <div className="space-y-4">
                    <TrekCardSkeleton />
                  </div>
                ) : null}

                <div className="flex flex-col items-center gap-4 pt-4">
                  {results.length > PAGE_SIZE ? (
                    <p className="text-sm text-muted-foreground">
                      Showing {showingFrom}–{showingTo} of {results.length} treks
                    </p>
                  ) : null}

                  {totalPages > 1 ? (
                    <Pagination page={safePage} totalPages={totalPages} onChange={goToPage} />
                  ) : null}

                  {hasMore ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      loading={loadingMore}
                      className="min-w-[220px] border-border bg-white"
                      onClick={loadMore}
                    >
                      <RefreshCw className="h-4 w-4" aria-hidden />
                      Load More Treks
                    </Button>
                  ) : results.length > PAGE_SIZE ? (
                    <p className="text-sm text-muted-foreground">
                      You&apos;ve reached the end of this trail list.
                    </p>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
      </Container>

      <TreksCtaSection />
      <TreksTrustBar />

      <Drawer open={trekFiltersOpen} onOpenChange={setTrekFiltersOpen}>
        <DrawerContent side="bottom" className="max-h-[88vh] overflow-y-auto">
          <DrawerTitle>Filter treks</DrawerTitle>
          <DrawerDescription className="sr-only">
            Refine destinations, difficulty, price, and more.
          </DrawerDescription>
          <div className="mt-4">
            <TrekFiltersPanel
              filters={filters}
              onChange={pushFilters}
              onReset={() => {
                resetFilters();
                setTrekFiltersOpen(false);
              }}
              onApply={() => setTrekFiltersOpen(false)}
              destinations={filterOptions.destinations}
              states={filterOptions.states}
              regions={filterOptions.regions}
              difficultyCounts={filterOptions.difficultyCounts}
              durationCounts={filterOptions.durationCounts}
            />
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer open={trekSortOpen} onOpenChange={setTrekSortOpen}>
        <DrawerContent side="bottom">
          <DrawerTitle>Sort treks</DrawerTitle>
          <DrawerDescription className="sr-only">Choose a sorting preference.</DrawerDescription>
          <div className="mt-4 grid gap-2">
            {(
              [
                ["popularity", "Popularity"],
                ["newest", "Newest"],
                ["rating", "Rating"],
                ["price-asc", "Price Low"],
                ["price-desc", "Price High"],
                ["duration", "Duration"],
              ] as Array<[TrekSortOption, string]>
            ).map(([value, label]) => (
              <Button
                key={value}
                type="button"
                variant={filters.sort === value ? "primary" : "outline"}
                className="justify-start"
                onClick={() => {
                  pushFilters({ ...filters, sort: value });
                  setTrekSortOpen(false);
                }}
              >
                {label}
              </Button>
            ))}
          </div>
        </DrawerContent>
      </Drawer>

      <TrekPreviewDrawer treks={treks} />
      <TrekCompareDrawer catalog={treks} />
      <div className="hidden md:block">
        <CompareBar />
      </div>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, index) => index + 1);

  return (
    <nav aria-label="Pagination" className="flex items-center gap-1.5">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="bg-white"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        ‹
      </Button>
      {pages.map((item) => (
        <button
          key={item}
          type="button"
          aria-current={item === page ? "page" : undefined}
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-semibold transition",
            item === page
              ? "border border-[#2D5A27] bg-[#2D5A27] text-white shadow-sm"
              : "border border-border bg-white text-foreground hover:bg-muted",
          )}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
      {totalPages > 5 ? (
        <>
          <span className="px-1 text-muted-foreground">…</span>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-white text-sm font-semibold"
            onClick={() => onChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      ) : null}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="bg-white"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        ›
      </Button>
    </nav>
  );
}
