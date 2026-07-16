"use client";

import Link from "next/link";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCompareStore, useUiStore } from "@/lib/store";
import type { TrekListingItem } from "@/types/trek-listing";
import { formatCurrency, formatTrekDuration } from "@/utils";
import { formatAltitude } from "@/utils/trek";

export function TrekCompareDrawer({ catalog = [] }: { catalog?: TrekListingItem[] }) {
  const { trekCompareOpen, setTrekCompareOpen } = useUiStore();
  const { trekIds, remove, clear } = useCompareStore();
  const treks = catalog.filter((trek) => trekIds.includes(trek.id));

  return (
    <Drawer open={trekCompareOpen} onOpenChange={setTrekCompareOpen}>
      <DrawerContent side="bottom" className="max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4">
          <div>
            <DrawerTitle>Compare treks</DrawerTitle>
            <DrawerDescription>
              Compare up to 3 treks by price, duration, difficulty, altitude, and season.
            </DrawerDescription>
          </div>
          {treks.length ? (
            <Button type="button" variant="ghost" size="sm" onClick={clear}>
              Clear
            </Button>
          ) : null}
        </div>

        {treks.length === 0 ? (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Select treks using the compare icon on cards.
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="p-3 text-left text-muted-foreground">Detail</th>
                  {treks.map((trek) => (
                    <th key={trek.id} className="p-3 text-left">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/treks/${trek.slug}`}
                          className="font-heading font-bold hover:text-primary"
                          onClick={() => setTrekCompareOpen(false)}
                        >
                          {trek.title}
                        </Link>
                        <button
                          type="button"
                          aria-label={`Remove ${trek.title}`}
                          onClick={() => remove(trek.id)}
                          className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <CompareRow label="Price" values={treks.map((t) => formatCurrency(t.basePriceInr))} />
                <CompareRow
                  label="Duration"
                  values={treks.map((t) => formatTrekDuration(t.durationDays, t.durationNights))}
                />
                <CompareRow
                  label="Difficulty"
                  values={treks.map((t) => t.difficulty)}
                  capitalize
                />
                <CompareRow
                  label="Altitude"
                  values={treks.map((t) => formatAltitude(t.maxAltitude))}
                />
                <CompareRow
                  label="Season"
                  values={treks.map((t) => t.bestSeasons.join(", "))}
                  capitalize
                />
              </tbody>
            </table>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}

function CompareRow({
  label,
  values,
  capitalize,
}: {
  label: string;
  values: string[];
  capitalize?: boolean;
}) {
  return (
    <tr className="border-t border-border">
      <th className="p-3 text-left font-medium text-muted-foreground">{label}</th>
      {values.map((value, index) => (
        <td key={`${label}-${index}`} className={`p-3 font-semibold ${capitalize ? "capitalize" : ""}`}>
          {value}
        </td>
      ))}
    </tr>
  );
}
