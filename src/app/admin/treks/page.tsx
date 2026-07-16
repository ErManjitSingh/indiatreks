"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Archive,
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Download,
  Eye,
  FileEdit,
  Filter,
  MapPin,
  MoreVertical,
  Mountain,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";

import { toast } from "@/components/ui/toast";
import {
  adminDeleteTrek,
  adminListTreks,
  getErrorMessage,
  type AdminDoc,
} from "@/lib/api/admin";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils";

const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

type TrekStats = {
  total: number;
  published: number;
  draft: number;
  archived: number;
};

function formatAddedOn(value?: string) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function difficultyTone(value?: string) {
  const v = (value || "").toLowerCase();
  if (v === "easy") return { bg: "bg-[#DCFCE7]", text: "text-[#166534]", dot: "bg-[#22C55E]" };
  if (v === "moderate") return { bg: "bg-[#FFEDD5]", text: "text-[#9A3412]", dot: "bg-[#F97316]" };
  if (v === "difficult" || v === "challenging") {
    return { bg: "bg-[#FEE2E2]", text: "text-[#991B1B]", dot: "bg-[#EF4444]" };
  }
  return { bg: "bg-[#F3F4F6]", text: "text-[#374151]", dot: "bg-[#9CA3AF]" };
}

function statusTone(value?: string) {
  const v = (value || "").toLowerCase();
  if (v === "published") return { bg: "bg-[#DCFCE7]", text: "text-[#166534]", dot: "bg-[#22C55E]" };
  if (v === "draft") return { bg: "bg-[#DBEAFE]", text: "text-[#1E40AF]", dot: "bg-[#3B82F6]" };
  if (v === "archived") return { bg: "bg-[#E0E7FF]", text: "text-[#3730A3]", dot: "bg-[#6366F1]" };
  return { bg: "bg-[#F3F4F6]", text: "text-[#374151]", dot: "bg-[#9CA3AF]" };
}

function trekThumb(trek: AdminDoc) {
  const images = trek.heroImages;
  if (Array.isArray(images) && typeof images[0] === "string" && images[0]) {
    return images[0];
  }
  return "/images/treks/mountains-1.jpg";
}

