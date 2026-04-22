"use client";

import { createClient } from "@/lib/supabase/client";

export async function getAuthenticatedSession() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) throw new Error("Unauthorized");
  return { user: session.user };
}
