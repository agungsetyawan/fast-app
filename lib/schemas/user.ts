import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter").nullish(),
  email: z.email("Format email salah").nullish(),
});

export type UserFormData = z.infer<typeof UserSchema>;
