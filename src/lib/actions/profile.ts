"use server";

import { revalidatePath } from "next/cache";
import { UserSchema } from "@/lib/schemas/user";
import { createClient } from "@/lib/supabase/server";

export async function getUser() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const { data: user, error } = await supabase
    .from("users_view")
    .select()
    .eq("id", claimsData?.claims?.sub)
    .single();

  if (error) return { error: error.message };

  const getInitials = (str: string) => str.match(/\b(\w)/g)?.join("");

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    initialName: getInitials(user.name || ""),
    avatar_url: user.avatar_url,
    branch_name: user.branch_name,
    device_id: user.device_id,
  };
}

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
// const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

interface UpdateUserResult {
  success?: boolean;
  message: string;
  errors?: Record<string, string[]>;
  enteredValues?: { name: string; avatar?: File | null };
}

interface UpdateUserData {
  name: string | null;
  avatar_url?: string;
}
export async function updateUser(
  _prevState: unknown,
  formData: FormData,
): Promise<UpdateUserResult> {
  const supabase = await createClient();

  // 1. Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { message: "Unauthorized" };

  // 2. Validasi input
  const rawData = { name: formData.get("name") as string };
  const validatedFields = UserSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Check your input field",
      enteredValues: rawData,
    };
  }

  const { name = "" } = validatedFields.data;
  const updateData: UpdateUserData = { name };

  // 3. Handle avatar upload
  const imageFile = formData.get("avatar") as File | null;

  if (imageFile && imageFile.size > 0) {
    // Validasi ukuran
    if (imageFile.size > MAX_FILE_SIZE) {
      return {
        errors: { avatar: ["File terlalu besar. Maksimal ukuran adalah 1MB."] },
        message: "File terlalu besar. Maksimal ukuran adalah 1MB.",
        enteredValues: rawData,
      };
    }

    // Validasi tipe — derive ekstensi dari MIME type, bukan nama file
    const ext = MIME_TO_EXT[imageFile.type];
    if (!ext) {
      return {
        errors: {
          avatar: ["Format file tidak didukung. Gunakan JPG, PNG, atau WebP."],
        },
        message: "Format file tidak didukung. Gunakan JPG, PNG, atau WebP.",
        enteredValues: rawData,
      };
    }

    // Upload dulu sebelum hapus yang lama (hindari race condition)
    const fileName = `${user.id}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, imageFile);

    if (uploadError) {
      return {
        errors: { avatar: ["Gagal upload gambar ke storage"] },
        message: "Gagal upload gambar ke storage",
        enteredValues: rawData,
      };
    }

    // Hapus avatar lama SETELAH upload baru berhasil
    const { data: oldUser } = await supabase
      .from("users")
      .select("avatar_url")
      .eq("id", user.id)
      .single();

    if (oldUser?.avatar_url) {
      // Extract path relatif dari full public URL
      const url = new URL(oldUser.avatar_url);
      console.log("pathname:", url.pathname);

      const oldPath = url.pathname.split("/avatars/")[1];
      console.log("oldPath:", oldPath);

      if (oldPath) {
        // Fire-and-forget: jangan block jika gagal hapus
        supabase.storage.from("avatars").remove([oldPath]).catch(console.error);
      }
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(fileName);

    updateData.avatar_url = publicUrl;
  }

  // 4. Update database
  const { error: dbError } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", user.id);

  if (dbError) {
    return {
      errors: { avatar: ["Gagal update profil"] },
      message: dbError.message,
      enteredValues: rawData,
    };
  }

  revalidatePath("/app/setting");
  return { success: true, message: "Profil berhasil diperbarui" };
}
