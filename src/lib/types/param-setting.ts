import { z } from "zod";

export const ParamSettingSchema = z.object({
  id: z
    .string()
    .nullish()
    .transform((val) => val ?? ""),
  param_id: z
    .string()
    .nullish()
    .transform((val) => val ?? ""),
  param_name: z
    .string()
    .nullish()
    .transform((val) => val ?? ""),
  param_value: z
    .string()
    .nullish()
    .transform((val) => val ?? ""),
});

export type ParamSetting = z.infer<typeof ParamSettingSchema>;
