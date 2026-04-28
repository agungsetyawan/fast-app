import { z } from "zod";

export const VehicleBrandSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  is_enable: z.boolean(),
});

export const VehicleModelSchema = z.object({
  id: z.uuid(),
  category: z.string(),
  merk_kendaraan: z.string(),
  name: z.string(),
  is_enable: z.boolean(),
});

export const VehicleTypeSchema = z.object({
  id: z.uuid(),
  category: z.string(),
  merk_kendaraan: z.string(),
  jenis_kendaraan: z.string(),
  name: z.string(),
  is_enable: z.boolean(),
});

export type VehicleBrand = z.infer<typeof VehicleBrandSchema>;
export type VehicleModel = z.infer<typeof VehicleModelSchema>;
export type VehicleType = z.infer<typeof VehicleTypeSchema>;
