import { useQuery } from "@tanstack/react-query";
import { getOtherFee } from "@/lib/actions/client/fee";
import { queryKeys } from "@/lib/query/keys";
import type { OtherFee } from "@/lib/types/fee";

export function useOtherFee(branchDealerMappingId: string) {
  return useQuery<OtherFee>({
    queryKey: queryKeys.otherFee(branchDealerMappingId),
    queryFn: () => getOtherFee(branchDealerMappingId),
    enabled: !!branchDealerMappingId,
  });
}
