"use client";
import { useOnlineStatus } from "@/hooks/use-online-status";

export default function ConnectionBanner() {
  const isOnline = useOnlineStatus();
  if (isOnline !== false) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-warning text-warning-content p-2 text-center text-sm z-100">
      You are offline
    </div>
  );
}
