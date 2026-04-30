import { z } from "zod";
import { PaketSchema } from "./paket";

export const LifeInsuranceSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  prepaid_onloan: z.string(),
  jumlah_tertanggung: z.number(),
  affinity: z.number(),
  garda_healthtech: z.number(),
  rate: z.array(
    z.object({
      tenor: z.number(),
      percent_premi: z.number(),
    }),
  ),
});

export const LifeInsurancePaketSchema = z.object({
  id: z.uuid(),
  is_enable: z.boolean(),
  life_insurance: LifeInsuranceSchema,
  paket: PaketSchema,
});

export type LifeInsurance = z.infer<typeof LifeInsuranceSchema>;
export type LifeInsurancePaket = z.infer<typeof LifeInsurancePaketSchema>;
