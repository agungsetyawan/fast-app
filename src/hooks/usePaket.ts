import { useQuery } from "@tanstack/react-query";
import {
  getPaketByBranch,
  getPaketDp,
  getPaketTenor,
} from "@/lib/actions/client/paket";
import { queryKeys } from "@/lib/query/keys";
import type { Paket, PaketDp, PaketTenor } from "@/lib/types/paket";

export function usePaket(branchId: string) {
  return useQuery<Paket[]>({
    queryKey: queryKeys.paketByBranch(branchId),
    queryFn: () => getPaketByBranch(branchId),
    enabled: !!branchId,
  });
}

export function usePaketDp(paketId: string) {
  return useQuery<PaketDp[]>({
    queryKey: queryKeys.paketDp(paketId),
    queryFn: () => getPaketDp(paketId),
    enabled: !!paketId,
  });
}

export function usePaketTenor(paketId: string) {
  return useQuery<PaketTenor[]>({
    queryKey: queryKeys.paketTenor(paketId),
    queryFn: () => getPaketTenor(paketId),
    enabled: !!paketId,
  });
}
