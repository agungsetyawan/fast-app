import { Banknote, Calculator, MoveUp } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import { createClient } from "@/lib/supabase/server";
import BarChart from "./component/simbar";

function mapToMonthlyData(data: any[] | null) {
  return Array.from({ length: 12 }, (_, i) => {
    const monthNumber = i + 1;
    const found = data?.find((item) => item.month === monthNumber);
    return found ? Number(found.total) : 0;
  });
}

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  // return JSON.stringify(data.claims, null, 2);
  return data.claims;
}

async function SimulasiUserViewData(
  createdBy: string | undefined,
  year: string = "2026",
) {
  const supabase = await createClient();
  const { data: simulasiUserViewData } = await supabase
    .from("apps_dashboard_metrics_average_user")
    .select()
    .eq("sales", createdBy)
    .eq("year", year);

  // return JSON.stringify(simulasiBudgetView, null, 2);
  return simulasiUserViewData;
}

async function SimulasiBudgetViewData(
  createdBy: string | undefined,
  year: string = "2026",
) {
  const supabase = await createClient();
  const { data: simulasiBudgetView } = await supabase
    .from("apps_dashboard_metrics_simulation_budget_user")
    .select()
    .eq("sales", createdBy)
    .eq("year", year);

  // return JSON.stringify(simulasiBudgetView, null, 2);
  return simulasiBudgetView;
}

async function SimulasiCreditViewData(
  createdBy: string | undefined,
  year: string = "2026",
) {
  const supabase = await createClient();
  const { data: simulasiCreditView } = await supabase
    .from("apps_dashboard_metrics_simulation_credit_user")
    .select()
    .eq("sales", createdBy)
    .eq("year", year);

  // `return JSON.stringify(simulasiCreditView, null, 2);`
  return simulasiCreditView;
}

export default async function AppPage() {
  const claims = await UserDetails();
  const createdBy = claims?.email;
  const year = new Date().getFullYear().toString();
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [simulasiBudgetView, simulasiCreditView, simulasiViewData] =
    await Promise.all([
      SimulasiBudgetViewData(createdBy, year),
      SimulasiCreditViewData(createdBy, year),
      SimulasiUserViewData(createdBy, year),
    ]);

  const budgetData = mapToMonthlyData(simulasiBudgetView);
  const creditData = mapToMonthlyData(simulasiCreditView);
  const totalBudgetData = simulasiViewData?.[0]?.total_budget ?? 0;
  const totalCreditData = simulasiViewData?.[0]?.total_credit ?? 0;
  const totalAll = simulasiViewData?.[0]?.grand_total ?? 0;
  const averageRate = simulasiViewData?.[0]?.total_contribution_percent ?? 0;

  return (
    <div className="flex-1 w-full flex flex-col gap-12 max-md:px-4">
      <div className="flex flex-col gap-2 items-start">
        <div className="p-3 w-full">
          <Suspense fallback={<Loading />}>
            <div className="flex justify-between items-center">
              <div className="stats">
                <div className="stat">
                  <div className="stat-title">Total Simulasi</div>
                  <div className="stat-value">{totalAll.toLocaleString()}</div>
                </div>
              </div>
              <div>
                <div className="badge badge-soft badge-success text-base-content">
                  <MoveUp size={14} />
                  Average rate {averageRate.toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-figure text-success">
                  <Banknote />
                </div>
                <div className="stat-title">Simulasi Budget</div>
                <div className="stat-value">
                  {totalBudgetData.toLocaleString()}
                </div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <Calculator />
                </div>
                <div className="stat-title">Simulasi Credit</div>
                <div className="stat-value">
                  {totalCreditData.toLocaleString()}
                </div>
              </div>
            </div>
            <BarChart
              budgetData={budgetData}
              creditData={creditData}
              categories={month}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
