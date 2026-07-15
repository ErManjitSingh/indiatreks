import {
  Leaf,
  Phone,
  ShieldCheck,
  Users,
  Smile,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const trustItems: Array<{
  label: string;
  icon: ComponentType<{ className?: string }>;
}> = [
  { label: "10,000+ Happy Trekkers", icon: Smile },
  { label: "Safety First Always", icon: ShieldCheck },
  { label: "Small Group Departures", icon: Users },
  { label: "Eco-Friendly Adventures", icon: Leaf },
];

interface TopBarProps {
  className?: string;
  variant?: "default" | "home";
}

export function TopBar({ className, variant = "default" }: TopBarProps) {
  if (variant === "home") {
    return (
      <div
        className={cn("hidden bg-primary text-primary-foreground md:block", className)}
        role="region"
        aria-label="Site highlights"
      >
        <Container className="flex h-10 items-center justify-between gap-4 text-[12px] font-medium">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label} className="inline-flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-lime" aria-hidden />
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
          <Link
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="inline-flex shrink-0 items-center gap-2 transition hover:text-lime"
          >
            <Phone className="h-3.5 w-3.5 text-lime" aria-hidden />
            <span>
              Talk to an Expert: <span className="font-semibold">{siteConfig.phone}</span>
            </span>
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className={cn("hidden border-b border-border bg-card/80 text-sm md:block", className)}>
      <Container className="flex h-10 items-center justify-between">
        <p className="text-muted-foreground">{siteConfig.tagline}</p>
        <Link
          href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
          className="inline-flex items-center gap-2 text-foreground transition hover:text-primary"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden />
          {siteConfig.phone}
        </Link>
      </Container>
    </div>
  );
}
