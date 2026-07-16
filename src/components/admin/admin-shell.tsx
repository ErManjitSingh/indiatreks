"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import {
  BookOpen,
  FolderTree,
  HelpCircle,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Map,
  MessageSquareQuote,
  Mountain,
  Newspaper,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getStoredUser, logoutSession, ensureAuthSession, type AuthUser } from "@/lib/api/auth";
import { isStaffRole } from "@/lib/auth/roles";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/treks", label: "Treks", icon: Mountain },
  { href: "/admin/destinations", label: "Destinations", icon: Map },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/content", label: "Site content", icon: BookOpen },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const stored = getStoredUser();
      if (!stored || !isStaffRole(stored.role)) {
        router.replace("/login?next=/admin");
        return;
      }
      const ok = await ensureAuthSession();
      if (cancelled) return;
      if (!ok) {
        router.replace("/login?next=/admin");
        return;
      }
      setUser(getStoredUser() ?? stored);
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function onLogout() {
    await logoutSession();
    router.replace("/login");
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F6F3] text-sm text-[#5c6b5f]">
        Checking admin access…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F3] text-[#1A1A1A]">
      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        <aside className="hidden w-64 shrink-0 border-r border-[#d8e0d4] bg-[#14201a] text-white md:flex md:flex-col">
          <div className="border-b border-white/10 px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C5E063]">
              Backend
            </p>
            <h1 className="mt-1 font-heading text-lg font-bold leading-tight">
              IHD Admin
            </h1>
            <p className="mt-2 truncate text-xs text-white/60">{user?.email}</p>
            <p className="mt-0.5 text-[11px] capitalize text-[#C5E063]/80">{user?.role?.replaceAll("_", " ")}</p>
          </div>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
            {nav.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    active
                      ? "bg-white/12 text-white"
                      : "text-white/70 hover:bg-white/8 hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
            <a
              href="/api/v1/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/8 hover:text-white"
            >
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
              API Docs
            </a>
          </nav>
          <div className="space-y-2 border-t border-white/10 p-3">
            <Button asChild variant="outline" className="w-full border-white/20 bg-transparent text-white hover:bg-white/10">
              <Link href="/">View website</Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border-white/20 bg-transparent text-white hover:bg-white/10"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Logout
            </Button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-[#d8e0d4] bg-[#F4F6F3]/95 px-4 py-3 backdrop-blur md:px-6">
            <div className="md:hidden">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2D5A27]">
                IHD Admin
              </p>
              <p className="truncate text-sm font-medium">{user?.email}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button asChild variant="outline" size="sm" className="md:hidden">
                <Link href="/">Website</Link>
              </Button>
              <Button type="button" variant="outline" size="sm" className="md:hidden" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </header>

          <div className="flex gap-2 overflow-x-auto border-b border-[#d8e0d4] px-4 py-2 md:hidden">
            {nav.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold",
                    active ? "bg-[#2D5A27] text-white" : "bg-white text-[#2D5A27] ring-1 ring-[#d0d5cc]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
