"use server";

import { revalidatePath } from "next/cache";
import { UserSchema } from "@/lib/schemas/user";
import { createClient } from "@/lib/supabase/server";

export async function getUser() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const { data: user, error } = await supabase
    .from("users_view")
    .select()
    .eq("id", claimsData?.claims?.sub)
    .single();

  if (error) return { error: error.message };

  const getInitials = (str: string) => str.match(/\b(\w)/g)?.join("");

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    initialName: getInitials(user.name || ""),
    profile_photo_url: user.profile_photo_url,
    branch_name: user.branch_name,
    device_id: user.device_id,
  };
}

export async function updateUser(_prevState: any, formData: FormData) {
  const rawData = {
    name: formData.get("name"),
  };

  const validatedFields = UserSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Check your input field",
      enteredValues: rawData,
    };
  }

  const { name } = validatedFields.data;

  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const { error } = await supabase
    .from("users")
    .update({ name })
    .eq("id", claimsData?.claims?.sub)
    .select();

  if (error) return { error: error.message };

  revalidatePath("/app/setting");

  return { success: true, message: "User updated" };
}
