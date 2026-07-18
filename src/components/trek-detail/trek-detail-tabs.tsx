"use client";

import {
  CheckSquare,
  ClipboardList,
  HelpCircle,
  Images,
  Info,
  MessageSquareQuote,
  Route,
  XSquare,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const tabs: Array<{
  id: string;
  label: string;
  icon: LucideIcon;
  countKey?: boolean;
  activeClass: string;
  idleClass: string;
}> = [
  {
    id: "overview",
    label: "Overview",
    icon: Info,
    activeClass: "bg-[#2D5A27] text-white shadow-md shadow-[#2D5A27]/25",
    idleClass: "bg-[#E8F5E9] text-[#2D5A27] hover:bg-[#d7edd9]",
  },
  {
    id: "itinerary",
    label: "Itinerary",
    icon: Route,
    activeClass: "bg-[#1D4ED8] text-white shadow-md shadow-[#1D4ED8]/25",
    idleClass: "bg-[#DBEAFE] text-[#1D4ED8] hover:bg-[#bfdbfe]",
  },
  {
    id: "inclusions",
    label: "Inclusions",
    icon: CheckSquare,
    activeClass: "bg-[#047857] text-white shadow-md shadow-[#047857]/25",
    idleClass: "bg-[#D1FAE5] text-[#047857] hover:bg-[#a7f3d0]",
  },
  {
    id: "exclusions",
    label: "Exclusions",
    icon: XSquare,
    activeClass: "bg-[#B45309] text-white shadow-md shadow-[#B45309]/25",
    idleClass: "bg-[#FEF3C7] text-[#B45309] hover:bg-[#fde68a]",
  },
  {
    id: "essentials",
    label: "Things to Carry",
    icon: ClipboardList,
    activeClass: "bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/25",
    idleClass: "bg-[#EDE9FE] text-[#7C3AED] hover:bg-[#ddd6fe]",
  },
  {
    id: "gallery",
    label: "Gallery",
    icon: Images,
    activeClass: "bg-[#DB2777] text-white shadow-md shadow-[#DB2777]/25",
    idleClass: "bg-[#FCE7F3] text-[#DB2777] hover:bg-[#fbcfe8]",
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: MessageSquareQuote,
    countKey: true,
    activeClass: "bg-[#CA8A04] text-white shadow-md shadow-[#CA8A04]/25",
    idleClass: "bg-[#FEF9C3] text-[#A16207] hover:bg-[#fef08a]",
  },
  {
    id: "faqs",
    label: "FAQs",
    icon: HelpCircle,
    activeClass: "bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/25",
    idleClass: "bg-[#CCFBF1] text-[#0F766E] hover:bg-[#99f6e4]",
  },
];

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
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.15, 0.4] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Trek sections"
      className="sticky top-14 z-30 -mx-4 border-b border-[#e8ece6] bg-white/95 px-4 py-3 backdrop-blur-md md:top-[4.25rem] md:mx-0 md:rounded-b-xl md:px-0"
    >
      <ul className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <li key={tab.id}>
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold transition",
                  isActive ? tab.activeClass : tab.idleClass,
                )}
                onClick={() => scrollToSection(tab.id)}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {tab.label}
                {tab.countKey ? (
                  <span className={cn("text-xs font-medium", isActive ? "text-white/85" : "opacity-80")}>
                    ({reviewCount})
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
