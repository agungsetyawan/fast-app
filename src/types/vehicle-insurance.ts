import { z } from "zod";

export const VehicleInsuranceSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  group: z.string().nullable(),
  additional_tjh: z.float32(),
  is_bundlerfe: z.boolean(),
  is_padriver: z.boolean(),
  is_pai: z.boolean(),
  is_ts: z.boolean(),
  pa_passenger: z.number().int(),
  is_enable: z.boolean(),
});

export const VehicleInsuranceCoverageSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  start_coverage: z.number().int(),
  end_coverage: z.number().int(),
  vehicle_type: z.string(),
  tiering: z.number().int(),
});

export const VehicleInsuranceDepreciationSchema = z.object({
  id: z.uuid(),
  percent_tsi: z.float32(),
  tenor: z.number().int(),
  type: z.string(),
});

export const VehicleInsuranceTjhSchema = z.object({
  id: z.uuid(),
  tipe_asuransi: z.string(),
  tjh_amount: z.number().int(),
  tjh_value: z.number().int(),
  type: z.string(),
});

export const VehicleInsurancePaSchema = z.object({
  id: z.uuid(),
  limit_coverage: z.number().int(),
  pa_driver_rate: z.number().int(),
  pa_passenger_rate: z.float32(),
});

export type VehicleInsurance = z.infer<typeof VehicleInsuranceSchema>;
export type VehicleInsuranceCoverage = z.infer<
  typeof VehicleInsuranceCoverageSchema
>;
export type VehicleInsuranceDepreciation = z.infer<
  typeof VehicleInsuranceDepreciationSchema
>;
export type VehicleInsuranceTjh = z.infer<typeof VehicleInsuranceTjhSchema>;
export type VehicleInsurancePa = z.infer<typeof VehicleInsurancePaSchema>;
