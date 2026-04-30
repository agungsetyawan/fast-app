import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import {
  getVehicleBrand,
  getVehicleModelByBrand,
  getVehicleTypeByModel,
} from "@/services/vehicle";
import type { VehicleBrand, VehicleModel, VehicleType } from "@/types/vehicle";

export function useVehicleBrand() {
  return useQuery<VehicleBrand[]>({
    queryKey: queryKeys.vehicleBrand,
    queryFn: () => getVehicleBrand(),
  });
}

export function useVehicleModel(brandId: string) {
  return useQuery<VehicleModel[]>({
    queryKey: queryKeys.vehicleModel(brandId),
    queryFn: () => getVehicleModelByBrand(brandId),
    enabled: !!brandId,
  });
}

export function useVehicleType(modelId: string) {
  return useQuery<VehicleType[]>({
    queryKey: queryKeys.vehicleType(modelId),
    queryFn: () => getVehicleTypeByModel(modelId),
    enabled: !!modelId,
  });
}
