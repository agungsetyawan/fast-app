import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { getLifeInsurance } from "@/services/life-insurance";
import type { LifeInsurance } from "@/types/life-insurance";

export function useLifeInsurance(paketId: string) {
  return useQuery<LifeInsurance[]>({
    queryKey: queryKeys.lifeInsurance(paketId),
    queryFn: () => getLifeInsurance(paketId),
    enabled: !!paketId,
  });
}
