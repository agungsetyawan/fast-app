"use client";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export default function ConnectionBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white p-2 text-center text-sm z-50">
      ⚠️ Koneksi terputus. Beberapa fitur mungkin tidak berfungsi.
    </div>
  );
}
