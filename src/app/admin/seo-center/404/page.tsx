"use client";

import { useCallback, useEffect, useState } from "react";

import { AdminField, adminInputClass } from "@/components/admin/admin-ui";
import { SeoPanel, SeoSimpleTable } from "@/components/admin/seo-center/seo-center-ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/api/admin";
import { adminCreateRedirect, adminList404 } from "@/lib/api/seo";
import { centerDelete404, centerIgnore404 } from "@/lib/api/seo-center";

export default function NotFoundMonitorPage() {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await adminList404({ limit: 100, resolved: false });
      setItems(res.items as Array<Record<string, unknown>>);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load 404s"));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function redirectTo(path: string, id: string) {
    const toPath = window.prompt(`Redirect ${path} to:`, "/");
    if (!toPath) return;
    setBusy(true);
    try {
      await adminCreateRedirect({ fromPath: path, toPath, statusCode: 301, isActive: true });
      await centerIgnore404(id);
      toast.success("Redirect created");
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Redirect failed"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <SeoPanel title="404 Monitor" description="Detected 404 pages — redirect, ignore, or delete">
        <SeoSimpleTable
          headers={["Path", "Hits", "Last hit", ""]}
          rows={items.map((item) => [
            String(item.path || ""),
            String(item.hitCount ?? 0),
            item.lastHitAt ? new Date(String(item.lastHitAt)).toLocaleString() : "—",
            <div key={String(item._id)} className="flex flex-wrap gap-1">
              <Button
                variant="outline"
                className="h-8 px-2 text-xs"
                disabled={busy}
                onClick={() => void redirectTo(String(item.path), String(item._id))}
              >
                Redirect
              </Button>
              <Button
                variant="outline"
                className="h-8 px-2 text-xs"
                disabled={busy}
                onClick={() =>
                  void centerIgnore404(String(item._id))
                    .then(() => load())
                    .catch((err) => toast.error(getErrorMessage(err, "Ignore failed")))
                }
              >
                Ignore
              </Button>
              <Button
                variant="outline"
                className="h-8 px-2 text-xs"
                disabled={busy}
                onClick={() =>
                  void centerDelete404(String(item._id))
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
      <AdminField label="Tip">
        <p className={adminInputClass + " flex items-center text-[#6b7280]"}>
          Middleware logs unknown paths into this monitor automatically.
        </p>
      </AdminField>
    </div>
  );
}
