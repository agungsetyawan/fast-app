import { getDB } from "@/lib/db/idb";
import { queryClient } from "@/lib/query/client";

export async function clearAllCache() {
  queryClient.clear();
  const db = await getDB();
  await db.clear("query-cache");
  await db.clear("form-drafts");
}
