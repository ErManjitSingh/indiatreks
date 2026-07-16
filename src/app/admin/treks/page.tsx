"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { fetchTreks } from "@/lib/api/treks";
import type { TrekListingItem } from "@/types/trek-listing";
import { formatCurrency } from "@/utils";

export default function AdminTreksPage() {
  const [treks, setTreks] = useState<TrekListingItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const { items, meta } = await fetchTreks({ limit: 100, q: q || undefined });
        if (cancelled) return;
        setTreks(items);
        setTotal(Number(meta?.total ?? items.length));
        setError(null);
      } catch {
        if (!cancelled) setError("Failed to load treks from API.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [q]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold">Treks</h2>
          <p className="mt-1 text-sm text-[#5c6b5f]">
            Live from MongoDB · {total} published
          </p>
        </div>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search treks…"
          className="h-10 w-full max-w-xs rounded-xl border border-[#d0d5cc] bg-white px-3 text-sm outline-none focus:border-[#2D5A27]/50 focus:ring-2 focus:ring-[#2D5A27]/15"
        />
      </div>

      {error ? <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
      {loading ? <p className="text-sm text-[#5c6b5f]">Loading treks…</p> : null}

      <div className="overflow-hidden rounded-2xl border border-[#d8e0d4] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#F4F6F3] text-xs uppercase tracking-wide text-[#6b7668]">
              <tr>
                <th className="px-4 py-3 font-semibold">Trek</th>
                <th className="px-4 py-3 font-semibold">Region</th>
                <th className="px-4 py-3 font-semibold">Difficulty</th>
                <th className="px-4 py-3 font-semibold">Days</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">View</th>
              </tr>
            </thead>
            <tbody>
              {treks.map((trek) => (
                <tr key={trek.id} className="border-t border-[#e8ece6]">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-[#14201a]">{trek.title}</p>
                    <p className="text-xs text-[#6b7668]">{trek.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-[#3d4a40]">{trek.region || trek.destinationName}</td>
                  <td className="px-4 py-3 capitalize text-[#3d4a40]">{trek.difficulty}</td>
                  <td className="px-4 py-3 text-[#3d4a40]">{trek.durationDays}D</td>
                  <td className="px-4 py-3 font-medium text-[#14201a]">
                    {formatCurrency(trek.basePriceInr)}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/treks/${trek.slug}`}
                      className="font-semibold text-[#2D5A27] hover:underline"
                      target="_blank"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
              {!loading && treks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#6b7668]">
                    No treks found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
