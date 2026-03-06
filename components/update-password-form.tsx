"use client";

import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (formData: FormData) => {
    const password = formData.get("password") as string;

    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
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
          <h2 className="card-title">Reset Your Password</h2>
          <p>Please enter your new password below.</p>
          <form action={handleForgotPassword}>
            <div className="flex flex-col gap-6 mt-4">
              <div className="grid gap-2">
                <label htmlFor="email">New password</label>
                <label className="input w-full">
                  <KeyRound className="h-[1em] opacity-50" size={14} />
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="New password"
                  />
                </label>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                className="btn btn-primary w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save new password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
