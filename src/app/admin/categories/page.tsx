"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import {
  AdminPageHeader,
  AdminTable,
  ConfirmDeleteButton,
  adminInputClass,
} from "@/components/admin/admin-ui";
import { toast } from "@/components/ui/toast";
import {
  adminDeleteCategory,
  adminListCategories,
  getErrorMessage,
  type AdminDoc,
} from "@/lib/api/admin";

export default function AdminCategoriesPage() {
  const [items, setItems] = useState<AdminDoc[]>([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { items: rows, meta } = await adminListCategories({ limit: 100 });
      const filtered = q
        ? rows.filter((row) => {
            const hay = `${row.name ?? ""} ${row.slug ?? ""} ${row.type ?? ""}`.toLowerCase();
            return hay.includes(q.toLowerCase());
          })
        : rows;
      setItems(filtered);
      setTotal(Number(meta?.total ?? rows.length));
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load categories"));
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
        title="Categories"
        description={`${total} categories in MongoDB`}
        actionHref="/admin/categories/new"
        actionLabel="Add category"
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
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={String(row._id)} className="border-t border-[#e8ece6]">
                <td className="px-4 py-3">
                  <p className="font-semibold">{String(row.name)}</p>
                  <p className="text-xs text-[#6b7668]">{String(row.slug)}</p>
                </td>
                <td className="px-4 py-3 capitalize">{String(row.type ?? "—")}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/admin/categories/${row._id}/edit`}
                      className="text-sm font-semibold text-[#2D5A27] hover:underline"
                    >
                      Edit
                    </Link>
                    <ConfirmDeleteButton
                      onConfirm={async () => {
                        try {
                          await adminDeleteCategory(String(row._id));
                          toast.success("Category deleted");
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
                <td colSpan={3} className="px-4 py-8 text-center text-[#6b7668]">
                  No categories found.
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
