"use client";

import { createClient } from "@/lib/supabase/client";
import { MIME_TO_EXT } from "@/lib/validations/user";

// Mutation untuk nama — bisa offline queue
export async function updateUserName(name: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("users")
    .update({ name })
    .eq("id", user.id);

  if (error) throw new Error(error.message);
  return { success: true };
}

// Mutation untuk avatar — butuh koneksi, tidak di-queue
export async function updateUserAvatar(avatar: File) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const ext = MIME_TO_EXT[avatar.type];
  if (!ext) throw new Error("Format tidak didukung");

  const fileName = `${user.id}-${Date.now()}.${ext}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) throw new Error("Gagal upload gambar");

  // Hapus avatar lama
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

  const { error: dbError } = await supabase
    .from("users")
    .update({ avatar_url: publicUrl })
    .eq("id", user.id);

  if (dbError) throw new Error(dbError.message);
  return { success: true };
}

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  device_id?: string;
  branch_id?: string;
  branch_name?: string;
  avatar_url?: string;
  initialName?: string;
}

// Fetch user — untuk useQuery
export async function getUser() {
  const supabase = createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const { data: user, error } = await supabase
    .from("users_view")
    .select()
    .eq("id", claimsData?.claims?.sub)
    .single();

  if (error) throw new Error(error.message);

  const getInitials = (str: string) => str.match(/\b(\w)/g)?.join("");
  return {
    ...user,
    initialName: getInitials(user.name || ""),
  } as User;
}
