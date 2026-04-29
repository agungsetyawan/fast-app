import { useQuery } from "@tanstack/react-query";
import {
  getLifeInsurance,
  getLifeInsuranceByPaket,
} from "@/lib/actions/client/life-insurance";
import { queryKeys } from "@/lib/query/keys";
import type { LifeInsurancePaket } from "@/lib/types/life-insurance";

export function useLifeInsurance(paketId: string) {
  return useQuery({
    queryKey: queryKeys.lifeInsurance(paketId),
    queryFn: () => getLifeInsurance(paketId),
    enabled: !!paketId,
  });
}

export function useLifeInsuranceByPaket(paketId: string) {
  return useQuery<LifeInsurancePaket[]>({
    queryKey: queryKeys.lifeInsuranceByPaket(paketId),
    queryFn: () => getLifeInsuranceByPaket(paketId),
    enabled: !!paketId,
  });
}
