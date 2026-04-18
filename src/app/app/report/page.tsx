import { CircleX } from "lucide-react";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import { createClient } from "@/lib/supabase/server";

async function SimulasiBudgetData() {
  const supabase = await createClient();
  const { data: simulasiBudget, error } = await supabase
    .from("simulasi_budget")
    .select();

  if (error) {
    return (
      <div role="alert" className="alert alert-error w-full">
        <CircleX />
        <span>{error?.message || "Error!"}</span>
      </div>
    );
  }

  return (
    <table className="table  table-pin-rows table-pin-cols">
      <thead>
        <tr>
          <th>customer_name</th>
          <td>paket_name</td>
          <td>area</td>
          <td>branch</td>
          <td>asuransi_kendaraan</td>
          <td>asuransi_jiwa</td>
          <td>tenor</td>
          <td>model_kendaraan</td>
          <td>jenis_kendaraan</td>
          <td>tipe_kendaraan</td>
          <td>dp</td>
          <td>tdp</td>
          <td>percent_dp</td>
          <td>nilai_asuransi_kendaraan</td>
          <td>nilai_asuransi_jiwa</td>
          <td>angsuran</td>
          <td>biaya_admin</td>
          <td>provisi</td>
          <td>dic</td>
          <td>tipe_perhitungan</td>
          <td>created_at</td>
        </tr>
      </thead>
      <tbody>
        {simulasiBudget.map((budget) => {
          return (
            <tr key={budget.id}>
              <th>{budget.customer_name}</th>
              <td>{budget.paket_name}</td>
              <td>{budget.area}</td>
              <td>{budget.branch}</td>
              <td>{budget.asuransi_kendaraan}</td>
              <td>{budget.asuransi_jiwa}</td>
              <td>{budget.tenor}</td>
              <td>{budget.model_kendaraan}</td>
              <td>{budget.jenis_kendaraan}</td>
              <td>{budget.tipe_kendaraan}</td>
              <td>{budget.dp}</td>
              <td>{budget.tdp}</td>
              <td>{budget.percent_dp}</td>
              <td>{budget.nilai_asuransi_kendaraan}</td>
              <td>{budget.nilai_asuransi_jiwa}</td>
              <td>{budget.angsuran}</td>
              <td>{budget.biaya_admin}</td>
              <td>{budget.provisi}</td>
              <td>{budget.dic}</td>
              <td>{budget.tipe_perhitungan}</td>
              <td>{budget.created_at}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function Page() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12 max-md:px-4">
      <div className="flex flex-col gap-2 items-start">
        <Suspense fallback={<Loading />}>
          <div className="overflow-x-auto h-[calc(100vh-170px)] w-full">
            <SimulasiBudgetData />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
