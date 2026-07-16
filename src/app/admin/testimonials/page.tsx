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
  adminDeleteTestimonial,
  adminListTestimonials,
  getErrorMessage,
  type AdminDoc,
} from "@/lib/api/admin";

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<AdminDoc[]>([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { items: rows, meta } = await adminListTestimonials({ limit: 100 });
      const filtered = q
        ? rows.filter((row) => {
            const hay = `${row.name ?? ""} ${row.comment ?? ""} ${row.role ?? ""}`.toLowerCase();
            return hay.includes(q.toLowerCase());
          })
        : rows;
      setItems(filtered);
      setTotal(Number(meta?.total ?? rows.length));
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load testimonials"));
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
        title="Testimonials"
        description={`${total} testimonials in MongoDB`}
        actionHref="/admin/testimonials/new"
        actionLabel="Add testimonial"
      >
        <input
          className={`${adminInputClass} max-w-xs`}
          placeholder="Filter…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </AdminPageHeader>

      <AdminTable>
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#F4F6F3] text-xs uppercase tracking-wide text-[#6b7668]">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={String(row._id)} className="border-t border-[#e8ece6]">
                <td className="px-4 py-3">
                  <p className="font-semibold">{String(row.name)}</p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-[#6b7668]">{String(row.comment)}</p>
                </td>
                <td className="px-4 py-3">{String(row.rating ?? "—")}</td>
                <td className="px-4 py-3">{row.featured ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <StatusPill value={String(row.status ?? "")} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/admin/testimonials/${row._id}/edit`}
                      className="text-sm font-semibold text-[#2D5A27] hover:underline"
                    >
                      Edit
                    </Link>
                    <ConfirmDeleteButton
                      onConfirm={async () => {
                        try {
                          await adminDeleteTestimonial(String(row._id));
                          toast.success("Testimonial deleted");
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
                  No testimonials found.
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
