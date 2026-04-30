import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import {
  getLifeInsurance,
  getLifeInsuranceByPaket,
} from "@/services/life-insurance";
import type { LifeInsurance, LifeInsurancePaket } from "@/types/life-insurance";

export function useLifeInsurance(paketId: string) {
  return useQuery<LifeInsurance[]>({
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
