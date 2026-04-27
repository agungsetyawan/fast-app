import { z } from "zod";

export const PaketSchema = z.object({
  id: z.string(),
  name: z.string(),
  confins_name: z.string().nullable(),
  start_date: z.coerce.date().nullable(),
  end_date: z.coerce.date().nullable(),
  paket_group: z.string().nullable(),
  paket_type: z.string(),
  is_enable: z.boolean(),
});

export type Paket = z.infer<typeof PaketSchema>;
