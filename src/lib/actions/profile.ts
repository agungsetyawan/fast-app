"use client";

import { deleteDraft, getDraft, saveDraft } from "@/lib/db/form-drafts";
import { createClient } from "@/lib/supabase/client";
import { MIME_TO_EXT } from "@/lib/validations/user";

export interface User {
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

export async function getUser(): Promise<User> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) throw new Error("Unauthorized");

  const { data: user, error } = await supabase
    .from("users_view")
    .select()
    .eq("id", session.user?.id)
    .single();

  if (error) throw new Error(error.message);

  const getInitials = (str: string) => str.match(/\b(\w)/g)?.join("");
  return {
    ...user,
    initialName: getInitials(user.name || ""),
  } as User;
}

export async function updateUserName(
  name: string,
): Promise<{ success: boolean; queued?: boolean }> {
  if (!navigator.onLine) {
    await saveDraft("pending-name-update", { name });
    return { success: true, queued: true };
  }

  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("users")
    .update({ name })
    .eq("id", session.user.id);

  if (error) throw new Error(error.message);
  return { success: true, queued: false };
}

export async function syncPendingNameUpdate(): Promise<boolean> {
  const draft = await getDraft<{ name: string }>("pending-name-update");
  if (!draft) return false;

  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("users")
    .update({ name: draft.name })
    .eq("id", session.user.id);

  if (error) throw new Error(error.message);

  await deleteDraft("pending-name-update");
  return true;
}

export async function updateUserAvatar(
  avatar: File,
): Promise<{ success: boolean }> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) throw new Error("Unauthorized");

  const ext = MIME_TO_EXT[avatar.type];
  if (!ext) throw new Error("Format tidak didukung");

  const fileName = `${session.user?.id}-${Date.now()}.${ext}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) throw new Error("Gagal upload gambar");

  const { data: oldUser } = await supabase
    .from("users")
    .select("avatar_url")
    .eq("id", session.user?.id)
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
    .eq("id", session.user?.id);

  if (dbError) throw new Error(dbError.message);
  return { success: true };
}
