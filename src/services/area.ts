"use client";

import { createClient } from "@/lib/supabase/client";
import {
  type AreaBranchGrouping,
  AreaBranchGroupingSchema,
} from "@/types/area";

export async function getAreaBranchGrouping(
  branchId: string,
): Promise<AreaBranchGrouping> {
  const supabase = createClient();
  const { data: areaBranchGrouping, error } = await supabase
    .from("area_branch_grouping")
    .select(
      "*, branch(name), area_asuransi_kendaraan(name), area_taf(name), area_tam(name)",
    )
    .eq("branch_id", branchId)
    .is("is_enable", true)
    .order("branch(name)", { ascending: true })
    .order("area_asuransi_kendaraan(name)", { ascending: true })
    .order("area_taf(name)", { ascending: true })
    .order("area_tam(name)", { ascending: true })
    .single();

  if (error)
    throw new Error(`Fetch area branch grouping failed: ${error.message}`);

  return AreaBranchGroupingSchema.parse({
    ...areaBranchGrouping,
    branch_name: areaBranchGrouping.branch.name,
    area_asuransi_kendaraan_name:
      areaBranchGrouping.area_asuransi_kendaraan.name,
    area_taf_name: areaBranchGrouping.area_taf.name,
    area_tam_name: areaBranchGrouping.area_tam.name,
  });
}
