import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { getAreaBranchGrouping } from "@/services/area";
import type { AreaBranchGrouping } from "@/types/area";

export function useAreaBranchGrouping(branchId: string) {
  return useQuery<AreaBranchGrouping>({
    queryKey: queryKeys.areaBranchGrouping(branchId),
    queryFn: () => getAreaBranchGrouping(branchId),
    enabled: !!branchId,
  });
}
