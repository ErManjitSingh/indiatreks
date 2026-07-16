"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { useSiteContent } from "@/providers/site-content-provider";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  href?: string;
}

export function Logo({ className, showTagline = false, href = "/" }: LogoProps) {
  const { site, logoSrc } = useSiteContent();
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <Image
          src={logoSrc}
          alt=""
          width={40}
          height={40}
          className="object-cover"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-sm font-extrabold tracking-tight md:text-base">
          {String(site.name ?? "India Holiday Destinations")}
        </span>
        {showTagline ? (
          <span className="mt-1 text-[11px] font-medium text-muted-foreground">
            {String(site.tagline ?? "")}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
