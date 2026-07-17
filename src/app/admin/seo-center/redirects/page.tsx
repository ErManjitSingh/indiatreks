"use client";

import { useCallback, useEffect, useState } from "react";

import { AdminField, adminInputClass } from "@/components/admin/admin-ui";
import { SeoPanel, SeoSimpleTable } from "@/components/admin/seo-center/seo-center-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import {
  adminCreateRedirect,
  adminDeleteRedirect,
  adminListRedirects,
  adminPatchRedirect,
} from "@/lib/api/seo";
import { centerExportRedirects, centerImportRedirects } from "@/lib/api/seo-center";

export default function RedirectsPage() {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);
  const [fromPath, setFromPath] = useState("");
  const [toPath, setToPath] = useState("");
  const [importJson, setImportJson] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await adminListRedirects({ limit: 100 });
      setItems(res.items as Array<Record<string, unknown>>);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load redirects"));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function create() {
    setBusy(true);
    try {
      await adminCreateRedirect({ fromPath, toPath, statusCode: 301, isActive: true });
      setFromPath("");
      setToPath("");
      toast.success("Redirect created");
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Create failed"));
    } finally {
      setBusy(false);
    }
  }

  async function exportAll() {
    try {
      const rows = await centerExportRedirects();
      const blob = new Blob([JSON.stringify(rows, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "redirects.json";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      toast.error(getErrorMessage(err, "Export failed"));
    }
  }

  async function importAll() {
    setBusy(true);
    try {
      const parsed = JSON.parse(importJson) as Array<Record<string, unknown>>;
      const res = await centerImportRedirects(parsed);
      toast.success(`Imported ${String(res?.created ?? 0)} new / ${String(res?.updated ?? 0)} updated`);
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Import failed"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <SeoPanel
        title="301 Redirect Manager"
        description="Create, edit, delete, import, export"
        action={
          <Button variant="outline" onClick={() => void exportAll()}>
            Export JSON
          </Button>
        }
      >
        <div className="grid gap-3 md:grid-cols-3">
          <AdminField label="From path">
            <input className={adminInputClass} value={fromPath} onChange={(e) => setFromPath(e.target.value)} placeholder="/old-trek" />
          </AdminField>
          <AdminField label="To path">
            <input className={adminInputClass} value={toPath} onChange={(e) => setToPath(e.target.value)} placeholder="/treks/new-slug" />
          </AdminField>
          <div className="flex items-end">
            <Button variant="primary" disabled={busy} onClick={() => void create()}>
              Create 301
            </Button>
          </div>
        </div>
      </SeoPanel>

      <SeoPanel title="Active redirects">
        <SeoSimpleTable
          headers={["From", "To", "Code", "Active", "Hits", ""]}
          rows={items.map((item) => [
            String(item.fromPath || ""),
            String(item.toPath || ""),
            String(item.statusCode || 301),
            String(Boolean(item.isActive)),
            String(item.hitCount ?? 0),
            <div key={String(item._id)} className="flex gap-1">
              <Button
                variant="outline"
                className="h-8 px-2 text-xs"
                onClick={() =>
                  void adminPatchRedirect(String(item._id), { isActive: !item.isActive })
                    .then(() => load())
                    .catch((err) => toast.error(getErrorMessage(err, "Update failed")))
                }
              >
                Toggle
              </Button>
              <Button
                variant="outline"
                className="h-8 px-2 text-xs"
                onClick={() =>
                  void adminDeleteRedirect(String(item._id))
                    .then(() => load())
                    .catch((err) => toast.error(getErrorMessage(err, "Delete failed")))
                }
              >
                Delete
              </Button>
            </div>,
          ])}
        />
      </SeoPanel>

      <SeoPanel
        title="Import redirects"
        action={
          <Button variant="primary" disabled={busy} onClick={() => void importAll()}>
            Import
          </Button>
        }
      >
        <textarea
          className="min-h-[140px] w-full rounded-xl border border-[#d0d5cc] p-3 font-mono text-xs"
          value={importJson}
          onChange={(e) => setImportJson(e.target.value)}
          placeholder='[{"fromPath":"/a","toPath":"/b","statusCode":301}]'
        />
      </SeoPanel>
    </div>
  );
}
