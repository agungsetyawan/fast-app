import { AppLogo } from "@/components/app-logo";
import { UpdatePasswordForm } from "@/components/update-password-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <AppLogo />
        </div>
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
