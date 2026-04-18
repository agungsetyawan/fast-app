import { AppLogo } from "@/components/app-logo";
import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <AppLogo width={200} height={100} />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
