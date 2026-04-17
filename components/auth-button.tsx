import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { ThemeSwitcher } from "./theme-switcher";

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <div className="flex items-center gap-4">
      <ThemeSwitcher />
      Hey, {user.email}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <button type="button" className="btn btn-sm btn-outline">
        <Link href="/auth/login">Sign in</Link>
      </button>
      <button type="button" className="btn btn-sm btn-primary">
        <Link href="/auth/sign-up">Sign up</Link>
      </button>
    </div>
  );
}
