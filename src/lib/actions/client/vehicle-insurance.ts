"use client";

import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import {
  type VehicleInsurance,
  VehicleInsuranceSchema,
} from "@/lib/types/vehicle-insurance";

export async function getVehicleInsurance(
  dealerId: string,
  vehicleModelId: string,
): Promise<VehicleInsurance[]> {
  const supabase = createClient();
  const { data: vehicleInsurances, error } = await supabase
    .from("asuransi_kendaraan")
    .select(`
    *,
    asuransi_kendaraan_rule_dealer!inner(dealer_id),
    asuransi_kendaraan_rule_jenis_kendaraan!inner(jenis_kendaraan_id)
  `)
    .eq("asuransi_kendaraan_rule_dealer.dealer_id", dealerId)
    .eq(
      "asuransi_kendaraan_rule_jenis_kendaraan.jenis_kendaraan_id",
      vehicleModelId,
    )
    .is("is_enable", true)
    .order("name", { ascending: true });

  if (error) throw new Error(`Fetch dealer failed: ${error.message}`);

  return z.array(VehicleInsuranceSchema).parse(vehicleInsurances);
}
