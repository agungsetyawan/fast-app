import { type DBSchema, openDB } from "idb";

interface AppDB extends DBSchema {
  "query-cache": {
    key: string;
    value: string;
  };
  "form-drafts": {
    key: string;
    value: {
      id: string;
      data: unknown;
      savedAt: number;
    };
  };
}

const DB_NAME = "app-db";
const DB_VERSION = 1;

// Lazy init — hanya dibuat di browser, tidak di server
let dbInstance: ReturnType<typeof openDB<AppDB>> | null = null;

export function getDB() {
  if (typeof window === "undefined") {
    throw new Error("IndexedDB hanya tersedia di browser");
  }

  if (!dbInstance) {
    dbInstance = openDB<AppDB>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion) {
        switch (oldVersion) {
          case 0:
            db.createObjectStore("query-cache");
            db.createObjectStore("form-drafts", { keyPath: "id" });
        }
      },
      blocked() {
        console.warn("Database upgrade blocked. Close other tabs and refresh.");
      },
      blocking() {
        dbInstance = null;
        window.location.reload();
      },
    });
  }

  return dbInstance;
}
