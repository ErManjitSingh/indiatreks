"use client";

import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const { scrolled, scrollY } = useScroll(400);
  const visible = scrolled && scrollY > 400;

  return (
    <Button
      variant="secondary"
      size="icon"
      aria-label="Back to top"
      className={cn(
        "fixed bottom-24 left-4 z-40 rounded-full shadow-lg transition-all duration-300 md:bottom-8 md:left-8",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}
