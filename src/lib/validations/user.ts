import { z } from "zod";

export const MAX_FILE_SIZE = 1024 * 1024;
export const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export const UserSchema = z.object({
  name: z
    .string()
    .min(3, "Nama minimal 3 karakter")
    .optional()
    .or(z.literal("")),
  avatar: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "File terlalu besar. Maksimal 1MB.",
    )
    .refine(
      (file) => ALLOWED_TYPES.includes(file.type),
      "Format tidak didukung. Gunakan JPG, PNG, atau WebP.",
    )
    .optional(),
});

export type UserFormData = z.infer<typeof UserSchema>;
