import { CircleX } from "lucide-react";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import { createClient } from "@/lib/supabase/server";
import ReportTab from "./component/reporttab";
import { redirect } from "next/navigation";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  // return JSON.stringify(data.claims, null, 2);
  return data.claims;
}

async function SimulasiCreditData(createdBy: string | undefined,
  year: string = "2026",) {
  const supabase = await createClient();
  const { data: simulasiCredit, error } = await supabase
    .from("simulasi_kredit")
    .select()
    .eq("created_by", createdBy)

  if (error) {
    return (
      <div role="alert" className="alert alert-error w-full">
        <CircleX />
        <span>{error?.message || "Error!"}</span>
      </div>
    );
  }

  return simulasiCredit;
}

async function SimulasiBudgetData(createdBy: string | undefined,
  year: string = "2026",) {
  const supabase = await createClient();
  const { data: simulasiBudget, error } = await supabase
    .from("simulasi_budget")
    .select()
    .eq("created_by", createdBy)

  if (error) {
    return (
      <div role="alert" className="alert alert-error w-full">
        <CircleX />
        <span>{error?.message || "Error!"}</span>
      </div>
    );
  }

  return simulasiBudget;
}

export default async function Page() {

  const claims = await UserDetails();
  const createdBy = claims?.email;
  const year = new Date().getFullYear().toString();

  const budget = await SimulasiBudgetData(createdBy, year);
  const credit = await SimulasiCreditData(createdBy, year);

  return (
    <div className="flex-1 w-full flex flex-col gap-12 max-md:px-4">
      <div className="overflow-x-auto h-[calc(100vh-170px)] w-full">
        <Suspense fallback={<Loading />}>
          <ReportTab
            simulasiBudget={budget}
            simulasiCredit={credit}
          />
        </Suspense>
      </div>
    </div>
  );
}
