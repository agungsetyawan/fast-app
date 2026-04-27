import { useQuery } from "@tanstack/react-query";
import {
  getVehicleBrand,
  getVehicleModelByBrand,
  getVehicleTypeByModel,
} from "@/lib/actions/client/vehicle";
import type {
  VehicleBrand,
  VehicleModel,
  VehicleType,
} from "@/lib/types/vehicle";

export function useVehicleBrand() {
  return useQuery<VehicleBrand[]>({
    queryKey: ["vehicleBrand"],
    queryFn: () => getVehicleBrand(),
  });
}

export function useVehicleModel(brandId: string) {
  return useQuery<VehicleModel[]>({
    queryKey: ["vehicleModel", brandId],
    queryFn: () => getVehicleModelByBrand(brandId),
    enabled: !!brandId,
  });
}

export function useVehicleType(modelId: string) {
  return useQuery<VehicleType[]>({
    queryKey: ["vehicleType", modelId],
    queryFn: () => getVehicleTypeByModel(modelId),
    enabled: !!modelId,
  });
}
