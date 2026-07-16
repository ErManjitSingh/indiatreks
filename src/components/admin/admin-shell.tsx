"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import {
  BadgeCheck,
  Bell,
  BookOpen,
  ChevronLeft,
  ExternalLink,
  FileText,
  FolderTree,
  HelpCircle,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  MessageSquareQuote,
  Mountain,
  Newspaper,
  PanelLeftClose,
  Search,
  Settings,
  Sun,
  Zap,
} from "lucide-react";

import { getStoredUser, logoutSession, ensureAuthSession, type AuthUser } from "@/lib/api/auth";
import { isStaffRole } from "@/lib/auth/roles";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/treks", label: "Treks", icon: Mountain },
  { href: "/admin/destinations", label: "Destinations", icon: MapPin },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/content", label: "Site Content", icon: BookOpen },
  { href: "/admin/content", label: "Settings", icon: Settings, key: "settings" },
];

function roleLabel(role?: string) {
  if (!role) return "Staff";
  return role.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);

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

  useEffect(() => {
    setMobileOpen(false);
    setQuickOpen(false);
  }, [pathname]);

  async function onLogout() {
    await logoutSession();
    router.replace("/login");
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F7FA] text-sm text-[#6B7280]">
        Checking admin access…
      </div>
    );
  }

  const displayName = user?.name || "Super Admin";
  const displayRole = roleLabel(user?.role);

  const sidebar = (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-[#E8ECF1] bg-white transition-[width] duration-200",
        collapsed ? "w-[84px]" : "w-[280px]",
      )}
    >
      <div className={cn("flex items-center gap-2.5 px-4 py-5", collapsed && "justify-center px-2")}>
        <Image src="/icons/logo.png" alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
        {!collapsed ? (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold leading-tight text-[#111827]">
              India Holiday Destinations
            </p>
          </div>
        ) : null}
        <button
          type="button"
          className="hidden h-8 w-8 items-center justify-center rounded-lg text-[#9CA3AF] hover:bg-[#F3F4F6] md:inline-flex"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {!collapsed ? (
        <div className="mx-3 mb-3 rounded-2xl border border-[#E8ECF1] bg-[#FAFBFC] p-3">
          <div className="flex items-center gap-3">
            <Image
              src="/images/treks/avatar-1.jpg"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="flex items-center gap-1 truncate text-sm font-semibold text-[#111827]">
                {displayName}
                <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-[#22C55E]" aria-hidden />
              </p>
              <p className="truncate text-xs text-[#6B7280]">{user?.email}</p>
            </div>
          </div>
          <span className="mt-2.5 inline-flex rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[11px] font-semibold text-[#166534]">
            {displayRole}
          </span>
        </div>
      ) : (
        <div className="mb-3 flex justify-center">
          <Image
            src="/images/treks/avatar-1.jpg"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
      )}

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-3">
        {nav.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : item.key === "settings"
              ? false
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.key ?? item.label}
              href={item.href}
              title={item.label}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                collapsed && "justify-center px-2",
                active
                  ? "bg-[#22C55E] text-white shadow-sm shadow-[#22C55E]/25"
                  : "text-[#4B5563] hover:bg-[#F3F4F6]",
              )}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
              {!collapsed ? <span>{item.label}</span> : null}
            </Link>
          );
        })}
        <a
          href="/api/v1/docs"
          target="_blank"
          rel="noopener noreferrer"
          title="API Docs"
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#4B5563] transition hover:bg-[#F3F4F6]",
            collapsed && "justify-center px-2",
          )}
        >
          <FileText className="h-[18px] w-[18px] shrink-0" aria-hidden />
          {!collapsed ? <span>API Docs</span> : null}
        </a>
      </nav>

      {!collapsed ? (
        <div className="mx-3 mb-3 overflow-hidden rounded-2xl bg-[#0B1220] text-white shadow-lg">
          <div className="relative h-28">
            <Image
              src="/images/admin/explore-photo.jpg"
              alt=""
              fill
              sizes="240px"
              className="object-cover"
            />
          </div>
          <div className="space-y-2 p-3.5">
            <p className="text-sm font-bold">Explore The World</p>
            <p className="text-[11px] leading-relaxed text-white/70">
              Manage treks, destinations and content all from one place.
            </p>
            <Link
              href="/"
              target="_blank"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#22C55E] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#16A34A]"
            >
              Visit Website
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      ) : null}

      <div className="border-t border-[#E8ECF1] p-3">
        <button
          type="button"
          onClick={onLogout}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#4B5563] transition hover:bg-[#FEF2F2] hover:text-[#DC2626]",
            collapsed && "justify-center px-2",
          )}
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" aria-hidden />
          {!collapsed ? <span>Logout</span> : null}
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#111827]">
      <div className="flex min-h-screen">
        <div className="hidden md:block">{sidebar}</div>

        {mobileOpen ? (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative h-full w-[280px] shadow-xl">{sidebar}</div>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-[#E8ECF1] bg-white/95 px-4 py-3 backdrop-blur md:px-6">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5E7EB] text-[#6B7280] md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB] md:inline-flex"
              onClick={() => setCollapsed((v) => !v)}
              aria-label="Toggle sidebar"
            >
              <PanelLeftClose className="h-5 w-5" />
            </button>

            <label className="relative hidden min-w-0 flex-1 md:block">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                type="search"
                placeholder="Search anything..."
                className="h-11 w-full max-w-xl rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] pl-10 pr-20 text-sm outline-none transition focus:border-[#22C55E]/50 focus:bg-white focus:ring-2 focus:ring-[#22C55E]/15"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-[#E5E7EB] bg-white px-1.5 py-0.5 text-[10px] font-semibold text-[#9CA3AF]">
                Ctrl + K
              </span>
            </label>

            <div className="ml-auto flex items-center gap-2">
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() => setQuickOpen((v) => !v)}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm font-medium text-[#374151] hover:bg-[#F9FAFB]"
                >
                  <Zap className="h-4 w-4 text-[#F59E0B]" aria-hidden />
                  Quick Actions
                </button>
                {quickOpen ? (
                  <div className="absolute right-0 z-40 mt-2 w-52 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg">
                    {[
                      ["/admin/treks/new", "Add Trek"],
                      ["/admin/blogs/new", "Add Blog"],
                      ["/admin/destinations/new", "Add Destination"],
                      ["/admin/faqs/new", "Add FAQ"],
                    ].map(([href, label]) => (
                      <Link
                        key={href}
                        href={href}
                        className="block px-3 py-2 text-sm text-[#374151] hover:bg-[#F3F4F6]"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              <button
                type="button"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB]"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#EF4444] px-1 text-[10px] font-bold text-white">
                  12
                </span>
              </button>

              <button
                type="button"
                className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB] sm:inline-flex"
                aria-label="Theme"
              >
                <Sun className="h-4 w-4" />
              </button>

              <div className="hidden items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white py-1.5 pl-1.5 pr-3 sm:flex">
                <Image
                  src="/images/treks/avatar-1.jpg"
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="leading-tight">
                  <p className="text-xs font-semibold text-[#111827]">{displayName}</p>
                  <p className="text-[10px] text-[#6B7280]">{displayRole}</p>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-5 md:px-6 md:py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
