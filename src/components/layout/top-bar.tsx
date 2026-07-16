import { Headphones, Mail, Phone } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface TopBarProps {
  className?: string;
  variant?: "default" | "home";
}

export function TopBar({ className, variant = "default" }: TopBarProps) {
  if (variant === "home") {
    return (
      <div
        className={cn("hidden bg-[#1B3A2A] text-white md:block", className)}
        role="region"
        aria-label="Site highlights"
      >
        <Container className="flex h-10 items-center justify-between gap-4 text-[12px] font-medium">
          <p className="truncate text-white/90">
            Explore India&apos;s Most Incredible Treks with Expert Local Guides.
          </p>
          <ul className="flex shrink-0 items-center gap-4 lg:gap-5">
            <li className="inline-flex items-center gap-1.5">
              <Headphones className="h-3.5 w-3.5 text-[#A8D06C]" aria-hidden />
              <span>24x7 Support</span>
            </li>
            <li>
              <Link
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-1.5 transition hover:text-[#A8D06C]"
              >
                <Phone className="h-3.5 w-3.5 text-[#A8D06C]" aria-hidden />
                <span>{siteConfig.phone}</span>
              </Link>
            </li>
            <li className="hidden xl:list-item">
              <Link
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-1.5 transition hover:text-[#A8D06C]"
              >
                <Mail className="h-3.5 w-3.5 text-[#A8D06C]" aria-hidden />
                <span>{siteConfig.email}</span>
              </Link>
            </li>
          </ul>
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
