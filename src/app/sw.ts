/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { defaultCache } from "@serwist/turbopack/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { NetworkFirst, NetworkOnly, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  precacheOptions: {
    cleanupOutdatedCaches: true,
  },
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    // Jangan cache API Auth Supabase
    {
      matcher: /.*\/auth\/v1\/.*/,
      handler: new NetworkOnly(),
    },

    // Mutation (POST, PATCH, DELETE) tidak boleh di-cache
    {
      matcher: /.*\/rest\/v1\/.*/,
      method: "POST",
      handler: new NetworkOnly(),
    },
    {
      matcher: /.*\/rest\/v1\/.*/,
      method: "PATCH",
      handler: new NetworkOnly(),
    },
    {
      matcher: /.*\/rest\/v1\/.*/,
      method: "DELETE",
      handler: new NetworkOnly(),
    },

    // Supabase Storage juga NetworkOnly
    {
      matcher: /.*\/storage\/v1\/.*/,
      handler: new NetworkOnly(),
    },

    // Gunakan NetworkFirst untuk rute app agar tetap aman
    {
      matcher: ({ url }) => url.pathname.startsWith("/app"),
      handler: new NetworkFirst({
        cacheName: "authenticated-routes",
        networkTimeoutSeconds: 5,
      }),
    },
    ...defaultCache,
  ],
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

serwist.addEventListeners();
