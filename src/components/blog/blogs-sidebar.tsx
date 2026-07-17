"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Coffee,
  Compass,
  Mountain,
  Phone,
  PiggyBank,
  Route,
  Search,
  Shield,
  Snowflake,
  Utensils,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

import { useUiStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type CategoryItem = { name: string; count: number };

const CATEGORY_ICONS: Record<string, typeof BookOpen> = {
  all: BookOpen,
  dharamshala: Mountain,
  treks: Mountain,
  trekking: Mountain,
  "mcleod ganj": Coffee,
  "road trips": Route,
  safety: Shield,
  travel: Compass,
  winter: Snowflake,
  budget: PiggyBank,
  food: Utensils,
  cafes: Coffee,
};

function iconFor(name: string) {
  const key = name.toLowerCase();
  for (const [match, Icon] of Object.entries(CATEGORY_ICONS)) {
    if (key.includes(match)) return Icon;
  }
  return Compass;
}

export function BlogsSidebar({
  categories,
  total,
  activeCategory,
  searchQuery,
}: {
  categories: CategoryItem[];
  total: number;
  activeCategory?: string;
  searchQuery?: string;
}) {
  const router = useRouter();
  const setEnquireModalOpen = useUiStore((s) => s.setEnquireModalOpen);
  const [q, setQ] = useState(searchQuery || "");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const list = useMemo(
    () => [{ name: "All Articles", count: total, value: "" }, ...categories],
    [categories, total],
  );

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (activeCategory) params.set("category", activeCategory);
    router.push(params.toString() ? `/blogs?${params}` : "/blogs");
  }

  function onSubscribe(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <aside className="space-y-5">
      <form onSubmit={onSearch} className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A9484]" aria-hidden />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search blogs..."
          className="h-11 w-full rounded-xl border border-[#DDE5D8] bg-white pl-10 pr-3 text-sm text-[#1A241C] outline-none transition placeholder:text-[#8A9484] focus:border-[#2D5A27]/45 focus:ring-2 focus:ring-[#2D5A27]/12"
        />
      </form>

      <div className="overflow-hidden rounded-2xl border border-[#E5EBE3] bg-white shadow-[0_8px_24px_rgba(20,40,18,0.05)]">
        <div className="border-b border-[#EEF2EC] px-4 py-3">
          <h2 className="font-heading text-sm font-bold tracking-wide text-[#122016] uppercase">Categories</h2>
        </div>
        <ul className="divide-y divide-[#F1F4EF]">
          {list.map((item) => {
            const value = item.name === "All Articles" ? "" : item.name;
            const active =
              (!activeCategory && !value) ||
              (activeCategory || "").toLowerCase() === value.toLowerCase();
            const Icon = iconFor(item.name);
            const href = value ? `/blogs?category=${encodeURIComponent(value)}` : "/blogs";
            return (
              <li key={item.name}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm transition",
                    active
                      ? "bg-[#EAF4E8] font-semibold text-[#2D5A27]"
                      : "text-[#3F4A40] hover:bg-[#F7FAF6]",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-8 w-8 items-center justify-center rounded-lg",
                      active ? "bg-[#2D5A27] text-white" : "bg-[#F1F5EF] text-[#5C6B5A]",
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1 truncate">{item.name}</span>
                  <span className={cn("text-xs", active ? "text-[#2D5A27]" : "text-[#8A9484]")}>
                    ({item.count})
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-[#EEF2EC] p-3">
          <Link
            href="/blogs"
            className="flex h-10 items-center justify-center rounded-xl border border-[#D8E2D4] text-sm font-semibold text-[#2D5A27] transition hover:bg-[#F4F8F2]"
          >
            View All Categories
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-[#C9DEC6] bg-[#EAF4E8] p-5 shadow-sm">
        <h2 className="font-heading text-lg font-bold text-[#122016]">Stay Updated</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-[#4F5D4E]">
          Get trek tips, destination guides, and new Himalayan stories in your inbox.
        </p>
        <form onSubmit={onSubscribe} className="mt-4 space-y-2.5">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="h-11 w-full rounded-xl border border-[#C9DEC6] bg-white px-3 text-sm outline-none focus:border-[#2D5A27]/50 focus:ring-2 focus:ring-[#2D5A27]/12"
          />
          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#2D5A27] text-sm font-bold text-white transition hover:bg-[#244820]"
          >
            {subscribed ? "Subscribed ✓" : "Subscribe"}
          </button>
        </form>
      </div>

      <button
        type="button"
        onClick={() => setEnquireModalOpen(true)}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1F4A1F] px-5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(31,74,31,0.35)] transition hover:bg-[#183A18]"
      >
        <Phone className="h-4 w-4" aria-hidden />
        Request Callback
      </button>
    </aside>
  );
}
