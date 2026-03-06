"use client";

import { KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/protected");
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
          <h2 className="card-title">Login</h2>
          <p>Enter your email below to login to your account</p>
          <form action={handleLogin}>
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
                <div className="flex items-center">
                  <label htmlFor="password">Password</label>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
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
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                className="btn btn-primary w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
