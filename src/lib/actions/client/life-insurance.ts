"use client";

import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import {
  type LifeInsurance,
  type LifeInsurancePaket,
  LifeInsurancePaketSchema,
  LifeInsuranceSchema,
} from "@/lib/types/life-insurance";

export async function getLifeInsurance(
  paketId: string,
): Promise<LifeInsurance[]> {
  const supabase = createClient();
  const { data: lifeInsurance, error } = await supabase
    .from("v_life_insurance_premi")
    .select("*")
    .eq("paket_id", paketId)
    .order("life_insurance_name", { ascending: true });

  if (error) throw new Error(`Fetch life insurance failed: ${error.message}`);

  const mappedLifeInsurance = lifeInsurance.reduce<LifeInsurance[]>(
    (acc, item) => {
      let lifeInsurance = acc.find((i) => i.id === item.life_insurance_id);

      if (!lifeInsurance) {
        lifeInsurance = {
          id: item.life_insurance_id ?? "",
          name: item.life_insurance_name ?? "",
          prepaid_onloan: item.prepaid_onloan ?? "",
          jumlah_tertanggung: item.jumlah_tertanggung ?? 0,
          affinity: item.affinity ?? 0,
          garda_healthtech: item.garda_healthtech ?? 0,
          rate: [],
        };
        acc.push(lifeInsurance);
      }

      lifeInsurance.rate.push({
        tenor: item.tenor ?? 0,
        percent_premi: item.percent_premi ?? 0,
      });

      return acc;
    },
    [],
  );

  return z.array(LifeInsuranceSchema).parse(mappedLifeInsurance);
}

export async function getLifeInsuranceByPaket(
  paketId: string,
): Promise<LifeInsurancePaket[]> {
  const supabase = createClient();
  const { data: lifeInsurancePaket, error } = await supabase
    .from("life_insurance_paket_mapping")
    .select(`
        *,
        life_insurance!inner(*),
        paket!inner(*)
    `)
    .eq("paket_id", paketId)
    .eq("is_enable", true)
    .eq("life_insurance.is_enable", true)
    .eq("paket.is_enable", true)
    .order("life_insurance(name)", { ascending: true });

  if (error) throw new Error(`Fetch life insurance failed: ${error.message}`);

  return z.array(LifeInsurancePaketSchema).parse(
    lifeInsurancePaket.map((item) => ({
      ...item,
      paket: { ...item.paket, name: item.paket.paket_name },
    })),
  );
}
