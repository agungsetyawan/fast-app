"use client";

import { createClient } from "@/lib/supabase/client";
import { MIME_TO_EXT, UserSchema } from "@/lib/validations/user";

interface UpdateUserResult {
  success?: boolean;
  message: string;
  errors?: Record<string, string[]>;
  enteredValues?: {
    name: string;
    avatar?: File;
  };
}

interface UpdateUserData {
  name: string;
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

  // 2. Validasi input via Zod
  const nameField = formData.get("name") as string;
  const avatarFile = formData.get("avatar") as File;

  const rawData = {
    name: nameField,
    avatar: avatarFile.size > 0 ? avatarFile : undefined,
  };

  const validatedFields = UserSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Check your input field",
      enteredValues: {
        name: rawData.name,
        avatar: rawData.avatar,
      },
    };
  }

  const { name, avatar } = validatedFields.data;
  const updateData = { name } as UpdateUserData;

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
        enteredValues: {
          name: rawData.name,
          avatar: rawData?.avatar,
        },
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
      enteredValues: {
        name: rawData.name,
        avatar: rawData?.avatar,
      },
    };
  }

  return { success: true, message: "Profil berhasil diperbarui" };
}
