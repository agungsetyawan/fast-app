import { z } from "zod";

export const PaketSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  confins_name: z.string().nullable(),
  start_date: z.coerce.date().nullable(),
  end_date: z.coerce.date().nullable(),
  paket_group: z.string().nullable(),
  paket_type: z.string(),
  is_enable: z.boolean(),
});

export const PaketDpSchema = z.object({
  id: z.uuid(),
  paket_id: z.uuid(),
  percent_dp: z.float32().min(0).max(100),
  is_enable: z.boolean(),
});

export const PaketTenorSchema = z.object({
  id: z.uuid(),
  paket_id: z.uuid(),
  tenor: z.number().int(),
  percent_dic: z.float32().min(0).max(100).nullable(),
  percent_provisi: z.float32().min(0).max(100).nullable(),
  is_enable: z.boolean(),
});

export type Paket = z.infer<typeof PaketSchema>;
export type PaketDp = z.infer<typeof PaketDpSchema>;
export type PaketTenor = z.infer<typeof PaketTenorSchema>;
