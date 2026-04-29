"use client";

import { createClient } from "@/lib/supabase/client";
import { type OtherFee, OtherFeeSchema } from "@/lib/types/fee";

export async function getOtherFee(
  branchDealerMappingId: string,
): Promise<OtherFee> {
  const supabase = createClient();
  const { data: otherFee, error } = await supabase
    .from("other_fee")
    .select("*")
    .eq("branch_dealer_mapping_id", branchDealerMappingId);

  if (error) throw new Error(`Fetch other fee failed: ${error.message}`);

  return OtherFeeSchema.parse(otherFee[0]);
}
