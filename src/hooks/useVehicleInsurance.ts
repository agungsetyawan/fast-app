import { useQuery } from "@tanstack/react-query";
import { getVehicleInsurance } from "@/lib/actions/client/vehicle-insurance";
import { queryKeys } from "@/lib/query/keys";
import type { VehicleInsurance } from "@/lib/types/vehicle-insurance";

export function useVehicleInsurance(dealerId: string, vehicleModelId: string) {
  return useQuery<VehicleInsurance[]>({
    queryKey: queryKeys.vehicleInsurance(dealerId, vehicleModelId),
    queryFn: () => getVehicleInsurance(dealerId, vehicleModelId),
    enabled: !!dealerId && !!vehicleModelId,
  });
}
