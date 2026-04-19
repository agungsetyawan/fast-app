import { CircleX } from "lucide-react";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import { createClient } from "@/lib/supabase/server";
import CardProfile from "./components/card-profile";

async function Profile() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const { data: userData, error } = await supabase
    .from("users_view")
    .select()
    .eq("id", claimsData?.claims?.sub)
    .single();

  if (error)
    return (
      <div role="alert" className="alert alert-error">
        <CircleX />
        <span>{error.message || "Error!"}</span>
      </div>
    );

  const getInitials = (str: string) => str.match(/\b(\w)/g)?.join("");

  const user = {
    id: userData.id,
    email: userData.email,
    name: userData.name,
    initialName: getInitials(userData.name || ""),
    avatar_url: userData.avatar_url,
    branch_name: userData.branch_name,
    device_id: userData.device_id,
  };

  return <CardProfile user={user} />;
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Profile />
    </Suspense>
  );
}
