import { toast } from "sonner";
import {
  syncPendingNameUpdate,
  updateUserName,
} from "@/lib/actions/client/profile";
import { queryClient } from "@/lib/query/client";

export function registerMutationDefaults() {
  queryClient.setMutationDefaults(["updateUser"], {
    mutationFn: updateUserName,
    networkMode: "always",
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Nama berhasil diperbarui");
    },
    onError: (err: Error) => {
      if (err.message === "offline") return;
      toast.error(err.message);
    },
  });

  // Nanti kalau ada setMutationDefaults lain, tambah di sini
  // queryClient.setMutationDefaults(["xxx"], {}
}

export async function syncPendingMutations() {
  console.log("syncPendingMutations called");
  try {
    const synced = await syncPendingNameUpdate();
    console.log("synced:", synced);
    if (synced) {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Nama berhasil disinkronkan");
    }
  } catch (err) {
    toast.error("Gagal sinkronisasi data");
    console.error("Sync error:", err);
  }

  // Nanti kalau ada pending mutations lain, tambah di sini
  // await syncPendingProductUpdate();
}
