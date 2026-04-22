"use client";

import imageCompression from "browser-image-compression";
import { deleteDraft, getDraft, saveDraft } from "@/lib/db/form-drafts";
import { createClient } from "@/lib/supabase/client";
import { MIME_TO_EXT } from "@/lib/validations/user";

// --- Types ---
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

// --- Helpers ---
const getInitials = (name: string) =>
  name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "";

async function getAuthenticatedSession() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) throw new Error("Unauthorized");
  return { supabase, user: session.user };
}

// --- Main Functions ---

export async function getUser(): Promise<User> {
  const { supabase, user: authUser } = await getAuthenticatedSession();

  const { data: user, error } = await supabase
    .from("users_view")
    .select()
    .eq("id", authUser.id)
    .single();

  if (error) throw new Error(`Fetch user failed: ${error.message}`);

  return {
    ...user,
    initialName: getInitials(user.name || ""),
  };
}

export async function updateUserName(
  name: string,
): Promise<{ success: boolean; queued?: boolean }> {
  // Offline handling
  if (typeof window !== "undefined" && !navigator.onLine) {
    await saveDraft("pending-name-update", { name });
    return { success: true, queued: true };
  }

  const { supabase, user } = await getAuthenticatedSession();

  const { error } = await supabase
    .from("users")
    .update({ name })
    .eq("id", user.id);

  if (error) throw new Error(error.message);
  return { success: true, queued: false };
}

export async function syncPendingNameUpdate(): Promise<boolean> {
  const draft = await getDraft<{ name: string }>("pending-name-update");
  if (!draft) return false;

  try {
    await updateUserName(draft.name);
    await deleteDraft("pending-name-update");
    return true;
  } catch (error) {
    console.error("Sync failed:", error);
    return false;
  }
}

export async function updateUserAvatar(
  avatar: File,
): Promise<{ success: boolean }> {
  const { supabase, user } = await getAuthenticatedSession();

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  let fileToUpload = avatar;
  try {
    fileToUpload = await imageCompression(avatar, options);
  } catch (error) {
    console.error("Compression failed, uploading original...", error);
  }

  const ext = MIME_TO_EXT[fileToUpload.type];
  if (!ext) {
    throw new Error("Format tidak didukung. Gunakan JPG, PNG, atau WebP.");
  }

  const fileName = `${user.id}/avatar-${Date.now()}.${ext}`;
  const bucket = supabase.storage.from("avatars");

  // 1. Upload file baru
  const { error: uploadError } = await bucket.upload(fileName, fileToUpload);
  if (uploadError) throw new Error("Gagal upload gambar ke storage");

  // 2. Ambil data lama untuk cleanup nanti
  const { data: userData } = await supabase
    .from("users")
    .select("avatar_url")
    .eq("id", user.id)
    .single();

  // 3. Update DB
  const {
    data: { publicUrl },
  } = bucket.getPublicUrl(fileName);
  const { error: dbError } = await supabase
    .from("users")
    .update({ avatar_url: publicUrl })
    .eq("id", user.id);

  if (dbError) {
    // Optional: rollback upload if DB update fails
    await bucket.remove([fileName]);
    throw new Error("Gagal memperbarui profil di database");
  }

  // 4. Cleanup old file (Fire and forget)
  if (userData?.avatar_url) {
    const oldPath = userData.avatar_url.split("/avatars/")[1];
    if (oldPath) bucket.remove([oldPath]).catch(console.error);
  }

  return { success: true };
}
