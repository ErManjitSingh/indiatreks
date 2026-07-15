"use client";

import { useMemo, useState } from "react";

import { useDebounce } from "@/hooks/use-debounce";

export function useSearch<T>(items: T[], keys: Array<keyof T>, delay = 250) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, delay);

  const results = useMemo(() => {
    const normalized = debouncedQuery.trim().toLowerCase();
    if (!normalized) return items;

    return items.filter((item) =>
      keys.some((key) => {
        const value = item[key];
        if (typeof value === "string") {
          return value.toLowerCase().includes(normalized);
        }
        if (typeof value === "number") {
          return String(value).includes(normalized);
        }
        return false;
      }),
    );
  }, [debouncedQuery, items, keys]);

  return {
    query,
    setQuery,
    debouncedQuery,
    results,
    isSearching: query !== debouncedQuery,
  };
}
