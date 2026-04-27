import { Banknote, Calculator, MoveUp } from "lucide-react";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import { createClient } from "@/lib/supabase/server";
import SimulationBarChart from "./components/simulation-bar-chart";

const THIS_YEAR = new Date().getFullYear();
const MONTH = [
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

// biome-ignore lint/suspicious/noExplicitAny: <>
function mapToMonthlyData(data: any[] | null) {
  return Array.from({ length: 12 }, (_, i) => {
    const monthNumber = i + 1;
    const found = data?.find((item) => item.month === monthNumber);
    return found ? Number(found.total) : 0;
  });
}

async function getClaims() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) throw new Error("Unauthorized");
  return data.claims;
}

async function SimulasiUserViewData(createdBy: string, year: number = 2026) {
  const supabase = await createClient();
  const { data: simulasiUserViewData } = await supabase
    .from("apps_dashboard_metrics_average_user")
    .select()
    .eq("sales", createdBy)
    .eq("year", year);

  return simulasiUserViewData;
}

async function SimulasiBudgetViewData(createdBy: string, year: number = 2026) {
  const supabase = await createClient();
  const { data: simulasiBudgetView } = await supabase
    .from("apps_dashboard_metrics_simulation_budget_user")
    .select()
    .eq("sales", createdBy)
    .eq("year", year);

  return simulasiBudgetView;
}

async function SimulasiCreditViewData(createdBy: string, year: number = 2026) {
  const supabase = await createClient();
  const { data: simulasiCreditView } = await supabase
    .from("apps_dashboard_metrics_simulation_credit_user")
    .select()
    .eq("sales", createdBy)
    .eq("year", year);

  return simulasiCreditView;
}

export default async function AppPage() {
  const claims = await getClaims();
  const createdBy = claims?.email ?? "";

  const [simulasiBudgetView, simulasiCreditView, simulasiViewData] =
    await Promise.all([
      SimulasiBudgetViewData(createdBy, THIS_YEAR),
      SimulasiCreditViewData(createdBy, THIS_YEAR),
      SimulasiUserViewData(createdBy, THIS_YEAR),
    ]);

  const budgetData = mapToMonthlyData(simulasiBudgetView);
  const creditData = mapToMonthlyData(simulasiCreditView);
  const totalBudgetData = simulasiViewData?.[0]?.total_budget ?? 0;
  const totalCreditData = simulasiViewData?.[0]?.total_credit ?? 0;
  const totalAll = simulasiViewData?.[0]?.grand_total ?? 0;
  const averageRate = simulasiViewData?.[0]?.total_contribution_percent ?? 0;

  return (
    <div className="w-full flex flex-col gap-2 px-4">
      <Suspense fallback={<Loading />}>
        <div className="flex justify-between items-center">
          <div className="stats">
            <div className="stat">
              <div className="stat-title">Total Simulasi</div>
              <div className="stat-value">{totalAll.toLocaleString()}</div>
            </div>
          </div>
          <div className="badge badge-soft badge-success text-base-content">
            <MoveUp size={14} />
            Average rate {averageRate.toFixed(1)}%
          </div>
        </div>
        <div className="stats shadow w-full sm:w-1/2">
          <div className="stat">
            <div className="stat-figure text-success">
              <Banknote />
            </div>
            <div className="stat-title">Simulasi Budget</div>
            <div className="stat-value">{totalBudgetData.toLocaleString()}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <Calculator />
            </div>
            <div className="stat-title">Simulasi Credit</div>
            <div className="stat-value">{totalCreditData.toLocaleString()}</div>
          </div>
        </div>
        <SimulationBarChart
          budgetData={budgetData}
          creditData={creditData}
          categories={MONTH}
        />
      </Suspense>
    </div>
  );
}
