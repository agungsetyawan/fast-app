"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConnectionBanner from "../connection-banner";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const pageName = pathname.replace(/^\/app\/?|\//g, "") || "home";

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar sticky top-0 z-100 sm:hidden transition-all duration-300 
        ${
          isScrolled ? "backdrop-blur-md shadow-md py-3" : "bg-transparent py-4"
        }`}
    >
      <div className="flex-none">
        <button
          type="button"
          className="btn btn-square btn-ghost"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </button>
      </div>
      <div className="flex-1 ml-4 font-bold text-lg capitalize">{pageName}</div>
      <ConnectionBanner className="animate-pulse" />
    </nav>
  );
}
