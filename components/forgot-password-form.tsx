"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type ActionState = {
  error: string | null;
  success: boolean;
  email: string;
};

const initialState: ActionState = {
  error: null,
  success: false,
  email: "",
};

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const forgotPasswordAction = async (
    _prevState: ActionState,
    formData: FormData,
  ): Promise<ActionState> => {
    const email = formData.get("email") as string;
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/update-password`,
      });
      if (error) throw error;

      return { error: null, success: true, email: "" };
    } catch (error: unknown) {
      return {
        error: error instanceof Error ? error.message : "An error occurred",
        success: false,
        email,
      };
    }
  };

  const [state, formAction, isLoading] = useActionState(
    forgotPasswordAction,
    initialState,
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {state.success ? (
        <div className="card w-full md:w-96 bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Check Your Email</h2>
            <p>Password reset instructions sent</p>
            <p className="text-sm text-muted-foreground">
              If you registered using your email and password, you will receive
              a password reset email.
            </p>
          </div>
        </div>
      ) : (
        <div className="card w-full md:w-96 bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Reset Your Password</h2>
            <p>
              Type in your email and we'll send you a link to reset your
              password
            </p>
            <form action={formAction}>
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
                      defaultValue={state.email}
                      key={state.email}
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
                  {isLoading ? "Sending..." : "Send reset email"}
                </button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
