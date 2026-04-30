import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { getDealerByBranch } from "@/services/dealer";
import type { Dealer } from "@/types/dealer";

export function useDealer(branchId: string) {
  return useQuery<Dealer[]>({
    queryKey: queryKeys.dealerByBranch(branchId),
    queryFn: () => getDealerByBranch(branchId),
    enabled: !!branchId,
  });
}
