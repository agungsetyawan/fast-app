"use server";

import { createClient } from "@/lib/supabase/server";

export async function logout() {
  const supabase = await createClient();
  return supabase.auth.signOut();
}
