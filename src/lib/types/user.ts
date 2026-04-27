import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z
    .string()
    .nullish()
    .transform((val) => val ?? ""),
  role: z
    .enum(["super_admin", "admin", "user"])
    .nullish()
    .transform((val) => val ?? "user"),
  device_id: z
    .string()
    .nullish()
    .transform((val) => val ?? ""),
  branch_id: z
    .string()
    .nullish()
    .transform((val) => val ?? ""),
  branch_name: z
    .string()
    .nullish()
    .transform((val) => val ?? ""),
  avatar_url: z
    .string()
    .nullish()
    .transform((val) => val ?? ""),
  initialName: z
    .string()
    .nullish()
    .transform((val) => val ?? ""),
  created_at: z.coerce
    .date()
    .nullish()
    .transform((val) => val ?? ""),
  last_sign_in_at: z.coerce.date().nullable(),
});

export type User = z.infer<typeof UserSchema>;
