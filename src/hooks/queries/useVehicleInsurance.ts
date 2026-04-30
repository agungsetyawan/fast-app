import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import {
  getVehicleInsurance,
  getVehicleInsuranceCoverage,
  getVehicleInsuranceDepreciation,
  getVehicleInsurancePa,
  getVehicleInsuranceTjh,
} from "@/services/vehicle-insurance";
import type {
  VehicleInsurance,
  VehicleInsuranceCoverage,
  VehicleInsuranceDepreciation,
  VehicleInsurancePa,
  VehicleInsuranceTjh,
} from "@/types/vehicle-insurance";

export function useVehicleInsurance(dealerId: string, vehicleModelId: string) {
  return useQuery<VehicleInsurance[]>({
    queryKey: queryKeys.vehicleInsurance(dealerId, vehicleModelId),
    queryFn: () => getVehicleInsurance(dealerId, vehicleModelId),
    enabled: !!dealerId && !!vehicleModelId,
  });
}

export function useVehicleInsuranceCoverage() {
  return useQuery<VehicleInsuranceCoverage[]>({
    queryKey: queryKeys.vehicleInsuranceCoverage(),
    queryFn: () => getVehicleInsuranceCoverage(),
  });
}

export function useVehicleInsuranceDepreciation() {
  return useQuery<VehicleInsuranceDepreciation[]>({
    queryKey: queryKeys.vehicleInsuranceDepreciation(),
    queryFn: () => getVehicleInsuranceDepreciation(),
  });
}

export function useVehicleInsuranceTjh() {
  return useQuery<VehicleInsuranceTjh[]>({
    queryKey: queryKeys.vehicleInsuranceTjh(),
    queryFn: () => getVehicleInsuranceTjh(),
  });
}

export function useVehicleInsurancePa() {
  return useQuery<VehicleInsurancePa[]>({
    queryKey: queryKeys.vehicleInsurancePa(),
    queryFn: () => getVehicleInsurancePa(),
  });
}
