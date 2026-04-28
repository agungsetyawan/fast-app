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

export type VehicleInsurance = z.infer<typeof VehicleInsuranceSchema>;
