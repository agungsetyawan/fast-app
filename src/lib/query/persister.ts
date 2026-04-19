import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { getDB } from "@/lib/db/idb";

export const persister = createAsyncStoragePersister({
  storage: {
    getItem: async (key) => {
      const db = await getDB();
      return (await db.get("query-cache", key)) ?? null;
    },
    setItem: async (key, value) => {
      const db = await getDB();
      await db.put("query-cache", value, key);
    },
    removeItem: async (key) => {
      const db = await getDB();
      await db.delete("query-cache", key);
    },
  },
});
