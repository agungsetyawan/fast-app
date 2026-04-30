"use client";

import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { type Dealer, DealerSchema } from "@/types/dealer";

export async function getDealerByBranch(branchId: string): Promise<Dealer[]> {
  const supabase = createClient();
  const { data: dealers, error } = await supabase
    .from("branch_dealer_mapping")
    .select("id, dealer(id, name, is_enable, tipe_dealer, address, pic)")
    .eq("branch_id", branchId)
    .is("is_enable", true)
    .order("dealer(name)", { ascending: true });

  if (error) throw new Error(`Fetch dealer failed: ${error.message}`);

  return z.array(DealerSchema).parse(
    dealers.map((item) => ({
      ...item.dealer,
      branch_dealer_mapping_id: item.id,
    })),
  );
}
