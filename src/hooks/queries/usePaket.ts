import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import {
  getPaket,
  getPaketDetail,
  getPaketDp,
  getPaketTenor,
} from "@/services/paket";
import type { Paket, PaketDetail, PaketDp, PaketTenor } from "@/types/paket";

export function usePaket(
  branchId: string,
  dealerId: string,
  vehicleModelId: string,
) {
  return useQuery<Paket[]>({
    queryKey: queryKeys.paket(branchId, dealerId, vehicleModelId),
    queryFn: () => getPaket(branchId, dealerId, vehicleModelId),
    enabled: !!branchId && !!dealerId && !!vehicleModelId,
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

export function usePaketDetail(paketId: string, branchId: string) {
  return useQuery<PaketDetail[]>({
    queryKey: queryKeys.paketDetail(paketId, branchId),
    queryFn: () => getPaketDetail(paketId, branchId),
    enabled: !!paketId && !!branchId,
  });
}
