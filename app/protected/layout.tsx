import Link from "next/link";
import { Suspense } from "react";
import { AppIcon } from "@/components/app-icon";
import { AuthButton } from "@/components/auth-button";
import { Dock } from "@/components/ui/dock";
import Navbar from "@/components/ui/navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-3 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 max-sm:hidden">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>
                <AppIcon width={32} height={32} />
              </Link>
            </div>
            <Suspense>
              <AuthButton />
            </Suspense>
          </div>
        </nav>
        <Navbar />
        <div className="flex-1 flex flex-col gap-20 max-w-5xl lg:p-5 w-full items-center">
          {children}
        </div>
        <Dock />
      </div>
    </main>
  );
}
