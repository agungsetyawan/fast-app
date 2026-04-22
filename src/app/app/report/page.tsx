import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import { createClient } from "@/lib/supabase/server";
import ReportTab from "./components/report-tab";

async function getClaims() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) throw new Error("Unauthorized");
  return data.claims;
}

async function SimulasiCreditData(createdBy: string | undefined) {
  const supabase = await createClient();
  const { data: simulasiCredit, error } = await supabase
    .from("simulasi_kredit")
    .select()
    .eq("created_by", createdBy);

  if (error) throw new Error("Error");

  return simulasiCredit;
}

async function SimulasiBudgetData(createdBy: string | undefined) {
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
  const createdBy = claims?.email;

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
