"use client";

import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import {
  type VehicleInsurance,
  type VehicleInsuranceCoverage,
  VehicleInsuranceCoverageSchema,
  type VehicleInsuranceDepreciation,
  VehicleInsuranceDepreciationSchema,
  type VehicleInsurancePa,
  VehicleInsurancePaSchema,
  VehicleInsuranceSchema,
  type VehicleInsuranceTjh,
  VehicleInsuranceTjhSchema,
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

  if (error)
    throw new Error(`Fetch vehicle insurance failed: ${error.message}`);

  return z.array(VehicleInsuranceSchema).parse(vehicleInsurances);
}

export async function getVehicleInsuranceCoverage(): Promise<
  VehicleInsuranceCoverage[]
> {
  const supabase = createClient();
  const { data: vehicleInsuranceCoverages, error } = await supabase
    .from("asuransi_kendaraan_coverage")
    .select("*")
    .order("tiering", { ascending: true })
    .order("name", { ascending: true });

  if (error)
    throw new Error(
      `Fetch vehicle insurance coverage failed: ${error.message}`,
    );

  return z
    .array(VehicleInsuranceCoverageSchema)
    .parse(vehicleInsuranceCoverages);
}

export async function getVehicleInsuranceDepreciation(): Promise<
  VehicleInsuranceDepreciation[]
> {
  const supabase = createClient();
  const { data: vehicleInsuranceDepreciations, error } = await supabase
    .from("asuransi_kendaraan_depresiasi_setting")
    .select("*")
    .order("type", { ascending: true })
    .order("tenor", { ascending: true });

  if (error)
    throw new Error(
      `Fetch vehicle insurance depreciation failed: ${error.message}`,
    );

  return z
    .array(VehicleInsuranceDepreciationSchema)
    .parse(vehicleInsuranceDepreciations);
}

export async function getVehicleInsuranceTjh(): Promise<VehicleInsuranceTjh[]> {
  const supabase = createClient();
  const { data: vehicleInsuranceTjhs, error } = await supabase
    .from("asuransi_kendaraan_tjh_setting")
    .select("*")
    .order("tipe_asuransi", { ascending: true })
    .order("type", { ascending: true })
    .order("tjh_amount", { ascending: true });

  if (error)
    throw new Error(`Fetch vehicle insurance tjh failed: ${error.message}`);

  return z.array(VehicleInsuranceTjhSchema).parse(vehicleInsuranceTjhs);
}

export async function getVehicleInsurancePa(): Promise<VehicleInsurancePa[]> {
  const supabase = createClient();
  const { data: vehicleInsurancePa, error } = await supabase
    .from("asuransi_kendaraan_pa_setting")
    .select("*")
    .order("limit_coverage", { ascending: true });

  if (error)
    throw new Error(`Fetch vehicle insurance pa failed: ${error.message}`);

  return z.array(VehicleInsurancePaSchema).parse(vehicleInsurancePa);
}
