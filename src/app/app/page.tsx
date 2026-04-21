import { MoveUp } from "lucide-react";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import BarChart from "./component/simbar";

export default function AppPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12 max-md:px-4">
      <div className="flex flex-col gap-2 items-start">
        <div className="p-3 w-full">
          <Suspense fallback={<Loading />}>
            <div className="flex justify-between border-base-content border-b pb-3">
              <dl>
                <dt className="text-base-content">Total Simulasi</dt>
                <dd className="text-2xl font-semibold text-base-content">
                  2000
                </dd>
              </dl>
              <div>
                <div className="badge badge-soft badge-success text-base-content">
                  <MoveUp size={14} />
                  Average rate 23.5%
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 py-3">
              <dl>
                <dt className="text-base-content">Simulasi Budget</dt>
                <dd className="text-lg font-semibold text-base-content">
                  1000
                </dd>
              </dl>
              <dl>
                <dt className="text-base-content">Simulasi Credit</dt>
                <dd className="text-lg font-semibold text-base-content">
                  1000
                </dd>
              </dl>
            </div>
            <BarChart />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
