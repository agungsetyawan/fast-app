import { z } from "zod";

export const OtherFeeSchema = z.object({
  id: z.uuid(),
  branch_dealer_mapping_id: z.uuid(),
  max_value: z.number().int(),
  min_value: z.number().int(),
});

export type OtherFee = z.infer<typeof OtherFeeSchema>;
