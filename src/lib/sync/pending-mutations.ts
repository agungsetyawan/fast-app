import { toast } from "sonner";
import { syncPendingNameUpdate } from "@/lib/actions/client/profile";
import { queryClient } from "@/lib/query/client";
import { queryKeys } from "@/lib/query/keys";

type PendingSyncTask = {
  sync: () => Promise<boolean>;
  onSynced?: () => Promise<void>;
  successMessage?: string;
};

const pendingSyncTasks: PendingSyncTask[] = [
  // Tambahkan pending sync task baru di sini, misalnya sync simulation setelah form simulation selesai.
  {
    sync: syncPendingNameUpdate,
    onSynced: () => queryClient.invalidateQueries({ queryKey: queryKeys.user }),
    successMessage: "Nama berhasil disinkronkan",
  },
];

export async function syncPendingMutations(): Promise<boolean> {
  let hasSynced = false;

  for (const task of pendingSyncTasks) {
    try {
      const synced = await task.sync();
      if (!synced) continue;

      hasSynced = true;
      await task.onSynced?.();

      if (task.successMessage) {
        toast.success(task.successMessage);
      }
    } catch (err) {
      toast.error("Gagal sinkronisasi data");
      console.error("Sync error:", err);
    }
  }

  return hasSynced;
}

export async function syncAndRefreshQueries() {
  await syncPendingMutations();
  await queryClient.resumePausedMutations();
  await queryClient.invalidateQueries();
}
