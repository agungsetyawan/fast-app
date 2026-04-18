import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import { createClient } from "@/lib/supabase/server";

async function SimulasiBudgetData() {
  const supabase = await createClient();
  const { data: simulasiBudget } = await supabase
    .from("simulasi_budget")
    .select();

  return JSON.stringify(simulasiBudget, null, 2);
}

export default function Page() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12 max-md:px-4">
      <div className="flex flex-col gap-2 items-start">
        <pre className="text-xs font-mono p-3 rounded overflow-auto w-full">
          <Suspense fallback={<Loading />}>
            <SimulasiBudgetData />
          </Suspense>
        </pre>
      </div>
    </div>
  );
}
