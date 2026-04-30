import { z } from "zod";

export const AreaBranchGroupingSchema = z.object({
  id: z.uuid(),
  branch_id: z.uuid(),
  branch_name: z.string(),
  area_asuransi_kendaraan_id: z.uuid(),
  area_asuransi_kendaraan_name: z.string(),
  area_taf_id: z.uuid(),
  area_taf_name: z.string(),
  area_tam_id: z.uuid(),
  area_tam_name: z.string(),
});

export type AreaBranchGrouping = z.infer<typeof AreaBranchGroupingSchema>;
