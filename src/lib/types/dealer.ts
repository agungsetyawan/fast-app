import { z } from "zod";

export const DealerSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  tipe_dealer: z.string(),
  is_enable: z.boolean(),
  address: z.string().nullable(),
  pic: z.string().nullable(),
});

export type Dealer = z.infer<typeof DealerSchema>;
