import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { getOtherFee } from "@/services/fee";
import type { OtherFee } from "@/types/fee";

export function useOtherFee(branchDealerMappingId: string) {
  return useQuery<OtherFee>({
    queryKey: queryKeys.otherFee(branchDealerMappingId),
    queryFn: () => getOtherFee(branchDealerMappingId),
    enabled: !!branchDealerMappingId,
  });
}
