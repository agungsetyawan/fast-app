"use client";

import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import {
  type VehicleBrand,
  VehicleBrandSchema,
  type VehicleModel,
  VehicleModelSchema,
  type VehicleType,
  VehicleTypeSchema,
} from "@/types/vehicle";

export async function getVehicleBrand(): Promise<VehicleBrand[]> {
  const supabase = createClient();
  const { data: vehicleBrands, error } = await supabase
    .from("merk_kendaraan")
    .select("id, name, is_enable")
    .is("is_enable", true)
    .order("name", { ascending: true });

  if (error) throw new Error(`Fetch vehicle brand failed: ${error.message}`);

  return z.array(VehicleBrandSchema).parse(vehicleBrands);
}

export async function getVehicleModelByBrand(
  brandId: string,
): Promise<VehicleModel[]> {
  const supabase = createClient();
  const { data: vehicleModels, error } = await supabase
    .from("jenis_kendaraan")
    .select("id, category, name, is_enable, merk_kendaraan(name)")
    .eq("merk_kendaraan_id", brandId)
    .is("is_enable", true)
    .order("name", { ascending: true });

  if (error) throw new Error(`Fetch vehicle model failed: ${error.message}`);

  return z.array(VehicleModelSchema).parse(
    vehicleModels.map((item) => ({
      ...item,
      merk_kendaraan: item.merk_kendaraan.name,
    })),
  );
}

export async function getVehicleTypeByModel(
  modelId: string,
): Promise<VehicleType[]> {
  const supabase = createClient();
  const { data: vehicleTypes, error } = await supabase
    .from("tipe_kendaraan")
    .select(
      "id, name, is_enable, jenis_kendaraan(name, category, merk_kendaraan(name))",
    )
    .eq("jenis_kendaraan_id", modelId)
    .is("is_enable", true)
    .order("name", { ascending: true });

  if (error) throw new Error(`Fetch vehicle type failed: ${error.message}`);

  return z.array(VehicleTypeSchema).parse(
    vehicleTypes.map((item) => ({
      ...item,
      jenis_kendaraan: item.jenis_kendaraan.name,
      category: item.jenis_kendaraan.category,
      merk_kendaraan: item.jenis_kendaraan.merk_kendaraan.name,
    })),
  );
}
