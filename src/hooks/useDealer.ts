import { useQuery } from "@tanstack/react-query";
import { getDealerByBranch } from "@/lib/actions/client/dealer";
import { queryKeys } from "@/lib/query/keys";
import type { Dealer } from "@/lib/types/dealer";

export function useDealer(branchId: string) {
  return useQuery<Dealer[]>({
    queryKey: queryKeys.dealerByBranch(branchId),
    queryFn: () => getDealerByBranch(branchId),
    enabled: !!branchId,
  });
}
