"use client";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient } from "@/lib/query/client";
import { persister } from "@/lib/query/persister";

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
      onSuccess={() => {
        // Cache berhasil di-restore dari IndexedDB
        // Resume semua mutation yang pending saat offline
        queryClient.resumePausedMutations().then(() => {
          queryClient.invalidateQueries();
        });
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
