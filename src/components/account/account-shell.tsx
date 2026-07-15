"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import {
  CalendarDays,
  FileText,
  Heart,
  LayoutDashboard,
  LogOut,
  User,
  Users,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/my-account", label: "Dashboard", icon: LayoutDashboard, match: "exact" as const },
  { href: "/my-bookings", label: "My Bookings", icon: CalendarDays, match: "prefix" as const },
  { href: "/wishlist", label: "Wishlist", icon: Heart, match: "prefix" as const },
  { href: "/profile", label: "Profile", icon: User, match: "prefix" as const },
  {
    href: "/my-account?tab=travellers",
    label: "Saved Travellers",
    icon: Users,
    match: "tab" as const,
    tab: "travellers",
  },
  {
    href: "/my-account?tab=invoices",
    label: "Invoices",
    icon: FileText,
    match: "tab" as const,
    tab: "invoices",
  },
  { href: "/", label: "Logout", icon: LogOut, match: "none" as const },
] as const;

function isActive(
  item: (typeof NAV_ITEMS)[number],
  pathname: string,
  tab: string | null,
) {
  if (item.match === "none") return false;
  if (item.match === "exact") {
    return pathname === item.href && (!tab || tab === "dashboard");
  }
  if (item.match === "prefix") {
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }
  if (item.match === "tab") {
    return pathname === "/my-account" && tab === item.tab;
  }
  return false;
}

interface AccountShellProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function AccountShell({ children, title, description }: AccountShellProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <section className="min-h-[70vh] bg-[#F7F8F6] py-8 md:py-12">
      <Container>
        <div className="mb-6 md:mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#2D5A27]">
            My account
          </p>
          <h1 className="font-heading mt-1 text-2xl font-bold text-[#1A1A1A] md:text-3xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <nav
            aria-label="Account"
            className="shrink-0 lg:w-56"
          >
            <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isActive(item, pathname, tab);
                return (
                  <li key={item.href} className="shrink-0">
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition",
                        active
                          ? "border-[#2D5A27] bg-[#2D5A27] text-white"
                          : "border-[#e8ece6] bg-white text-[#333] hover:border-[#2D5A27]/40 hover:bg-white",
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="whitespace-nowrap">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </Container>
    </section>
  );
}
