"use client";

/** Theme forced to light for performance (no next-themes runtime). */
export function useTheme() {
  return {
    theme: "light" as const,
    isDark: false,
    setTheme: (_theme: string) => undefined,
    toggleTheme: () => undefined,
  };
}
