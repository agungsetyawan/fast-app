"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { syncPendingMutations } from "@/lib/query/mutation-defaults";

export function useSync() {
  const queryClient = useQueryClient();
  const [isSyncing, setIsSyncing] = useState(false);

  const sync = async () => {
    if (!navigator.onLine) {
      toast.error("Tidak ada koneksi internet.");
      return;
    }

    setIsSyncing(true);
    try {
      // 1. Sync semua pending draft dari IndexedDB
      await syncPendingMutations();
      // 2. Tunggu semua paused mutation selesai
      await queryClient.resumePausedMutations();
      // 3. Refresh semua data dari server
      await queryClient.invalidateQueries();
      toast.success("Semua data berhasil disinkronkan");
    } catch (err) {
      toast.error("Gagal sinkronisasi");
      console.error("Sync error:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  return { sync, isSyncing };
}
