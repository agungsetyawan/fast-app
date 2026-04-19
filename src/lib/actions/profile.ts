"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { MIME_TO_EXT, UserSchema } from "@/lib/validations/user";

interface UpdateUserResult {
  success?: boolean;
  message: string;
  errors?: Record<string, string[]>;
  enteredValues?: { name: string };
}

interface UpdateUserData {
  name: string | null;
  avatar_url?: string;
}

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

  // 2. Validasi input via Zod
  const rawData = {
    name: String(formData.get("name") ?? ""),
    avatar: formData.get("avatar") as File | undefined,
  };

  const validatedFields = UserSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Check your input field",
      enteredValues: { name: rawData.name },
    };
  }

  const { name = "", avatar } = validatedFields.data;
  const updateData: UpdateUserData = { name: name || null };

  // 3. Handle avatar upload
  if (avatar && avatar.size > 0) {
    // Derive ekstensi dari MIME type (sudah tervalidasi Zod)
    const ext = MIME_TO_EXT[avatar.type];
    const fileName = `${user.id}-${Date.now()}.${ext}`;

    // Upload baru dulu sebelum hapus lama
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatar);

    if (uploadError) {
      return {
        errors: { avatar: ["Gagal upload gambar ke storage"] },
        message: "Gagal upload gambar ke storage",
        enteredValues: { name: rawData.name },
      };
    }

    // Hapus avatar lama setelah upload berhasil
    const { data: oldUser } = await supabase
      .from("users")
      .select("avatar_url")
      .eq("id", user.id)
      .single();

    if (oldUser?.avatar_url) {
      const url = new URL(oldUser.avatar_url);
      const oldPath = url.pathname.split("/avatars/")[1];
      if (oldPath) {
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
      message: dbError.message,
      enteredValues: { name: rawData.name },
    };
  }

  revalidatePath("/app/setting");
  return { success: true, message: "Profil berhasil diperbarui" };
}
