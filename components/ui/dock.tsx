"use client";

import { ChartColumnBig, FileText, Home, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { id: "Home", icon: Home, href: "/protected" },
  { id: "Simulation", icon: ChartColumnBig, href: "/protected/simulation" },
  { id: "Report", icon: FileText, href: "/protected/report" },
  { id: "Setting", icon: Settings, href: "/protected/setting" },
] as const;

const Dock = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (href: string) => {
    if (pathname === href) return;
    router.push(href);
  };

  return (
    <div className="dock dock-sm">
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
  );
};

export { Dock };
