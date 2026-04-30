"use client";

import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { type ParamSetting, ParamSettingSchema } from "@/types/param-setting";

export async function getParamSetting(): Promise<ParamSetting[]> {
  const supabase = createClient();
  const { data: paramSettings, error } = await supabase
    .from("param_setting_view")
    .select("id, param_id, param_name, param_value")
    .order("param_name", { ascending: true })
    .order("param_value", { ascending: true });

  if (error) throw new Error(`Fetch param setting failed: ${error.message}`);

  return z.array(ParamSettingSchema).parse(paramSettings);
}
