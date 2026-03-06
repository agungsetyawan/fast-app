"use client";

import { KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const repeatPassword = formData.get("repeatPassword") as string;

    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/protected`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="card w-96 bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Sign up</h2>
          <p>Create a new account</p>
          <form action={handleSignUp}>
            <div className="flex flex-col gap-6 mt-4">
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <label className="input w-full">
                  <Mail className="h-[1em] opacity-50" size={14} />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="email@taf.co.id"
                  />
                </label>
              </div>
              <div className="grid gap-2">
                <label htmlFor="password">Password</label>
                <label className="input w-full">
                  <KeyRound className="h-[1em] opacity-50" size={14} />
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="••••••"
                  />
                </label>
              </div>
              <div className="grid gap-2">
                <label htmlFor="repeatPassword">Repeat Password</label>
                <label className="input w-full">
                  <KeyRound className="h-[1em] opacity-50" size={14} />
                  <input
                    name="repeatPassword"
                    type="password"
                    required
                    placeholder="••••••"
                  />
                </label>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                className="btn btn-primary w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Creating an account..." : "Sign up"}
              </button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