function paginationWindow(current: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages = new Set<number>([1, totalPages, current, current - 1, current + 1]);
  if (current <= 3) {
    pages.add(2);
    pages.add(3);
    pages.add(4);
  }
  if (current >= totalPages - 2) {
    pages.add(totalPages - 1);
    pages.add(totalPages - 2);
    pages.add(totalPages - 3);
  }
  return [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
}

export default function AdminTreksPage() {
  const [items, setItems] = useState<AdminDoc[]>([]);
  const [stats, setStats] = useState<TrekStats>({ total: 0, published: 0, draft: 0, archived: 0 });
  const [regions, setRegions] = useState<string[]>([]);
  const [q, setQ] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [region, setRegion] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [exportOpen, setExportOpen] = useState(false);
  const [menuId, setMenuId] = useState<string | null>(null);

  const loadStatsAndRegions = useCallback(async () => {
    try {
      const [all, published, draft, archived] = await Promise.all([
        adminListTreks({ limit: 100 }),
        adminListTreks({ limit: 1, status: "published" }),
        adminListTreks({ limit: 1, status: "draft" }),
        adminListTreks({ limit: 1, status: "archived" }),
      ]);
      setStats({
        total: Number(all.meta?.total ?? all.items.length),
        published: Number(published.meta?.total ?? 0),
        draft: Number(draft.meta?.total ?? 0),
        archived: Number(archived.meta?.total ?? 0),
      });
      const unique = [
        ...new Set(
          all.items.map((t) => String(t.region || "").trim()).filter(Boolean),
        ),
      ].sort((a, b) => a.localeCompare(b));
      setRegions(unique);
    } catch {
      /* ignore — table load will surface errors */
    }
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { items: rows, meta } = await adminListTreks({
        q: q || undefined,
        region: region || undefined,
        difficulty: difficulty || undefined,
        status: status || undefined,
        page,
        limit,
        sort: "newest",
      });
      setItems(rows);
      setTotal(Number(meta?.total ?? rows.length));
      setTotalPages(Number(meta?.totalPages ?? 1));
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load treks"));
    } finally {
      setLoading(false);
    }
  }, [q, region, difficulty, status, page, limit]);

  useEffect(() => {
    void loadStatsAndRegions();
  }, [loadStatsAndRegions]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setPage(1);
      setQ(searchInput.trim());
    }, 300);
    return () => window.clearTimeout(t);
  }, [searchInput]);

  const resetFilters = () => {
    setSearchInput("");
    setQ("");
    setRegion("");
    setDifficulty("");
    setStatus("");
    setPage(1);
  };

  const exportCsv = () => {
    const header = ["Title", "Slug", "Region", "Difficulty", "Price", "Status", "Added On"];
    const lines = items.map((trek) =>
      [
        trek.title,
        trek.slug,
        trek.region || trek.destinationName || "",
        trek.difficulty || "",
        trek.basePriceInr ?? "",
        trek.status || "",
        trek.createdAt || "",
      ]
        .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
        .join(","),
    );
    const blob = new Blob([[header.join(","), ...lines].join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `treks-page-${page}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setExportOpen(false);
    toast.success("Exported current page");
  };

  const pageNumbers = useMemo(
    () => paginationWindow(page, totalPages),
    [page, totalPages],
  );

  const showingFrom = total === 0 ? 0 : (page - 1) * limit + 1;
  const showingTo = Math.min(page * limit, total);

  const statCards = [
    {
      label: "Total Treks",
      value: stats.total,
      trend: "+12%",
      up: true,
      icon: Mountain,
      tone: "bg-[#DCFCE7] text-[#16A34A]",
    },
    {
      label: "Published Treks",
      value: stats.published,
      trend: "+15%",
      up: true,
      icon: Eye,
      tone: "bg-[#F3E8FF] text-[#9333EA]",
    },
    {
      label: "Draft Treks",
      value: stats.draft,
      trend: "-25%",
      up: false,
      icon: FileEdit,
      tone: "bg-[#FFEDD5] text-[#EA580C]",
    },
    {
      label: "Archived Treks",
      value: stats.archived,
      trend: "-10%",
      up: false,
      icon: Archive,
      tone: "bg-[#DBEAFE] text-[#2563EB]",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Page banner */}
      <section className="relative overflow-hidden rounded-2xl border border-[#E8ECF1] bg-white shadow-sm">
        <div className="absolute inset-0">
          <Image
            src="/images/admin/hero-banner.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1100px"
            className="object-cover object-[center_35%] opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/75 to-white/40" />
        </div>
        <div className="relative flex flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between md:px-7">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#16A34A]">
              <Mountain className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight text-[#111827]">
                Treks
              </h1>
              <p className="mt-1 text-sm text-[#6B7280]">
                Manage all trekking packages and information.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <div className="relative">
              <button
                type="button"
                onClick={() => setExportOpen((v) => !v)}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3.5 text-sm font-semibold text-[#374151] shadow-sm transition hover:bg-[#F9FAFB]"
              >
                <Download className="h-4 w-4 text-[#6B7280]" aria-hidden />
                Export
                <ChevronDown className="h-3.5 w-3.5 text-[#9CA3AF]" aria-hidden />
              </button>
              {exportOpen ? (
                <div className="absolute right-0 z-20 mt-1.5 w-44 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg">
                  <button
                    type="button"
                    className="block w-full px-3 py-2 text-left text-sm text-[#374151] hover:bg-[#F9FAFB]"
                    onClick={exportCsv}
                  >
                    Export CSV
                  </button>
                </div>
              ) : null}
            </div>
            <Link
              href="/admin/treks/new"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#22C55E] px-4 text-sm font-bold text-white shadow-sm shadow-[#22C55E]/25 transition hover:bg-[#16A34A]"
            >
              <Plus className="h-4 w-4" aria-hidden />
              Add New Trek
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          const TrendIcon = card.up ? ArrowUpRight : ArrowDownRight;
          return (
            <article
              key={card.label}
              className="rounded-2xl border border-[#E8ECF1] bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center rounded-full",
                    card.tone,
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                    card.up ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#FEE2E2] text-[#DC2626]",
                  )}
                >
                  <TrendIcon className="h-3 w-3" aria-hidden />
                  {card.trend}
                </span>
              </div>
              <p className="mt-3 text-xs font-medium text-[#6B7280]">{card.label}</p>
              <p className="mt-1 font-heading text-2xl font-bold text-[#111827]">{card.value}</p>
            </article>
          );
        })}
      </section>

      {/* Filters + table */}
      <section className="overflow-hidden rounded-2xl border border-[#E8ECF1] bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-[#E8ECF1] p-4 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]"
              aria-hidden
            />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by trek name, slug or region..."
              className="h-10 w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] pl-9 pr-3 text-sm outline-none transition focus:border-[#22C55E]/50 focus:bg-white focus:ring-2 focus:ring-[#22C55E]/15"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setPage(1);
              }}
              className="h-10 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#374151] outline-none focus:border-[#22C55E]/50"
            >
              <option value="">Region</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <select
              value={difficulty}
              onChange={(e) => {
                setDifficulty(e.target.value);
                setPage(1);
              }}
              className="h-10 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#374151] outline-none focus:border-[#22C55E]/50"
            >
              <option value="">Difficulty</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="difficult">Difficult</option>
              <option value="challenging">Challenging</option>
            </select>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="h-10 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#374151] outline-none focus:border-[#22C55E]/50"
            >
              <option value="">Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm font-semibold text-[#374151] transition hover:bg-[#F9FAFB]"
            >
              <Filter className="h-3.5 w-3.5 text-[#6B7280]" aria-hidden />
              Reset
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm font-semibold text-[#374151] transition hover:bg-[#F9FAFB]"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#6B7280]" aria-hidden />
              Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[920px] w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E8ECF1] bg-[#F9FAFB] text-[11px] font-semibold uppercase tracking-wide text-[#6B7280]">
                <th className="px-4 py-3">Trek</th>
                <th className="px-4 py-3">Region</th>
                <th className="px-4 py-3">Difficulty</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Added On</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((trek) => {
                const id = String(trek._id);
                const diff = difficultyTone(String(trek.difficulty ?? ""));
                const st = statusTone(String(trek.status ?? ""));
                const regionLabel = String(trek.region || trek.destinationName || "—");
                return (
                  <tr key={id} className="border-b border-[#F3F4F6] last:border-0 hover:bg-[#FAFBFC]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-[#F3F4F6]">
                          <Image
                            src={trekThumb(trek)}
                            alt=""
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-[#111827]">
                            {String(trek.title)}
                          </p>
                          <p className="truncate text-xs text-[#9CA3AF]">/{String(trek.slug)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-[#4B5563]">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-[#9CA3AF]" aria-hidden />
                        <span className="truncate">{regionLabel}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
                          diff.bg,
                          diff.text,
                        )}
                      >
                        <span className={cn("h-1.5 w-1.5 rounded-full", diff.dot)} />
                        {String(trek.difficulty || "—")}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#111827]">
                      {formatCurrency(Number(trek.basePriceInr ?? 0))}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
                          st.bg,
                          st.text,
                        )}
                      >
                        <span className={cn("h-1.5 w-1.5 rounded-full", st.dot)} />
                        {String(trek.status || "—")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-[#6B7280]">
                        <CalendarDays className="h-3.5 w-3.5 shrink-0 text-[#9CA3AF]" aria-hidden />
                        {formatAddedOn(trek.createdAt)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative flex items-center justify-end gap-1.5">
                        <Link
                          href={`/treks/${trek.slug}`}
                          target="_blank"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] text-[#6B7280] transition hover:border-[#22C55E]/40 hover:bg-[#F0FDF4] hover:text-[#16A34A]"
                          title="View"
                        >
                          <Eye className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                        <Link
                          href={`/admin/treks/${id}/edit`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] text-[#6B7280] transition hover:border-[#22C55E]/40 hover:bg-[#F0FDF4] hover:text-[#16A34A]"
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                        <button
                          type="button"
                          title="Delete"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] text-[#6B7280] transition hover:border-red-200 hover:bg-[#FEF2F2] hover:text-[#DC2626]"
                          onClick={async () => {
                            if (!window.confirm("Delete this trek? This cannot be undone easily.")) {
                              return;
                            }
                            try {
                              await adminDeleteTrek(id);
                              toast.success("Trek deleted");
                              await Promise.all([load(), loadStatsAndRegions()]);
                            } catch (err) {
                              toast.error(getErrorMessage(err));
                            }
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden />
                        </button>
                        <button
                          type="button"
                          title="More"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] text-[#6B7280] transition hover:bg-[#F9FAFB]"
                          onClick={() => setMenuId((cur) => (cur === id ? null : id))}
                        >
                          <MoreVertical className="h-3.5 w-3.5" aria-hidden />
                        </button>
                        {menuId === id ? (
                          <div className="absolute right-0 top-9 z-20 w-40 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg">
                            <Link
                              href={`/admin/treks/${id}/edit`}
                              className="block px-3 py-2 text-sm text-[#374151] hover:bg-[#F9FAFB]"
                              onClick={() => setMenuId(null)}
                            >
                              Edit trek
                            </Link>
                            <Link
                              href={`/treks/${trek.slug}`}
                              target="_blank"
                              className="block px-3 py-2 text-sm text-[#374151] hover:bg-[#F9FAFB]"
                              onClick={() => setMenuId(null)}
                            >
                              Open on site
                            </Link>
                          </div>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!loading && items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-[#6B7280]">
                    No treks found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#E8ECF1] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#6B7280]">
            {loading
              ? "Loading…"
              : `Showing ${showingFrom} to ${showingTo} of ${total} entries`}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {pageNumbers.map((n, idx) => {
              const prev = pageNumbers[idx - 1];
              const showEllipsis = prev != null && n - prev > 1;
              return (
                <span key={n} className="contents">
                  {showEllipsis ? (
                    <span className="px-1 text-sm text-[#9CA3AF]">…</span>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setPage(n)}
                    className={cn(
                      "inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-semibold transition",
                      n === page
                        ? "bg-[#22C55E] text-white shadow-sm"
                        : "border border-[#E5E7EB] bg-white text-[#374151] hover:bg-[#F9FAFB]",
                    )}
                  >
                    {n}
                  </button>
                </span>
              );
            })}
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-[#6B7280] sm:justify-end">
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className="h-8 rounded-lg border border-[#E5E7EB] bg-white px-2 text-sm font-semibold text-[#374151] outline-none"
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n} / page
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>
    </div>
  );
}
