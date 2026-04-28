"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { syncAndRefreshQueries } from "@/lib/sync/pending-mutations";

export function useSync() {
  const [isSyncing, setIsSyncing] = useState(false);

  const sync = useCallback(async () => {
    if (!navigator.onLine) {
      toast.error("Tidak ada koneksi internet.");
      return;
    }

    setIsSyncing(true);
    try {
      await syncAndRefreshQueries();
      toast.success("Semua data berhasil disinkronkan");
    } catch (err) {
      toast.error("Gagal sinkronisasi");
      console.error("Sync error:", err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  return { sync, isSyncing };
}
