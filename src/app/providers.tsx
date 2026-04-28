"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useEffect } from "react";
import { queryClient } from "@/lib/query/client";
import { registerMutationDefaults } from "@/lib/query/mutation-defaults";
import { persister } from "@/lib/query/persister";
import { syncAndRefreshQueries } from "@/lib/sync/pending-mutations";

registerMutationDefaults();

function OnlineResumer() {
  useEffect(() => {
    const handleOnline = () => {
      void syncAndRefreshQueries();
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

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
        if (navigator.onLine) {
          await syncAndRefreshQueries();
        }
      }}
    >
      {children}
      <OnlineResumer />
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
