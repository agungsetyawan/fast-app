"use client";

import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import {
  type Paket,
  type PaketDp,
  PaketDpSchema,
  PaketSchema,
  type PaketTenor,
  PaketTenorSchema,
} from "@/lib/types/paket";

export async function getPaket(
  branchId: string,
  dealerId: string,
  vehicleModelId: string,
): Promise<Paket[]> {
  const supabase = createClient();
  const { data: pakets, error } = await supabase
    .from("paket")
    .select(`
    *,
    paket_rule_branch!inner(branch_id),
    paket_rule_dealer!inner(dealer_id),
    paket_rule_jenis_kendaraan!inner(jenis_kendaraan_id)
  `)
    .eq("paket_rule_branch.branch_id", branchId)
    .eq("paket_rule_dealer.dealer_id", dealerId)
    .eq("paket_rule_jenis_kendaraan.jenis_kendaraan_id", vehicleModelId)
    .is("is_enable", true)
    .order("paket_name", { ascending: true });

  if (error) throw new Error(`Fetch paket failed: ${error.message}`);

  return z
    .array(PaketSchema)
    .parse(pakets.map((item) => ({ ...item, name: item.paket_name })));
}

export async function getPaketDp(paketId: string): Promise<PaketDp[]> {
  const supabase = createClient();
  const { data: paketDp, error } = await supabase
    .from("paket_dp")
    .select("id, paket_id, percent_dp, is_enable")
    .eq("paket_id", paketId)
    .is("is_enable", true)
    .order("percent_dp", { ascending: true });

  if (error) throw new Error(`Fetch paket dp failed: ${error.message}`);

  return z.array(PaketDpSchema).parse(paketDp);
}

export async function getPaketTenor(paketId: string): Promise<PaketTenor[]> {
  const supabase = createClient();
  const { data: paketTenor, error } = await supabase
    .from("paket_tenor_setting")
    .select("id, paket_id, tenor, percent_dic, percent_provisi, is_enable")
    .eq("paket_id", paketId)
    .is("is_enable", true)
    .order("tenor", { ascending: true });

  if (error) throw new Error(`Fetch paket tenor failed: ${error.message}`);

  return z.array(PaketTenorSchema).parse(paketTenor);
}
