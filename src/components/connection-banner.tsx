"use client";

import { WifiOff } from "lucide-react";
import { useOnlineStatus } from "@/hooks/use-online-status";
import { cn } from "@/lib/utils";

export default function ConnectionBanner({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { isOnline } = useOnlineStatus();
  if (isOnline !== false) return null;

  return (
    <div className={cn("badge badge-warning badge-lg", className)} {...props}>
      <WifiOff size={20} />
      <span className="text-sm max-sm:hidden">Your connection is offline</span>
    </div>
  );
}
