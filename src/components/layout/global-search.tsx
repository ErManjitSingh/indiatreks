"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalDescription, ModalHeader, ModalTitle } from "@/components/ui/modal";
import { SearchBox } from "@/components/ui/search-box";
import { useUiStore } from "@/lib/store";
import { useSiteContent } from "@/providers/site-content-provider";

export function GlobalSearch() {
  const router = useRouter();
  const { searchOpen, setSearchOpen } = useUiStore();
  const { featuredTreks } = useSiteContent();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!searchOpen) setQuery("");
  }, [searchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return featuredTreks.filter((trek) => {
      const haystack = `${trek.name} ${trek.location} ${trek.difficulty}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [featuredTreks, query]);

  return (
    <Modal open={searchOpen} onOpenChange={setSearchOpen}>
      <ModalContent className="top-[18%] translate-y-0 sm:max-w-xl">
        <ModalHeader>
          <ModalTitle>Search treks</ModalTitle>
          <ModalDescription>Find destinations, difficulty levels, and experiences.</ModalDescription>
        </ModalHeader>
        <SearchBox
          value={query}
          onChange={setQuery}
          placeholder="Try Kedarkantha, Spiti, winter…"
          autoFocus
        />
        <div className="mt-2 max-h-64 space-y-1 overflow-y-auto">
          {query && results.length === 0 ? (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">No treks matched.</p>
          ) : null}
          {results.map((trek) => (
            <button
              key={trek.id}
              type="button"
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition hover:bg-muted"
              onClick={() => {
                setSearchOpen(false);
                router.push(`/treks/${trek.slug}`);
              }}
            >
              <span>
                <span className="block font-semibold text-foreground">{trek.name}</span>
                <span className="text-xs text-muted-foreground">{trek.location}</span>
              </span>
              <Search className="h-4 w-4 text-muted-foreground" aria-hidden />
            </button>
          ))}
        </div>
        <Button
          className="mt-2 w-full"
          variant="primary"
          onClick={() => {
            setSearchOpen(false);
            router.push(query ? `/treks?q=${encodeURIComponent(query)}` : "/treks");
          }}
        >
          Browse all treks
        </Button>
      </ModalContent>
    </Modal>
  );
}
