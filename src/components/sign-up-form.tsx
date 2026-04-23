"use client";

import { KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type ActionState = {
  error: string | null;
  email: string;
};

const initialState: ActionState = {
  error: null,
  email: "",
};

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const signUpAction = async (
    _prevState: ActionState,
    formData: FormData,
  ): Promise<ActionState> => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const repeatPassword = formData.get("repeatPassword") as string;

    if (password !== repeatPassword) {
      return { error: "Passwords do not match", email };
    }

    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/app`,
        },
      });
      if (error) throw error;

      router.push("/auth/sign-up-success");
      return { error: null, email: "" };
    } catch (error: unknown) {
      return {
        error: error instanceof Error ? error.message : "An error occurred",
        email,
      };
    }
  };

  const [state, formAction, isLoading] = useActionState(
    signUpAction,
    initialState,
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="card w-full md:w-96 bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Sign up</h2>
          <p>Create a new account</p>
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
              {state.error && (
                <p className="text-sm text-red-500">{state.error}</p>
              )}
              <button
                className="btn btn-primary w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <span className="loading loading-spinner"></span>}
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
