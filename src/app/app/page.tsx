import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import { createClient } from "@/lib/supabase/server";
import BarChart from "./component/simbar";

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
    <div className="flex-1 w-full flex flex-col gap-12 max-md:px-4">
      <div className="flex flex-col gap-2 items-start">
        <pre className="text-xs font-mono p-3 rounded overflow-auto w-full">
          <Suspense fallback={<Loading />}>
            <div className="flex justify-between border-light border-b pb-3">
              <dl>
                <dt className="text-body">Total Simulasi</dt>
                <dd className="text-2xl font-semibold text-heading">2000</dd>
              </dl>
              <div>
                <span className="inline-flex items-center bg-success-soft border border-success-subtle text-fg-success-strong text-xs font-medium px-1.5 py-0.5 rounded">
                  <svg
                    className="w-4 h-4 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    />
                  </svg>
                  Average rate 23.5%
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 py-3">
              <dl>
                <dt className="text-body">Simulasi Budget</dt>
                <dd className="text-lg font-semibold text-fg-success">1000</dd>
              </dl>
              <dl>
                <dt className="text-body">Simulasi Credit</dt>
                <dd className="text-lg font-semibold text-fg-danger">1000</dd>
              </dl>
            </div>
            <BarChart />
            {/* <UserDetails />  */}
          </Suspense>
        </pre>
      </div>
    </div>
  );
}
