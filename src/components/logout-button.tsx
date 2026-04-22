"use client";

import { clearAllCache } from "@/lib/query/mutation-defaults";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type LogoutButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

export function LogoutButton({ className, children }: LogoutButtonProps) {
  const handleLogout = async () => {
    await clearAllCache();

    const supabase = createClient();
    await supabase.auth.signOut();

    window.location.href = "/auth/login";
  };

  return (
    <button
      type="button"
      className={cn("btn", className)}
      onClick={handleLogout}
    >
      {children ? children : "Logout"}
    </button>
  );
}
