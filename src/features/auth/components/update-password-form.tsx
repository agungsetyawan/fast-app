"use client";

import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type ActionState = {
  error: string | null;
};

const initialState: ActionState = {
  error: null,
};

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const updatePasswordAction = async (
    _prevState: ActionState,
    formData: FormData,
  ): Promise<ActionState> => {
    const password = formData.get("password") as string;
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      router.push("/app");
      return { error: null };
    } catch (error: unknown) {
      return {
        error: error instanceof Error ? error.message : "An error occurred",
      };
    }
  };

  const [state, formAction, isLoading] = useActionState(
    updatePasswordAction,
    initialState,
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="card w-full md:w-96 bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Reset Your Password</h2>
          <p>Please enter your new password below.</p>
          <form action={formAction}>
            <div className="flex flex-col gap-6 mt-4">
              <div className="grid gap-2">
                <label htmlFor="password">New password</label>
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
              {state.error && (
                <p className="text-sm text-red-500">{state.error}</p>
              )}
              <button
                className="btn btn-primary w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <span className="loading loading-spinner"></span>}
                {isLoading ? "Saving..." : "Save new password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
