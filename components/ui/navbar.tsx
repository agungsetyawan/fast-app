"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const pageName = pathname.replace(/^\/protected\/?|\//g, "") || "home";

  return (
    <nav className="navbar sticky top-0 z-1 bg-base-100 shadow-sm sm:hidden">
      <div className="flex-none">
        <button
          type="button"
          className="btn btn-square btn-ghost"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </button>
      </div>
      <div className="flex-1 ml-4">{pageName.toUpperCase()}</div>
    </nav>
  );
}
