"use client";

import { useEffect, useState } from "react";

import { fetchBootstrap } from "@/lib/api/content";

type DestRow = {
  slug?: string;
  name?: string;
  region?: string;
  state?: string;
  trekCount?: number;
  status?: string;
};

export default function AdminDestinationsPage() {
  const [rows, setRows] = useState<DestRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const bootstrap = await fetchBootstrap();
        if (cancelled) return;
        setRows((bootstrap?.destinations as DestRow[]) ?? []);
      } catch {
        if (!cancelled) setError("Failed to load destinations.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold">Destinations</h2>
        <p className="mt-1 text-sm text-[#5c6b5f]">
          {rows.length} destinations from Mongo
        </p>
      </div>

      {error ? <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

      <div className="overflow-hidden rounded-2xl border border-[#d8e0d4] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#F4F6F3] text-xs uppercase tracking-wide text-[#6b7668]">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Region / State</th>
                <th className="px-4 py-3 font-semibold">Treks</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.slug ?? row.name} className="border-t border-[#e8ece6]">
                  <td className="px-4 py-3 font-semibold text-[#14201a]">{row.name}</td>
                  <td className="px-4 py-3 text-[#3d4a40]">
                    {[row.region, row.state].filter(Boolean).join(" · ") || "—"}
                  </td>
                  <td className="px-4 py-3 text-[#3d4a40]">{row.trekCount ?? "—"}</td>
                  <td className="px-4 py-3 capitalize text-[#3d4a40]">{row.status ?? "—"}</td>
                </tr>
              ))}
              {rows.length === 0 && !error ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-[#6b7668]">
                    Loading…
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
