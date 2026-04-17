import { AppLogo } from "@/components/app-logo";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <AppLogo />
        </div>
        <div className="flex flex-col gap-6">
          <div className="card w-full md:w-96 bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Thank you for signing up!</h2>
              <p>Check your email to confirm</p>
              <p className="text-sm text-muted-foreground">
                You've successfully signed up. Please check your email to
                confirm your account before signing in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
