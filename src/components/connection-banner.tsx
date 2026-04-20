"use client";
import { useEffect, useState } from "react";

export default function ConnectionBanner() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline !== false) return null;

  return (
    <div className="fixed bottom-15 left-0 right-0 bg-warning text-warning-content p-2 text-center text-sm z-100">
      You are offline.
    </div>
  );
}
