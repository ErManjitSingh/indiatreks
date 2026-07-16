"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import {
  AdminPageHeader,
  AdminTable,
  ConfirmDeleteButton,
  StatusPill,
  adminInputClass,
} from "@/components/admin/admin-ui";
import { toast } from "@/components/ui/toast";
import {
  adminDeleteTrek,
  adminListTreks,
  getErrorMessage,
  type AdminDoc,
} from "@/lib/api/admin";
import { formatCurrency } from "@/utils";

export default function AdminTreksPage() {
  const [items, setItems] = useState<AdminDoc[]>([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { items: rows, meta } = await adminListTreks({ q: q || undefined, limit: 100 });
      setItems(rows);
      setTotal(Number(meta?.total ?? rows.length));
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load treks"));
    } finally {
      setLoading(false);
    }
  }, [q]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div>
      <AdminPageHeader
        title="Treks"
        description={`${total} treks in MongoDB`}
        actionHref="/admin/treks/new"
        actionLabel="Add trek"
      >
        <input
          className={`${adminInputClass} max-w-xs`}
          placeholder="Search…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </AdminPageHeader>

      <AdminTable>
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#F4F6F3] text-xs uppercase tracking-wide text-[#6b7668]">
            <tr>
              <th className="px-4 py-3">Trek</th>
              <th className="px-4 py-3">Region</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((trek) => (
              <tr key={String(trek._id)} className="border-t border-[#e8ece6]">
                <td className="px-4 py-3">
                  <p className="font-semibold">{String(trek.title)}</p>
                  <p className="text-xs text-[#6b7668]">{String(trek.slug)}</p>
                </td>
                <td className="px-4 py-3">{String(trek.region ?? trek.destinationName ?? "—")}</td>
                <td className="px-4 py-3">{formatCurrency(Number(trek.basePriceInr ?? 0))}</td>
                <td className="px-4 py-3">
                  <StatusPill value={String(trek.status ?? "")} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/admin/treks/${trek._id}/edit`} className="text-sm font-semibold text-[#2D5A27] hover:underline">
                      Edit
                    </Link>
                    <Link href={`/treks/${trek.slug}`} target="_blank" className="text-sm font-semibold text-[#2D5A27] hover:underline">
                      View
                    </Link>
                    <ConfirmDeleteButton
                      onConfirm={async () => {
                        try {
                          await adminDeleteTrek(String(trek._id));
                          toast.success("Trek deleted");
                          await load();
                        } catch (err) {
                          toast.error(getErrorMessage(err));
                        }
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {!loading && items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[#6b7668]">
                  No treks found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </AdminTable>
      {loading ? <p className="mt-3 text-sm text-[#5c6b5f]">Loading…</p> : null}
    </div>
  );
}
