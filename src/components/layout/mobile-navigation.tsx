"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { mainNavigation } from "@/constants";
import { useUiStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  dark?: boolean;
}

export function MobileNavigation({ dark = false }: MobileNavigationProps) {
  const { mobileMenuOpen, setMobileMenuOpen } = useUiStore();

  if (!mobileMenuOpen) return null;

  return (
    <nav
      className={cn(
        "border-t xl:hidden",
        dark
          ? "border-white/10 bg-[#0b1220]/95 text-white"
          : "border-border bg-background",
      )}
      aria-label="Mobile navigation"
    >
      <div className="max-h-[min(70vh,28rem)] overflow-y-auto px-4 py-3">
        <ul className="space-y-0.5">
          {mainNavigation.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className={cn(
                  "block rounded-lg px-3 py-2.5 text-sm font-semibold transition",
                  dark ? "hover:bg-white/10" : "hover:bg-muted",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
              {item.children?.length ? (
                <ul
                  className={cn(
                    "ml-3 space-y-0.5 border-l pl-3",
                    dark ? "border-white/15" : "border-border",
                  )}
                >
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className={cn(
                          "block rounded-md px-3 py-2 text-sm transition",
                          dark
                            ? "text-white/70 hover:bg-white/10 hover:text-white"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
        <Button asChild className="mt-3 w-full border border-[#d0d5cc] bg-white font-bold text-[#1A1A1A] hover:bg-[#F7F8F6]" size="lg">
          <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
            Book Your Trek
          </Link>
        </Button>
      </div>
    </nav>
  );
}
