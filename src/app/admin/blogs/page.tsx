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
  adminDeleteBlog,
  adminListBlogs,
  getErrorMessage,
  type AdminDoc,
} from "@/lib/api/admin";

export default function AdminBlogsPage() {
  const [items, setItems] = useState<AdminDoc[]>([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { items: rows, meta } = await adminListBlogs({ q: q || undefined, limit: 100 });
      setItems(rows);
      setTotal(Number(meta?.total ?? rows.length));
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load blogs"));
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
        title="Blogs"
        description={`${total} blog posts in MongoDB`}
        actionHref="/admin/blogs/new"
        actionLabel="Add blog"
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
              <th className="px-4 py-3">Post</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={String(row._id)} className="border-t border-[#e8ece6]">
                <td className="px-4 py-3">
                  <p className="font-semibold">{String(row.title)}</p>
                  <p className="text-xs text-[#6b7668]">{String(row.slug)}</p>
                </td>
                <td className="px-4 py-3">{String(row.category ?? "—")}</td>
                <td className="px-4 py-3">
                  <StatusPill value={String(row.status ?? "")} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/admin/blogs/${row._id}/edit`}
                      className="text-sm font-semibold text-[#2D5A27] hover:underline"
                    >
                      Edit
                    </Link>
                    <ConfirmDeleteButton
                      onConfirm={async () => {
                        try {
                          await adminDeleteBlog(String(row._id));
                          toast.success("Blog deleted");
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
                <td colSpan={4} className="px-4 py-8 text-center text-[#6b7668]">
                  No blogs found.
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
