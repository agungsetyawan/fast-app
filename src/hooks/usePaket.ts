import { useQuery } from "@tanstack/react-query";
import { getPaketByBranch } from "@/lib/actions/client/paket";
import { queryKeys } from "@/lib/query/keys";
import type { Paket } from "@/lib/types/paket";

export function usePaket(branchId: string) {
  return useQuery<Paket[]>({
    queryKey: queryKeys.paketByBranch(branchId),
    queryFn: () => getPaketByBranch(branchId),
    enabled: !!branchId,
  });
}
