"use client";

import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import {
  type LifeInsurance,
  LifeInsuranceSchema,
} from "@/types/life-insurance";

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
