"use client";

import {
  CheckSquare,
  ClipboardList,
  HelpCircle,
  Info,
  MessageSquareQuote,
  Route,
  XSquare,
} from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const tabs = [
  { id: "overview", label: "Overview", icon: Info },
  { id: "itinerary", label: "Itinerary", icon: Route },
  { id: "inclusions", label: "Inclusions", icon: CheckSquare },
  { id: "exclusions", label: "Exclusions", icon: XSquare },
  { id: "essentials", label: "Trek Essentials", icon: ClipboardList },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
  { id: "reviews", label: "Reviews", icon: MessageSquareQuote, countKey: true },
] as const;

export function TrekDetailTabs({ reviewCount }: { reviewCount: number }) {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const ids = tabs.map((tab) => tab.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.35] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Trek sections"
      className="sticky top-14 z-30 -mx-4 mb-6 border-y border-[#e8ece6] bg-white/95 px-4 backdrop-blur-md md:top-[4.25rem] md:mx-0 md:rounded-xl md:border md:px-2"
    >
      <ul className="flex gap-1 overflow-x-auto py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <li key={tab.id}>
              <a
                href={`#${tab.id}`}
                className={cn(
                  "inline-flex items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-3 text-sm font-semibold transition",
                  isActive
                    ? "border-[#2D5A27] text-[#2D5A27]"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
                onClick={() => setActive(tab.id)}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {tab.label}
                {"countKey" in tab && tab.countKey ? (
                  <span className="text-xs font-medium text-muted-foreground">
                    ({reviewCount})
                  </span>
                ) : null}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
