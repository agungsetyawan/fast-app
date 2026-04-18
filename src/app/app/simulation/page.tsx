import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import { createClient } from "@/lib/supabase/server";

async function SimulasiBudgetData() {
  const supabase = await createClient();
  const { data: simulasiBudget } = await supabase
    .from("simulasi_budget")
    .select();

  return <pre>{JSON.stringify(simulasiBudget, null, 2)}</pre>;
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <SimulasiBudgetData />
    </Suspense>
  );
}
