import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import { createClient } from "@/lib/supabase/server";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

export default function AppPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          <Suspense fallback={<Loading />}>
            <UserDetails />
          </Suspense>
        </pre>
      </div>
    </div>
  );
}
