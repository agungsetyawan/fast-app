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

export const PaketDetailSchema = z.object({
  percent_dp: z.float32(),
  percent_dic: z.float32(),
  percent_provisi: z.float32(),
  types: z.array(
    z.object({
      tipe_angsuran: z.string(),
      details: z.array(
        z.object({
          tenor: z.number().int(),
          rate: z.float32(),
        }),
      ),
    }),
  ),
});

export type Paket = z.infer<typeof PaketSchema>;
export type PaketDp = z.infer<typeof PaketDpSchema>;
export type PaketDetail = z.infer<typeof PaketDetailSchema>;
