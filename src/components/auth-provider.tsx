"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import useUserStore from "@/store/useUserStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useUserStore((state) => state.setUser);
  const setSession = useUserStore((state) => state.setSession);
  const clearAuth = useUserStore((state) => state.clearAuth);

  const supabase = createClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
        setUser(session.user);
      } else {
        clearAuth();
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, setSession, clearAuth, supabase]);

  return <>{children}</>;
}
