import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline",
};

export default function OfflinePage() {
  return (
    <div className="text-center mt-5">
      <h1>Kamu sedang Offline</h1>
      <p>Halaman ini belum tersedia tanpa koneksi internet.</p>
    </div>
  );
}
