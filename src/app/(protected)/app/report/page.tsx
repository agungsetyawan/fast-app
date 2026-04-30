import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import ReportTab from "@/features/report/components/report-tab";
import { createClient } from "@/lib/supabase/server";

async function getClaims() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) throw new Error("Unauthorized");
  return data.claims;
}

async function SimulasiCreditData(createdBy: string) {
  const supabase = await createClient();
  const { data: simulasiCredit, error } = await supabase
    .from("simulasi_kredit")
    .select()
    .eq("created_by", createdBy);

  if (error) throw new Error("Error");

  return simulasiCredit;
}

async function SimulasiBudgetData(createdBy: string) {
  const supabase = await createClient();
  const { data: simulasiBudget, error } = await supabase
    .from("simulasi_budget")
    .select()
    .eq("created_by", createdBy);

  if (error) throw new Error("Error");

  return simulasiBudget;
}

export default async function Page() {
  const claims = await getClaims();
  const createdBy = claims?.email ?? "";

  const budget = await SimulasiBudgetData(createdBy);
  const credit = await SimulasiCreditData(createdBy);

  return (
    <div className="w-full flex flex-col gap-2 px-4">
      <Suspense fallback={<Loading />}>
        <ReportTab simulasiBudget={budget} simulasiCredit={credit} />
      </Suspense>
    </div>
  );
}
