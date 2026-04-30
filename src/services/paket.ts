"use client";

import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import {
  type Paket,
  type PaketDetail,
  PaketDetailSchema,
  type PaketDp,
  PaketDpSchema,
  PaketSchema,
} from "@/types/paket";

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

export async function getPaketDetail(
  paketId: string,
  branchId: string,
): Promise<PaketDetail[]> {
  const supabase = createClient();
  const { data: paketDetails, error } = await supabase
    .from("v_paket_rate")
    .select("*")
    .eq("paket_id", paketId)
    .eq("branch_id", branchId)
    .order("percent_dp", { ascending: true })
    .order("tipe_angsuran", { ascending: true })
    .order("tenor", { ascending: true });

  const mappedPaketDetail = paketDetails?.reduce<PaketDetail[]>((acc, item) => {
    let dpGroup = acc.find((d) => d.percent_dp === item.percent_dp);
    if (!dpGroup) {
      dpGroup = {
        percent_dp: item.percent_dp ?? 0,
        percent_dic: item.percent_dic ?? 0,
        percent_provisi: item.percent_provisi ?? 0,
        types: [],
      };
      acc.push(dpGroup);
    }

    let typeGroup = dpGroup.types.find(
      (t) => t.tipe_angsuran === item.tipe_angsuran,
    );
    if (!typeGroup) {
      typeGroup = { tipe_angsuran: item.tipe_angsuran ?? "", details: [] };
      dpGroup.types.push(typeGroup);
    }

    typeGroup.details.push({
      tenor: item.tenor ?? 0,
      rate: item.percent_selling_rate ?? 0,
    });

    typeGroup.details.sort((a, b) => a.tenor - b.tenor);

    return acc;
  }, []);

  if (error) throw new Error(`Fetch paket detail failed: ${error.message}`);

  return z.array(PaketDetailSchema).parse(mappedPaketDetail);
}
