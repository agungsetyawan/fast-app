import { z } from "zod";

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

export type LifeInsurance = z.infer<typeof LifeInsuranceSchema>;
