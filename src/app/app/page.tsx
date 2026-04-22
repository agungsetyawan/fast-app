import { Banknote, Calculator, MoveUp } from "lucide-react";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import BarChart from "./component/simbar";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  // return JSON.stringify(data.claims, null, 2);
  return data.claims;
}

const claims = await UserDetails();
const CreatedBy = claims?.email;

async function SimulasiBudgetViewData() {
  const supabase = await createClient();
  const { data: simulasiBudgetView } = await supabase
    .from("apps_dashboard_metrics_simulation_budget_user")
    .select()
    .eq("sales", CreatedBy)
    .eq("year", "2026");

  // return JSON.stringify(simulasiBudgetView, null, 2);
  return simulasiBudgetView;
}

async function SimulasiCreditViewData() {
  const supabase = await createClient();
  const { data: simulasiCreditView } = await supabase
    .from("apps_dashboard_metrics_simulation_credit_user")
    .select()
    .eq("sales", CreatedBy)
    .eq("year", "2026");

  // `return JSON.stringify(simulasiCreditView, null, 2);`
  return simulasiCreditView;
}

export default function AppPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12 max-md:px-4">
      <div className="flex flex-col gap-2 items-start">
        <div className="p-3 w-full">
          <Suspense fallback={<Loading />}>
            <div className="flex justify-between items-center">
              <div className="stats">
                <div className="stat">
                  <div className="stat-title">Total Simulasi</div>
                  <div className="stat-value">5,400</div>
                </div>
              </div>
              <div>
                <div className="badge badge-soft badge-success text-base-content">
                  <MoveUp size={14} />
                  Average rate 23.5%
                </div>
              </div>
            </div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-figure text-success">
                  <Banknote />
                </div>
                <div className="stat-title">Simulasi Budget</div>
                <div className="stat-value">4,200</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <Calculator />
                </div>
                <div className="stat-title">Simulasi Credit</div>
                <div className="stat-value">1,200</div>
              </div>
            </div>
            <BarChart />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
