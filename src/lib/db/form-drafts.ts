import { getDB } from "@/lib/db/idb";

export async function saveDraft<T>(formId: string, data: T): Promise<void> {
  const db = await getDB();
  await db.put("form-drafts", { id: formId, data, savedAt: Date.now() });
}

export async function getDraft<T>(formId: string): Promise<T | undefined> {
  const db = await getDB();
  const draft = await db.get("form-drafts", formId);
  return draft?.data as T | undefined;
}

export async function deleteDraft(formId: string): Promise<void> {
  const db = await getDB();
  await db.delete("form-drafts", formId);
}

export async function getAllDrafts<T>(): Promise<
  {
    id: string;
    data: T;
    savedAt: number;
  }[]
> {
  const db = await getDB();
  const all = await db.getAll("form-drafts");
  return all as { id: string; data: T; savedAt: number }[];
}
