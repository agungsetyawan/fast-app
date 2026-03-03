"use client";

export default function OfflinePage() {
  return (
    <div className="text-center mt-5">
      <h1>Kamu sedang Offline</h1>
      <p>Halaman ini belum tersedia tanpa koneksi internet.</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-4"
      >
        Coba Lagi
      </button>
    </div>
  );
}
