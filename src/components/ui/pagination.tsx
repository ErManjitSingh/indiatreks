"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((value) => {
    if (totalPages <= 7) return true;
    return value === 1 || value === totalPages || Math.abs(value - page) <= 1;
  });

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-2", className)}>
      <Button
        variant="outline"
        size="icon"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {pages.map((value, index) => {
        const prev = pages[index - 1];
        const showEllipsis = prev !== undefined && value - prev > 1;
        return (
          <span key={value} className="contents">
            {showEllipsis ? <span className="px-1 text-muted-foreground">…</span> : null}
            <Button
              variant={value === page ? "primary" : "outline"}
              size="icon"
              aria-label={`Page ${value}`}
              aria-current={value === page ? "page" : undefined}
              onClick={() => onPageChange(value)}
            >
              {value}
            </Button>
          </span>
        );
      })}
      <Button
        variant="outline"
        size="icon"
        aria-label="Next page"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
