"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  Eye,
  FileEdit,
  FileText,
  Filter,
  MoreVertical,
  Newspaper,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  TrendingUp,
} from "lucide-react";

import { toast } from "@/components/ui/toast";
import {
  adminBulkGenerateBlogs,
  adminDeleteBlog,
  adminGetBlogStats,
  adminListBlogs,
  getErrorMessage,
  type AdminDoc,
  type BlogAdminStats,
} from "@/lib/api/admin";
import { cn } from "@/lib/utils";

const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

function formatPublishedOn(value?: string) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatRelativeUpdated(value?: string) {
  if (!value) return "Recently updated";
  const diffMs = Date.now() - new Date(value).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Updated today";
  if (days === 1) return "Updated 1 day ago";
  if (days < 7) return `Updated ${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "Updated 1 week ago";
  return `Updated ${weeks} weeks ago`;
}

function statusTone(value?: string) {
  const v = (value || "").toLowerCase();
  if (v === "published") return { bg: "bg-[#DCFCE7]", text: "text-[#166534]", dot: "bg-[#22C55E]" };
  if (v === "draft") return { bg: "bg-[#DBEAFE]", text: "text-[#1E40AF]", dot: "bg-[#3B82F6]" };
  if (v === "scheduled") return { bg: "bg-[#FFEDD5]", text: "text-[#9A3412]", dot: "bg-[#F97316]" };
  return { bg: "bg-[#F3F4F6]", text: "text-[#374151]", dot: "bg-[#9CA3AF]" };
}

function categoryTone(value?: string) {
  const v = (value || "").toLowerCase();
  if (v.includes("trek")) return { bg: "bg-[#DBEAFE]", text: "text-[#1E40AF]" };
  if (v.includes("mcleod") || v.includes("food") || v.includes("cafe")) {
    return { bg: "bg-[#FFEDD5]", text: "text-[#9A3412]" };
  }
  if (v.includes("road")) return { bg: "bg-[#F3E8FF]", text: "text-[#6B21A8]" };
  return { bg: "bg-[#DCFCE7]", text: "text-[#166534]" };
}

function blogThumb(blog: AdminDoc) {
  if (typeof blog.coverImage === "string" && blog.coverImage) return blog.coverImage;
  return "/images/og-default.jpg";
}

function authorName(blog: AdminDoc) {
  const author = blog.author as { name?: string } | undefined;
  return author?.name || "Editorial Team";
}

function authorInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function paginationWindow(current: number, totalPages: number) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const pages = new Set<number>([1, totalPages, current, current - 1, current + 1]);
  if (current <= 3) [2, 3, 4].forEach((p) => pages.add(p));
  if (current >= totalPages - 2) [totalPages - 1, totalPages - 2, totalPages - 3].forEach((p) => pages.add(p));
  return [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
}

function Sparkline({ tone = "green" }: { tone?: "green" | "blue" | "orange" | "purple" }) {
  const stroke =
    tone === "blue" ? "#3B82F6" : tone === "orange" ? "#F97316" : tone === "purple" ? "#9333EA" : "#22C55E";
  const fill =
    tone === "blue" ? "#DBEAFE" : tone === "orange" ? "#FFEDD5" : tone === "purple" ? "#F3E8FF" : "#DCFCE7";
  return (
    <svg viewBox="0 0 120 32" className="mt-3 h-8 w-full" aria-hidden>
      <path
        d="M0 24 L18 18 L36 22 L54 12 L72 16 L90 8 L108 14 L120 10"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M0 24 L18 18 L36 22 L54 12 L72 16 L90 8 L108 14 L120 10 L120 32 L0 32 Z"
        fill={fill}
        opacity="0.55"
      />
    </svg>
  );
}

export default function AdminBlogsPage() {
  const [items, setItems] = useState<AdminDoc[]>([]);
  const [stats, setStats] = useState<BlogAdminStats>({
    total: 0,
    published: 0,
    draft: 0,
    scheduled: 0,
    totalViews: 0,
    createdThisMonth: 0,
    publishedPercent: 0,
    draftPercent: 0,
    categories: [],
  });
  const [q, setQ] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rowMenuId, setRowMenuId] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    try {
      setStats(await adminGetBlogStats());
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load blog stats"));
    }
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { items: rows, meta } = await adminListBlogs({
        q: q || undefined,
        category: category || undefined,
        status: status || undefined,
        page,
        limit,
        sort: "latest",
      });
      setItems(rows);
      setTotal(Number(meta?.total ?? rows.length));
      setTotalPages(Number(meta?.totalPages ?? 1));
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load blogs"));
    } finally {
      setLoading(false);
    }
  }, [q, category, status, page, limit]);

  useEffect(() => {
    void loadStats();
  }, [loadStats]);

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

  async function seedDharamshalaBlogs() {
    setSeeding(true);
    setMenuOpen(false);
    try {
      const result = await adminBulkGenerateBlogs({ publish: true, force: false });
      toast.success(`Generated ${result?.total ?? 0} travel blogs`);
      await Promise.all([load(), loadStats()]);
    } catch (err) {
      toast.error(getErrorMessage(err, "Bulk generation failed"));
    } finally {
      setSeeding(false);
    }
  }

  const resetFilters = () => {
    setSearchInput("");
    setQ("");
    setCategory("");
    setStatus("");
    setPage(1);
  };

  const pageNumbers = useMemo(() => paginationWindow(page, totalPages), [page, totalPages]);
  const showingFrom = total === 0 ? 0 : (page - 1) * limit + 1;
  const showingTo = Math.min(page * limit, total);

  const statCards = [
    {
      label: "Total Blogs",
      value: stats.total,
      sub: `+${stats.createdThisMonth} this month`,
      up: stats.createdThisMonth > 0,
      icon: Newspaper,
      tone: "bg-[#DCFCE7] text-[#16A34A]",
      spark: "green" as const,
    },
    {
      label: "Published",
      value: stats.published,
      sub: `${stats.publishedPercent}%`,
      up: true,
      icon: Eye,
      tone: "bg-[#DBEAFE] text-[#2563EB]",
      spark: "blue" as const,
    },
    {
      label: "Drafts",
      value: stats.draft,
      sub: `${stats.draftPercent}%`,
      up: false,
      icon: FileEdit,
      tone: "bg-[#FFEDD5] text-[#EA580C]",
      spark: "orange" as const,
    },
    {
      label: "Total Views",
      value: stats.totalViews,
      sub: "All time",
      up: stats.totalViews > 0,
      icon: TrendingUp,
      tone: "bg-[#F3E8FF] text-[#9333EA]",
      spark: "purple" as const,
    },
  ];

  return (
    <div className="space-y-5">
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
              <FileText className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight text-[#111827]">Blogs</h1>
              <p className="mt-1 text-sm text-[#6B7280]">Manage travel guides, trek articles, and SEO blog content.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3.5 text-sm font-semibold text-[#374151] shadow-sm transition hover:bg-[#F9FAFB]"
              >
                <Sparkles className="h-4 w-4 text-[#6B7280]" aria-hidden />
                AI Tools
                <ChevronDown className="h-3.5 w-3.5 text-[#9CA3AF]" aria-hidden />
              </button>
              {menuOpen ? (
                <div className="absolute right-0 z-20 mt-1.5 w-56 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg">
                  <button
                    type="button"
                    className="block w-full px-3 py-2 text-left text-sm text-[#374151] hover:bg-[#F9FAFB] disabled:opacity-60"
                    disabled={seeding}
                    onClick={() => void seedDharamshalaBlogs()}
                  >
                    {seeding ? "Generating…" : "Generate 30 Dharamshala blogs"}
                  </button>
                </div>
              ) : null}
            </div>
            <Link
              href="/admin/blogs/new"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#22C55E] px-4 text-sm font-bold text-white shadow-sm shadow-[#22C55E]/25 transition hover:bg-[#16A34A]"
            >
              <Plus className="h-4 w-4" aria-hidden />
              Add New Blog
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          const TrendIcon = card.up ? ArrowUpRight : ArrowDownRight;
          return (
            <article key={card.label} className="rounded-2xl border border-[#E8ECF1] bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-full", card.tone)}>
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                    card.up ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#FEE2E2] text-[#DC2626]",
                  )}
                >
                  <TrendIcon className="h-3 w-3" aria-hidden />
                  {card.sub}
                </span>
              </div>
              <p className="mt-3 text-xs font-medium text-[#6B7280]">{card.label}</p>
              <p className="mt-1 font-heading text-2xl font-bold text-[#111827]">
                {card.label === "Total Views" ? card.value.toLocaleString() : card.value}
              </p>
              <Sparkline tone={card.spark} />
            </article>
          );
        })}
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#E8ECF1] bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-[#E8ECF1] p-4 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" aria-hidden />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search blogs..."
              className="h-10 w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] pl-9 pr-3 text-sm outline-none transition focus:border-[#22C55E]/50 focus:bg-white focus:ring-2 focus:ring-[#22C55E]/15"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="h-10 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#374151] outline-none focus:border-[#22C55E]/50"
            >
              <option value="">All Categories</option>
              {stats.categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="h-10 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#374151] outline-none focus:border-[#22C55E]/50"
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
            </select>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm font-semibold text-[#374151] transition hover:bg-[#F9FAFB]"
            >
              <Filter className="h-3.5 w-3.5 text-[#6B7280]" aria-hidden />
              Filter
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
          <table className="min-w-[1040px] w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E8ECF1] bg-[#F9FAFB] text-[11px] font-semibold uppercase tracking-wide text-[#6B7280]">
                <th className="px-4 py-3">Blog</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3">Published On</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((blog) => {
                const id = String(blog._id);
                const st = statusTone(String(blog.status ?? ""));
                const cat = categoryTone(String(blog.category ?? ""));
                const name = authorName(blog);
                const views = Number(blog.views ?? 0);
                return (
                  <tr key={id} className="border-b border-[#F3F4F6] last:border-0 hover:bg-[#FAFBFC]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-[#F3F4F6]">
                          <Image src={blogThumb(blog)} alt="" fill sizes="44px" className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-[#111827]">{String(blog.title)}</p>
                          <p className="truncate text-xs text-[#9CA3AF]">/blogs/{String(blog.slug)}</p>
                          <p className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-[#9CA3AF]">
                            <span className="inline-flex items-center gap-1">
                              <Clock3 className="h-3 w-3" aria-hidden />
                              {Number(blog.readingTimeMinutes ?? 0) || 8} min read
                            </span>
                            <span>·</span>
                            <span>{formatRelativeUpdated(String(blog.updatedAt || blog.modifiedAt))}</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                          cat.bg,
                          cat.text,
                        )}
                      >
                        {String(blog.category || "Guide")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-2 text-[#4B5563]">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#E8F5E9] text-[11px] font-bold text-[#166534]">
                          {authorInitials(name)}
                        </span>
                        <span className="max-w-[120px] truncate">{name}</span>
                      </span>
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
                        {String(blog.status || "—")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 font-semibold text-[#111827]">
                        {views.toLocaleString()}
                        {views > 0 ? (
                          <ArrowUpRight className="h-3.5 w-3.5 text-[#16A34A]" aria-hidden />
                        ) : null}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-[#6B7280]">
                        <CalendarDays className="h-3.5 w-3.5 shrink-0 text-[#9CA3AF]" aria-hidden />
                        {formatPublishedOn(String(blog.publishedAt || blog.createdAt))}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative flex items-center justify-end gap-1.5">
                        <Link
                          href={`/blogs/${blog.slug}`}
                          target="_blank"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] text-[#6B7280] transition hover:border-[#22C55E]/40 hover:bg-[#F0FDF4] hover:text-[#16A34A]"
                          title="View"
                        >
                          <Eye className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                        <Link
                          href={`/admin/blogs/${id}/edit`}
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
                            if (!window.confirm("Delete this blog post?")) return;
                            try {
                              await adminDeleteBlog(id);
                              toast.success("Blog deleted");
                              await Promise.all([load(), loadStats()]);
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
                          onClick={() => setRowMenuId((cur) => (cur === id ? null : id))}
                        >
                          <MoreVertical className="h-3.5 w-3.5" aria-hidden />
                        </button>
                        {rowMenuId === id ? (
                          <div className="absolute right-0 top-9 z-20 w-40 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg">
                            <Link
                              href={`/admin/blogs/${id}/edit`}
                              className="block px-3 py-2 text-sm text-[#374151] hover:bg-[#F9FAFB]"
                              onClick={() => setRowMenuId(null)}
                            >
                              Edit blog
                            </Link>
                            <Link
                              href={`/blogs/${blog.slug}`}
                              target="_blank"
                              className="block px-3 py-2 text-sm text-[#374151] hover:bg-[#F9FAFB]"
                              onClick={() => setRowMenuId(null)}
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
                    No blogs found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#E8ECF1] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#6B7280]">
            {loading ? "Loading…" : `Showing ${showingFrom} to ${showingTo} of ${total} results`}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex h-8 items-center rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm font-semibold text-[#374151] disabled:opacity-50"
            >
              Previous
            </button>
            {pageNumbers.map((n, idx) => {
              const prev = pageNumbers[idx - 1];
              const showEllipsis = prev != null && n - prev > 1;
              return (
                <span key={n} className="contents">
                  {showEllipsis ? <span className="px-1 text-sm text-[#9CA3AF]">…</span> : null}
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
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex h-8 items-center rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm font-semibold text-[#374151] disabled:opacity-50"
            >
              Next
            </button>
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
