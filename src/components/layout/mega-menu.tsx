"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

import { mainNavigation } from "@/constants";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  light?: boolean;
  activeHref?: string;
}

export function MegaMenu({ light = false, activeHref = "" }: MegaMenuProps) {
  return (
    <NavigationMenu.Root className="relative z-40 hidden xl:flex">
      <NavigationMenu.List className="flex items-center gap-0.5">
        {mainNavigation.map((item) => {
          const isActive =
            item.href === "/"
              ? activeHref === "/"
              : Boolean(item.href) &&
                (activeHref === item.href || activeHref.startsWith(`${item.href}/`));

          if (item.children?.length) {
            return (
              <NavigationMenu.Item key={item.title}>
                <NavigationMenu.Trigger
                  className={cn(
                    "group inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-[12px] font-semibold transition lg:px-2.5 lg:text-[13px]",
                    light
                      ? "text-white/90 hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10"
                      : "text-foreground/85 hover:bg-muted hover:text-primary data-[state=open]:bg-muted data-[state=open]:text-primary",
                    isActive && (light ? "text-white" : "text-primary"),
                  )}
                >
                  {item.title}
                  <ChevronDown
                    className="h-3.5 w-3.5 opacity-60 transition group-data-[state=open]:rotate-180"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute top-full left-1/2 mt-3 w-[34rem] -translate-x-1/2 rounded-2xl border border-border bg-card p-4 shadow-xl">
                  <ul className="grid grid-cols-2 gap-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <NavigationMenu.Link asChild>
                          <Link
                            href={child.href}
                            className="block rounded-xl p-3 transition hover:bg-muted"
                          >
                            <div className="font-semibold text-foreground">{child.title}</div>
                            {child.description ? (
                              <p className="mt-1 text-xs text-muted-foreground">
                                {child.description}
                              </p>
                            ) : null}
                          </Link>
                        </NavigationMenu.Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            );
          }

          return (
            <NavigationMenu.Item key={item.title}>
              <NavigationMenu.Link asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-md px-2 py-1.5 text-[12px] font-semibold transition lg:px-2.5 lg:text-[13px]",
                    light
                      ? "text-white/90 hover:bg-white/10 hover:text-white"
                      : "text-foreground/85 hover:bg-muted hover:text-primary",
                    isActive &&
                      (light
                        ? "text-white after:absolute after:right-2 after:bottom-0 after:left-2 after:h-[2px] after:rounded-full after:bg-lime"
                        : "text-primary after:absolute after:right-2 after:bottom-0 after:left-2 after:h-[2px] after:rounded-full after:bg-lime"),
                  )}
                >
                  {item.title}
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          );
        })}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
