import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";

async function SimulasiBudgetData() {
  const supabase = await createClient();
  const { data: simulasiBudget } = await supabase
    .from("simulasi_budget")
    .select();

  return <pre>{JSON.stringify(simulasiBudget, null, 2)}</pre>;
}

export default function SimulasiBudget() {
  return (
    <Suspense fallback={<div>Loading simulasi budget...</div>}>
      <SimulasiBudgetData />
    </Suspense>
  );
}
