import { AppLogo } from "@/components/app-logo";
import { LoginForm } from "@/features/auth/components/login-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <AppLogo width={250} height="auto" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
