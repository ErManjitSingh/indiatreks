"use client";

import { Filter, ArrowUpDown, RefreshCw, Scale } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";

import { AdvancedTrekSearch } from "@/components/treks/advanced-trek-search";
import { TrekFiltersPanel } from "@/components/treks/trek-filters-panel";
import { TreksEmptyState } from "@/components/treks/treks-empty-state";
import { TreksHelpPanel } from "@/components/treks/treks-help-panel";
import { TreksHero } from "@/components/treks/treks-hero";
import { TreksToolbar } from "@/components/treks/treks-toolbar";
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
import { allTreks } from "@/data/treks";
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
import type { TrekFiltersState, TrekSortOption, TrekViewMode } from "@/types/trek-listing";

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

const PAGE_SIZE = 12;

const sortLabels: Record<TrekSortOption, string> = {
  popularity: "Popularity",
  newest: "Newest",
  rating: "Rating",
  "price-asc": "Price Low",
  "price-desc": "Price High",
  duration: "Duration",
};

export function TreksExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hydrated = useHasHydrated();
  const [isPending, startTransition] = useTransition();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

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
  const results = useMemo(() => filterTreks(allTreks, filters), [filters]);
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const visibleTreks = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  // Prefer virtualizing the full filtered set once shown (after load-more expands).
  const listTreks = results.length > 0 && !hasMore ? results : visibleTreks;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
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
    setLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 350));
    setVisibleCount((count) => count + PAGE_SIZE);
    setPage((current) => Math.min(current + 1, totalPages));
    setLoadingMore(false);
  };

  const goToPage = (nextPage: number) => {
    setPage(nextPage);
    setVisibleCount(nextPage * PAGE_SIZE);
  };

  const listClass =
    filters.view === "list" ? "space-y-4" : "grid gap-4 md:grid-cols-2";

  return (
    <div className="relative bg-white pb-28 md:bg-[#F7F8F6] md:pb-12">
      <TreksHero
        totalTreks={allTreks.length}
        sort={filters.sort}
        onSortChange={(sort: TrekSortOption) => pushFilters({ ...filters, sort })}
        onOpenSort={() => setTrekSortOpen(true)}
      />

      <Container className="py-4 md:py-8">
        <AdvancedTrekSearch
          filters={filters}
          onChange={pushFilters}
          onReset={resetFilters}
        />

        <div className="mt-5 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_220px]">
          <div className="hidden lg:block">
            <div>
              <TrekFiltersPanel
                filters={filters}
                onChange={pushFilters}
                onReset={resetFilters}
                onApply={() => undefined}
              />
            </div>
          </div>

          <div className="min-w-0 space-y-4">
            <TreksToolbar
              resultsCount={results.length}
              view={filters.view}
              onViewChange={(view: TrekViewMode) => pushFilters({ ...filters, view })}
            />

            {isPending ? (
              <div className={listClass}>
                {Array.from({ length: 4 }).map((_, index) => (
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
                  <div className="hidden md:flex">
                    <Pagination
                      page={Math.min(page, totalPages)}
                      totalPages={totalPages}
                      onChange={goToPage}
                    />
                  </div>

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
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      You&apos;ve reached the end of this trail list.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="hidden xl:block">
            <div>
              <TreksHelpPanel />
            </div>
          </div>
        </div>

        <div className="mt-6 hidden md:block xl:hidden">
          <TreksHelpPanel />
        </div>
      </Container>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e8ece6] bg-white/95 p-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-lg gap-2">
          <button
            type="button"
            className="relative inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#d0d5cc] bg-white px-2 py-2.5 text-xs font-semibold text-[#1A1A1A]"
            onClick={() => setTrekFiltersOpen(true)}
          >
            <Filter className="h-3.5 w-3.5 text-[#2D5A27]" aria-hidden />
            Filters
            <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#2D5A27] px-1 text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          </button>
          <button
            type="button"
            className="inline-flex flex-[1.2] items-center justify-center gap-1.5 rounded-full border border-[#d0d5cc] bg-white px-2 py-2.5 text-xs font-semibold text-[#1A1A1A]"
            onClick={() => setTrekSortOpen(true)}
          >
            <ArrowUpDown className="h-3.5 w-3.5 text-[#2D5A27]" aria-hidden />
            Sort: {sortLabels[filters.sort]}
          </button>
          <button
            type="button"
            className="relative inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#d0d5cc] bg-white px-2 py-2.5 text-xs font-semibold text-[#1A1A1A]"
            onClick={() => setTrekCompareOpen(true)}
          >
            <Scale className="h-3.5 w-3.5 text-[#2D5A27]" aria-hidden />
            Compare
            <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#2D5A27] px-1 text-[10px] font-bold text-white">
              {displayCompare}
            </span>
          </button>
        </div>
      </div>

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

      <TrekPreviewDrawer />
      <TrekCompareDrawer />
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
              ? "border border-[#d0d5cc] bg-white text-[#1A1A1A] shadow-sm"
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
