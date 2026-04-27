"use client";

import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { type Paket, PaketSchema } from "@/lib/types/paket";

export async function getPaketByBranch(branchId: string): Promise<Paket[]> {
  const supabase = createClient();
  const { data: pakets, error } = await supabase
    .from("paket_branch_setting")
    .select("id, branch_id, paket_id, is_enable, paket(*)")
    .eq("branch_id", branchId)
    .is("is_enable", true);
  // .is("paket(is_enable)", true);
  // .order("paket(paket_name)", { ascending: true });

  if (error) throw new Error(`Fetch paket failed: ${error.message}`);

  return z
    .array(PaketSchema)
    .parse(
      pakets.map((item) => ({ ...item.paket, name: item.paket.paket_name })),
    );
}
