import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface AnnouncementBarProps {
  message?: string;
  href?: string;
  className?: string;
}

export function AnnouncementBar({
  message = "Early bird Himalayan departures open — plan your next trek with expert guides.",
  href = "/treks",
  className,
}: AnnouncementBarProps) {
  return (
    <div
      className={cn(
        "gradient-forest text-sm text-white",
        className,
      )}
      role="region"
      aria-label="Announcement"
    >
      <Container className="flex items-center justify-center py-2 text-center">
        <Link href={href} className="font-medium tracking-wide hover:underline">
          {message}
        </Link>
        <span className="sr-only">{siteConfig.name}</span>
      </Container>
    </div>
  );
}
