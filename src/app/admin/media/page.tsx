"use client";

import { useCallback, useEffect, useState } from "react";

import {
  AdminField,
  AdminPageHeader,
  AdminTable,
  ConfirmDeleteButton,
  adminInputClass,
} from "@/components/admin/admin-ui";
import { toast } from "@/components/ui/toast";
import {
  adminDeleteMedia,
  adminListMedia,
  adminUploadMedia,
  getErrorMessage,
  type AdminDoc,
} from "@/lib/api/admin";

export default function AdminMediaPage() {
  const [items, setItems] = useState<AdminDoc[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [folder, setFolder] = useState("site-assets");
  const [alt, setAlt] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { items: rows, meta } = await adminListMedia({ limit: 100 });
      setItems(rows);
      setTotal(Number(meta?.total ?? rows.length));
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load media"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await adminUploadMedia(file, folder.trim() || "site-assets", alt.trim());
      toast.success("Media uploaded");
      setAlt("");
      event.target.value = "";
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Upload failed"));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <AdminPageHeader title="Media" description={`${total} files in MongoDB`} />

      <div className="mb-6 grid gap-4 rounded-2xl border border-[#d8e0d4] bg-white p-5 shadow-sm md:grid-cols-3">
        <AdminField label="Folder">
          <input className={adminInputClass} value={folder} onChange={(e) => setFolder(e.target.value)} />
        </AdminField>
        <AdminField label="Alt text">
          <input className={adminInputClass} value={alt} onChange={(e) => setAlt(e.target.value)} />
        </AdminField>
        <AdminField label="Upload file">
          <div className="flex h-11 items-center gap-2">
            <input
              type="file"
              accept="image/*,video/*,application/pdf"
              disabled={uploading}
              onChange={onUpload}
              className="block w-full text-sm text-[#5c6b5f] file:mr-3 file:rounded-lg file:border-0 file:bg-[#2D5A27] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
            {uploading ? <span className="shrink-0 text-xs text-[#5c6b5f]">Uploading…</span> : null}
          </div>
        </AdminField>
      </div>

      <AdminTable>
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#F4F6F3] text-xs uppercase tracking-wide text-[#6b7668]">
            <tr>
              <th className="px-4 py-3">Preview</th>
              <th className="px-4 py-3">URL</th>
              <th className="px-4 py-3">Alt</th>
              <th className="px-4 py-3">Folder</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => {
              const url = String(row.url ?? "");
              return (
                <tr key={String(row._id)} className="border-t border-[#e8ece6]">
                  <td className="px-4 py-3">
                    {url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={url} alt={String(row.alt ?? "")} className="h-12 w-12 rounded-lg object-cover" />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block max-w-xs truncate text-sm font-medium text-[#2D5A27] hover:underline"
                    >
                      {url || "—"}
                    </a>
                  </td>
                  <td className="px-4 py-3">{String(row.alt || "—")}</td>
                  <td className="px-4 py-3">{String(row.folder || "—")}</td>
                  <td className="px-4 py-3">
                    <ConfirmDeleteButton
                      onConfirm={async () => {
                        try {
                          await adminDeleteMedia(String(row._id));
                          toast.success("Media deleted");
                          await load();
                        } catch (err) {
                          toast.error(getErrorMessage(err));
                        }
                      }}
                    />
                  </td>
                </tr>
              );
            })}
            {!loading && items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[#6b7668]">
                  No media found.
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
