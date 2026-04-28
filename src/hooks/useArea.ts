import { useQuery } from "@tanstack/react-query";
import { getAreaBranchGrouping } from "@/lib/actions/client/area";
import { queryKeys } from "@/lib/query/keys";
import type { AreaBranchGrouping } from "@/lib/types/area";

export function useAreaBranchGrouping(branchId: string) {
  return useQuery<AreaBranchGrouping>({
    queryKey: queryKeys.areaBranchGrouping(branchId),
    queryFn: () => getAreaBranchGrouping(branchId),
    enabled: !!branchId,
  });
}
