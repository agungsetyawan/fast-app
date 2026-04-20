"use client";

import { ChartColumnBig, FileText, Home, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { id: "Home", icon: Home, href: "/app" },
  { id: "Simulation", icon: ChartColumnBig, href: "/app/simulation" },
  { id: "Report", icon: FileText, href: "/app/report" },
  { id: "Setting", icon: Settings, href: "/app/setting" },
] as const;

export default function Dock() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (href: string) => {
    if (pathname === href) return;
    router.push(href);
  };

  return (
    <>
      <div className="mb-16"></div>
      <div className="dock dock-sm bg-base-200 shadow-sm">
        {NAV_ITEMS.map(({ id, icon: Icon, href }) => {
          const isActive = pathname === href;

          return (
            <button
              key={id}
              type="button"
              className={isActive ? "dock-active" : ""}
              onClick={() => handleNavigation(href)}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </div>
    </>
  );
}
