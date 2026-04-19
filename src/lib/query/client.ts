import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 menit — data dianggap fresh
      gcTime: 1000 * 60 * 60 * 24, // 24 jam — cache disimpan di memory
      retry: 2,
      refetchOnWindowFocus: false, // Tidak refetch saat pindah tab
      refetchOnReconnect: true, // Refetch saat kembali online
    },
    mutations: {
      retry: 3, // Retry 3x saat offline
    },
  },
});
