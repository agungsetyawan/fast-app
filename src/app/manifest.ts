import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fast App",
    short_name: "FastApp",
    description: "Fast Application",
    start_url: "/app",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0089ca",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
