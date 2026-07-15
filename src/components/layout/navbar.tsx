"use client";

import { ArrowRight, Bell, Heart, Menu, Search, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import { useUiStore, useWishlistStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const MegaMenu = dynamic(
  () => import("@/components/layout/mega-menu").then((m) => m.MegaMenu),
  { ssr: false },
);

const MobileNavigation = dynamic(
  () => import("@/components/layout/mobile-navigation").then((m) => m.MobileNavigation),
  { ssr: false },
);

interface NavbarProps {
  /** Dark charcoal header matching the desktop home mockup */
  overlayHero?: boolean;
}

export function Navbar({ overlayHero = false }: NavbarProps) {
  const pathname = usePathname();
  const hydrated = useHasHydrated();
  const { mobileMenuOpen, setMobileMenuOpen, setSearchOpen } = useUiStore();
  const wishlistCount = useWishlistStore((state) => state.trekIds.length);
  const showWishlistBadge = hydrated && wishlistCount > 0;
  const dark = overlayHero;

  return (
    <header
      className={cn(
        "z-50 w-full",
        // Mobile: always sticky white. Desktop home: fixed dark overlay.
        overlayHero ? "sticky top-0 md:fixed md:inset-x-0 md:top-0" : "sticky top-0",
        "border-b border-[#e8ece6] bg-white text-foreground",
        dark
          ? "md:border-white/10 md:bg-[#0b1220] md:text-white"
          : "md:border-border/60 md:bg-white md:shadow-sm",
      )}
    >
      {/* Mobile header — hamburger | logo | search / wishlist / bell */}
      <div className="flex h-14 items-center gap-1 px-3 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 shrink-0 text-[#1A1A1A]"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <Link
          href="/"
          className="flex min-w-0 flex-1 items-center gap-2"
          aria-label={`${siteConfig.name} home`}
        >
          <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full">
            <Image src="/icons/logo.png" alt="" width={36} height={36} className="object-cover" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[11px] font-extrabold tracking-[0.04em] text-[#0F5132] uppercase">
              India Holiday
            </span>
            <span className="block truncate text-[11px] font-extrabold tracking-[0.04em] text-[#0F5132] uppercase">
              Destinations
            </span>
          </span>
        </Link>

        <div className="flex shrink-0 items-center">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open search"
            className="h-10 w-10 text-[#1A1A1A]"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-[1.15rem] w-[1.15rem]" />
          </Button>
          <Button asChild variant="ghost" size="icon" className="relative h-10 w-10 text-[#1A1A1A]">
            <Link
              href="/wishlist"
              aria-label={
                showWishlistBadge ? `Wishlist, ${wishlistCount} saved treks` : "Wishlist"
              }
            >
              <Heart className="h-[1.15rem] w-[1.15rem]" />
              {showWishlistBadge ? (
                <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#2D5A27] px-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              ) : null}
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications, 3 new"
            className="relative h-10 w-10 text-[#1A1A1A]"
            onClick={() => setSearchOpen(true)}
          >
            <Bell className="h-[1.15rem] w-[1.15rem]" />
            <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#2D5A27] px-1 text-[10px] font-bold text-white">
              3
            </span>
          </Button>
        </div>
      </div>

      {/* Desktop header */}
      <Container className="hidden h-16 items-center justify-between gap-2 lg:h-[4.25rem] md:flex">
        <Link
          href="/"
          className="inline-flex min-w-0 items-center gap-2.5"
          aria-label={`${siteConfig.name} home`}
        >
          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-lg">
            <Image src="/icons/logo.png" alt="" width={40} height={40} className="object-cover" />
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span
              className={cn(
                "font-heading text-[13px] font-extrabold tracking-[0.03em] uppercase lg:text-[14px]",
                dark ? "text-white" : "text-primary",
              )}
            >
              India Holiday Destinations
            </span>
            <span
              className={cn(
                "mt-1 text-[9px] font-semibold tracking-[0.14em] uppercase",
                dark ? "text-white/60" : "text-muted-foreground",
              )}
            >
              Explore India&apos;s Most Incredible Treks
            </span>
          </span>
        </Link>

        <div className="hidden min-w-0 flex-1 justify-center md:flex">
          <MegaMenu light={dark} activeHref={pathname} />
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open search"
            className={cn(
              "h-9 w-9",
              dark ? "text-white hover:bg-white/10 hover:text-white" : "text-foreground",
            )}
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className={cn(
              "relative h-9 w-9",
              dark ? "text-white hover:bg-white/10 hover:text-white" : "text-foreground",
            )}
          >
            <Link
              href="/wishlist"
              aria-label={
                showWishlistBadge ? `Wishlist, ${wishlistCount} saved treks` : "Wishlist"
              }
            >
              <Heart className="h-4 w-4" />
              {showWishlistBadge ? (
                <span className="absolute top-0.5 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-lime px-1 text-[10px] font-bold text-lime-foreground">
                  {wishlistCount}
                </span>
              ) : null}
            </Link>
          </Button>
          <Link
            href="/booking"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition hover:brightness-105 lg:px-4 lg:text-[13px]",
              dark
                ? "border border-white/40 bg-white text-[#1A1A1A]"
                : "border border-[#d0d5cc] bg-white text-[#1A1A1A]",
            )}
          >
            Book Your Trek
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </Container>

      {mobileMenuOpen ? <MobileNavigation dark={false} /> : null}
    </header>
  );
}
