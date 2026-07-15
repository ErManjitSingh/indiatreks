"use client";

import { ClipboardList, Home, MapPin, Mountain, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
  {
    href: "/treks",
    label: "Treks",
    icon: Mountain,
    match: (p: string) => p === "/treks" || p.startsWith("/treks/"),
  },
  {
    href: "/destinations",
    label: "Destinations",
    icon: MapPin,
    match: (p: string) => p.startsWith("/destinations"),
  },
  {
    href: "/my-bookings",
    label: "Bookings",
    icon: ClipboardList,
    match: (p: string) => p.startsWith("/booking") || p.startsWith("/my-bookings"),
  },
  {
    href: "/my-account",
    label: "Account",
    icon: User,
    match: (p: string) =>
      p.startsWith("/wishlist") ||
      p.startsWith("/profile") ||
      p.startsWith("/my-account"),
  },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e8ece6] bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
      aria-label="Mobile primary"
    >
      <ul className="grid h-[3.75rem] grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.match(pathname);
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  "flex h-full flex-col items-center justify-center gap-0.5 text-[10px] font-semibold",
                  active ? "text-[#2D5A27]" : "text-[#9aa39a]",
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2.25 : 1.7} aria-hidden />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
