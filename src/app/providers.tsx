"use client";

import { useQueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useEffect } from "react";
import { queryClient } from "@/lib/query/client";
import {
  registerMutationDefaults,
  syncPendingMutations,
} from "@/lib/query/mutation-defaults";
import { persister } from "@/lib/query/persister";

registerMutationDefaults();

function OnlineResumer() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleOnline = async () => {
      console.log("online event fired");
      await syncPendingMutations();
      queryClient.resumePausedMutations().then(() => {
        queryClient.invalidateQueries();
      });
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [queryClient]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        // Maksimal umur cache yang di-restore dari IndexedDB
        // Cache lebih lama dari ini akan dibuang saat app restart
        maxAge: 1000 * 60 * 60 * 24, // 24 jam
      }}
      onSuccess={async () => {
        // Cache berhasil di-restore dari IndexedDB
        // Resume semua mutation yang pending saat offline
        if (navigator.onLine) {
          console.log("restored from cache, syncing...");
          await syncPendingMutations();
          queryClient.resumePausedMutations().then(() => {
            queryClient.invalidateQueries();
          });
        }
      }}
    >
      {children}
      <OnlineResumer />
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
