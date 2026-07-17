import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight, Filter, PencilLine } from "lucide-react";

import { BlogListingCard } from "@/components/blog/blog-listing-card";
import { BlogsHero } from "@/components/blog/blogs-hero";
import { BlogsSidebar } from "@/components/blog/blogs-sidebar";
import { JsonLd } from "@/components/seo";
import { Container } from "@/components/ui/container";
import { fetchBlogHub, fetchBlogs } from "@/lib/api/blogs";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

const BLOGS_PER_PAGE = 9;

export const metadata: Metadata = createMetadata({
  title: "Travel Blog & Himalayan Guide",
  description:
    "Travel stories, trekking guides, tips and inspiration from the Himalayas. Read destination guides, trek explainers, and practical trip planning advice.",
  canonical: "/blogs",
  keywords: [
    "travel blog",
    "himalayan guide",
    "trekking guides",
    "dharamshala travel",
    "India Holiday Destinations",
  ],
});

function buildHref(base: Record<string, string | undefined>, patch: Record<string, string | undefined>) {
  const next = { ...base, ...patch };
  const params = new URLSearchParams();
  Object.entries(next).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  const qs = params.toString();
  return qs ? `/blogs?${qs}` : "/blogs";
}

function paginationWindow(current: number, totalPages: number) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const pages = new Set<number>([1, totalPages, current, current - 1, current + 1]);
  if (current <= 3) [2, 3, 4].forEach((p) => pages.add(p));
  if (current >= totalPages - 2) [totalPages - 1, totalPages - 2, totalPages - 3].forEach((p) => pages.add(p));
  return [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; tag?: string; sort?: string; page?: string }>;
}) {
  const params = await searchParams;
  const sort = params.sort || "latest";
  const requestedPage = Math.max(1, Number(params.page) || 1);
  const [{ items, meta }, hub] = await Promise.all([
    fetchBlogs({
      status: "published",
      page: requestedPage,
      limit: BLOGS_PER_PAGE,
      q: params.q,
      category: params.category,
      tag: params.tag,
      sort,
    }).catch(() => ({ items: [], meta: undefined })),
    fetchBlogHub().catch(() => null),
  ]);

  const categories = hub?.categories || [];
  const totalFound = Number(meta?.total ?? items.length);
  const totalPages = Math.max(1, Number(meta?.totalPages ?? Math.ceil(totalFound / BLOGS_PER_PAGE) || 1));
  const page = Math.min(requestedPage, totalPages);
  const allCount = categories.reduce((sum, c) => sum + Number(c.count || 0), 0) || totalFound;
  const chipCategories = categories.slice(0, 7);
  const pageNumbers = paginationWindow(page, totalPages);
  const showingFrom = totalFound === 0 ? 0 : (page - 1) * BLOGS_PER_PAGE + 1;
  const showingTo = Math.min(page * BLOGS_PER_PAGE, totalFound);

  const sortLabel =
    sort === "popular" ? "Most Popular" : sort === "trending" ? "Trending" : "Most Recent";

  const filterBase = {
    q: params.q,
    category: params.category,
    tag: params.tag,
    sort,
  };

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Blog" },
        ])}
      />

      <BlogsHero articleCount={allCount} categoryCount={categories.length || 8} />

      <section className="bg-[#F7FAF6] py-8 md:py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
            <BlogsSidebar
              categories={categories}
              total={allCount}
              activeCategory={params.category}
              searchQuery={params.q}
            />

            <div className="min-w-0">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="font-heading text-2xl font-bold tracking-tight text-[#122016] md:text-[1.7rem]">
                    {params.q ? "Search Results" : params.category || "All Articles"}
                  </h2>
                  <p className="mt-1 text-sm text-[#6B7668]">
                    {totalFound === 0
                      ? "0 articles found"
                      : `Showing ${showingFrom}–${showingTo} of ${totalFound} article${totalFound === 1 ? "" : "s"}`}
                    {params.q ? ` for “${params.q}”` : ""}.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <details className="group">
                      <summary className="flex h-10 list-none cursor-pointer items-center gap-2 rounded-xl border border-[#D8E2D4] bg-white px-3.5 text-sm font-semibold text-[#314034] shadow-sm marker:content-none [&::-webkit-details-marker]:hidden">
                        {sortLabel}
                        <ChevronDown className="h-3.5 w-3.5 text-[#8A9484] transition group-open:rotate-180" aria-hidden />
                      </summary>
                      <div className="absolute right-0 z-20 mt-1.5 w-44 overflow-hidden rounded-xl border border-[#E5EBE3] bg-white py-1 shadow-lg">
                        {[
                          { value: "latest", label: "Most Recent" },
                          { value: "popular", label: "Most Popular" },
                          { value: "trending", label: "Trending" },
                        ].map((option) => (
                          <Link
                            key={option.value}
                            href={buildHref(filterBase, { sort: option.value, page: undefined })}
                            className={cn(
                              "block px-3 py-2 text-sm hover:bg-[#F4F8F2]",
                              sort === option.value
                                ? "font-semibold text-[#2D5A27]"
                                : "text-[#374151]",
                            )}
                          >
                            {option.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  </div>

                  <Link
                    href="/blogs"
                    className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[#D8E2D4] bg-white px-3.5 text-sm font-semibold text-[#314034] shadow-sm transition hover:bg-[#F4F8F2]"
                  >
                    <Filter className="h-3.5 w-3.5 text-[#6B7668]" aria-hidden />
                    Filter
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#2D5A27] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#244820]"
                  >
                    <PencilLine className="h-3.5 w-3.5" aria-hidden />
                    Write For Us
                  </Link>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href={buildHref(filterBase, { category: undefined, page: undefined })}
                  className={cn(
                    "inline-flex h-9 items-center rounded-full border px-3.5 text-sm font-semibold transition",
                    !params.category
                      ? "border-[#2D5A27] bg-[#2D5A27] text-white"
                      : "border-[#D8E2D4] bg-white text-[#3F4A40] hover:border-[#2D5A27]/35 hover:bg-[#F4F8F2]",
                  )}
                >
                  All
                </Link>
                {chipCategories.map((cat) => {
                  const active =
                    (params.category || "").toLowerCase() === cat.name.toLowerCase();
                  return (
                    <Link
                      key={cat.name}
                      href={buildHref(filterBase, { category: cat.name, page: undefined })}
                      className={cn(
                        "inline-flex h-9 items-center rounded-full border px-3.5 text-sm font-semibold transition",
                        active
                          ? "border-[#2D5A27] bg-[#2D5A27] text-white"
                          : "border-[#D8E2D4] bg-white text-[#3F4A40] hover:border-[#2D5A27]/35 hover:bg-[#F4F8F2]",
                      )}
                    >
                      {cat.name} ({cat.count})
                    </Link>
                  );
                })}
                {categories.length > chipCategories.length ? (
                  <details className="relative">
                    <summary className="inline-flex h-9 list-none cursor-pointer items-center gap-1 rounded-full border border-[#D8E2D4] bg-white px-3.5 text-sm font-semibold text-[#3F4A40] marker:content-none [&::-webkit-details-marker]:hidden">
                      More
                      <ChevronDown className="h-3.5 w-3.5" aria-hidden />
                    </summary>
                    <div className="absolute left-0 z-20 mt-1.5 min-w-[180px] overflow-hidden rounded-xl border border-[#E5EBE3] bg-white py-1 shadow-lg">
                      {categories.slice(7).map((cat) => (
                        <Link
                          key={cat.name}
                          href={buildHref(filterBase, { category: cat.name, page: undefined })}
                          className="block px-3 py-2 text-sm text-[#374151] hover:bg-[#F4F8F2]"
                        >
                          {cat.name} ({cat.count})
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : null}
              </div>

              {items.length ? (
                <>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {items.map((blog) => (
                      <BlogListingCard key={blog.slug} blog={blog} />
                    ))}
                  </div>

                  {totalPages > 1 ? (
                    <nav
                      aria-label="Blog pagination"
                      className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between"
                    >
                      <p className="text-sm text-[#6B7668]">
                        Page {page} of {totalPages}
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-1.5">
                        <Link
                          href={buildHref(filterBase, {
                            page: page > 2 ? String(page - 1) : undefined,
                          })}
                          aria-disabled={page <= 1}
                          className={cn(
                            "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D8E2D4] bg-white text-[#314034] shadow-sm transition",
                            page <= 1
                              ? "pointer-events-none opacity-40"
                              : "hover:bg-[#F4F8F2]",
                          )}
                          aria-label="Previous page"
                        >
                          <ChevronLeft className="h-4 w-4" aria-hidden />
                        </Link>

                        {pageNumbers.map((n, idx) => {
                          const prev = pageNumbers[idx - 1];
                          const showEllipsis = prev !== undefined && n - prev > 1;
                          return (
                            <span key={n} className="contents">
                              {showEllipsis ? (
                                <span className="px-1 text-sm text-[#8A9484]" aria-hidden>
                                  …
                                </span>
                              ) : null}
                              <Link
                                href={buildHref(filterBase, {
                                  page: n > 1 ? String(n) : undefined,
                                })}
                                aria-current={n === page ? "page" : undefined}
                                className={cn(
                                  "inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition",
                                  n === page
                                    ? "border-[#2D5A27] bg-[#2D5A27] text-white"
                                    : "border-[#D8E2D4] bg-white text-[#314034] hover:bg-[#F4F8F2]",
                                )}
                              >
                                {n}
                              </Link>
                            </span>
                          );
                        })}

                        <Link
                          href={buildHref(filterBase, {
                            page: page < totalPages ? String(page + 1) : String(page),
                          })}
                          aria-disabled={page >= totalPages}
                          className={cn(
                            "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D8E2D4] bg-white text-[#314034] shadow-sm transition",
                            page >= totalPages
                              ? "pointer-events-none opacity-40"
                              : "hover:bg-[#F4F8F2]",
                          )}
                          aria-label="Next page"
                        >
                          <ChevronRight className="h-4 w-4" aria-hidden />
                        </Link>
                      </div>
                    </nav>
                  ) : null}
                </>
              ) : (
                <div className="mt-8 rounded-2xl border border-dashed border-[#D8E2D4] bg-white px-6 py-16 text-center">
                  <p className="font-heading text-lg font-semibold text-[#122016]">No articles found</p>
                  <p className="mt-2 text-sm text-[#6B7668]">
                    Try another search term or browse all categories.
                  </p>
                  <Link
                    href="/blogs"
                    className="mt-5 inline-flex h-10 items-center rounded-xl bg-[#2D5A27] px-4 text-sm font-bold text-white"
                  >
                    View all blogs
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
