"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Visual stub — theme is forced light; no next-themes JS. */
export function ThemeToggle() {
  return (
    <Button variant="ghost" size="icon" aria-label="Theme (light)" disabled>
      <Sun className="h-4 w-4 dark:hidden" />
      <Moon className="hidden h-4 w-4 dark:inline" />
    </Button>
  );
}
