"use client";

import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useAreaBranchGrouping } from "@/hooks/useArea";
import { useDealer } from "@/hooks/useDealer";
import { usePaket, usePaketDp } from "@/hooks/usePaket";
import { useParamSetting } from "@/hooks/useParamSetting";
import { useUser } from "@/hooks/useUser";
import {
  useVehicleBrand,
  useVehicleModel,
  useVehicleType,
} from "@/hooks/useVehicle";
import { useVehicleInsurance } from "@/hooks/useVehicleInsurance";

type SelectOption = {
  id: string;
  label: string;
};

type SimulationSelectProps = {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  loading?: boolean;
  disabled?: boolean;
  options?: SelectOption[];
  onChange: (value: string) => void;
};

function SimulationSelect({
  label,
  name,
  value,
  placeholder,
  loading = false,
  disabled = false,
  options = [],
  onChange,
}: SimulationSelectProps) {
  return (
    <label className="select w-full">
      <span className="label">{label}</span>
      <select
        className="select"
        name={name}
        value={value}
        required
        disabled={disabled || loading}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          onChange(event.target.value)
        }
      >
        <option value="">{loading ? "Loading..." : placeholder}</option>
        {options.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}

const DEFAULT_PREDEFINE = {
  vehicleBrandId: "2ee50e7c-d428-47e2-82ce-975de8d3fe69",
  tipeAngsuran: "ADDM",
  tenor: "60",
  tipePembiayaan: "Konvensional",
  jenisPenggunaan: "Pribadi",
  jenisAsuransi: "Full Compre",
  prepaidOnloan: "Full Onloan",
  tjh: "10000000",
  paCoverage: "50000000",
  tipeDepresiasi: "Normal",
} as const;

export default function Page() {
  // Param Setting
  const { data: paramSetting, isLoading: isLoadingParamSetting } =
    useParamSetting();

  // User Sales
  const { data: user } = useUser();
  const branchId = user?.branch_id ?? "";

  // Dealer
  const { data: dealer, isLoading: isLoadingDealer } = useDealer(branchId);
  const [dealerId, setDealerId] = useState<string>("");
  const handleDealerChange = (value: string) => {
    setDealerId(value);
    setVehicleBrandId(DEFAULT_PREDEFINE.vehicleBrandId);
    setVehicleModelId("");
    setVehicleTypeId("");
    setVehicleInsuranceId("");
  };

  // Vehicle Brand
  const { data: vehicleBrand, isLoading: isLoadingVehicleBrand } =
    useVehicleBrand();
  const [vehicleBrandId, setVehicleBrandId] = useState<string>(
    DEFAULT_PREDEFINE.vehicleBrandId,
  );
  const handleVehicleBrandChange = (value: string) => {
    setVehicleBrandId(value);
    setVehicleModelId("");
    setVehicleTypeId("");
  };

  // Vehicle Model
  const { data: vehicleModel, isLoading: isLoadingVehicleModel } =
    useVehicleModel(vehicleBrandId);
  const [vehicleModelId, setVehicleModelId] = useState<string>("");
  const handleVehicleModelChange = (value: string) => {
    setVehicleModelId(value);
    setVehicleTypeId("");
    setVehicleInsuranceId("");
  };

  // Vehicle Type
  const { data: vehicleType, isLoading: isLoadingVehicleType } =
    useVehicleType(vehicleModelId);
  const [vehicleTypeId, setVehicleTypeId] = useState<string>("");

  // Paket
  const { data: paket, isLoading: isLoadingPaket } = usePaket(
    branchId,
    dealerId,
    vehicleModelId,
  );
  const [paketId, setPaketId] = useState<string>("");

  // Paket DP
  const { data: paketDp, isLoading: isLoadingPaketDp } = usePaketDp(paketId);
  const minDp = paketDp?.[0]?.percent_dp ?? 0;

  const [tipeAngsuran, setTipeAngsuran] = useState<string>(
    DEFAULT_PREDEFINE.tipeAngsuran,
  );
  const [tenor, setTenor] = useState<string>(DEFAULT_PREDEFINE.tenor);
  const [tipePembiayaan, setTipePembiayaan] = useState<string>(
    DEFAULT_PREDEFINE.tipePembiayaan,
  );
  const [jenisPenggunaan, setJenisPenggunaan] = useState<string>(
    DEFAULT_PREDEFINE.jenisPenggunaan,
  );

  const { data: areaBranchGrouping } = useAreaBranchGrouping(branchId);

  const { data: vehicleInsurance, isLoading: isLoadingVehicleInsurance } =
    useVehicleInsurance(dealerId, vehicleModelId);
  const [vehicleInsuranceId, setVehicleInsuranceId] = useState<string>("");
  const selectedVehicleInsurance = vehicleInsurance?.find(
    (item) => item.id === vehicleInsuranceId,
  );
  const [jenisAsuransi, setJenisAsuransi] = useState<string>(
    DEFAULT_PREDEFINE.jenisAsuransi,
  );
  const [prepaidOnloan, setPrepaidOnloan] = useState<string>(
    DEFAULT_PREDEFINE.prepaidOnloan,
  );
  const [tipeDepresiasi, setTipeDepresiasi] = useState<string>(
    DEFAULT_PREDEFINE.tipeDepresiasi,
  );
  const [paPassenger, setPaPassenger] = useState<string>("");
  useEffect(() => {
    setPaPassenger(selectedVehicleInsurance?.pa_passenger?.toString() ?? "");
  }, [selectedVehicleInsurance]);
  const [tjh, setTjh] = useState<string>(DEFAULT_PREDEFINE.tjh);
  const [paCoverage, setPaCoverage] = useState<string>(
    DEFAULT_PREDEFINE.paCoverage,
  );

  return (
    <>
      <ul className="steps w-full sticky top-16 z-50 bg-base-200 shadow">
        <li className="step step-primary">Input Data</li>
        <li className="step">Kalkulasi</li>
      </ul>

      <div className="w-full flex flex-col gap-2 p-4">
        <div className="flex flex-col gap-2 items-start">
          <form className="w-full flex flex-col gap-2">
            <div className="divider">
              <div className="font-bold">General</div>
            </div>

            <input type="hidden" name="branchId" value={branchId} />
            <label className="input w-full">
              <span className="label">Branch</span>
              <input type="text" value={user?.branch_name || ""} readOnly />
            </label>

            <SimulationSelect
              label="Dealer"
              name="dealerId"
              value={dealerId}
              placeholder="Select Dealer"
              loading={isLoadingDealer}
              disabled={!branchId}
              onChange={handleDealerChange}
              options={dealer?.map((item) => ({
                id: item.id,
                label: `${item.name} - ${item.tipe_dealer}`,
              }))}
            />

            <SimulationSelect
              label="Brand"
              name="vehicleBrandId"
              value={vehicleBrandId}
              placeholder="Select Brand"
              loading={isLoadingVehicleBrand}
              onChange={handleVehicleBrandChange}
              options={vehicleBrand?.map((item) => ({
                id: item.id,
                label: item.name,
              }))}
            />

            <SimulationSelect
              label="Model"
              name="vehicleModelId"
              value={vehicleModelId}
              placeholder="Select Model"
              loading={isLoadingVehicleModel}
              disabled={!vehicleBrandId}
              onChange={handleVehicleModelChange}
              options={vehicleModel?.map((item) => ({
                id: item.id,
                label: `${item.name} - ${item.category}`,
              }))}
            />

            <SimulationSelect
              label="Tipe Kendaraan"
              name="vehicleTypeId"
              value={vehicleTypeId}
              placeholder="Select Tipe Kendaraan"
              loading={isLoadingVehicleType}
              disabled={!vehicleModelId}
              onChange={setVehicleTypeId}
              options={vehicleType?.map((item) => ({
                id: item.id,
                label: item.name,
              }))}
            />

            <SimulationSelect
              label="Paket"
              name="paketId"
              value={paketId}
              placeholder="Select Paket"
              loading={isLoadingPaket}
              disabled={!branchId || !dealerId || !vehicleModelId}
              onChange={setPaketId}
              options={paket?.map((item) => ({
                id: item.id,
                label: item.name,
              }))}
            />

            <fieldset className="fieldset">
              <legend className="fieldset-legend">OTR</legend>
              <label className="input w-full">
                Rp
                <input
                  name="otr"
                  type="number"
                  className="input grow validator appearance-none"
                  required
                  placeholder="OTR Price"
                  min={1}
                  inputMode="numeric"
                />
              </label>
              {/* <p className="validator-hint">OTR wajib lebih dari 0</p> */}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">DP</legend>
              <label className="input w-full">
                <input
                  name="dp"
                  type="number"
                  className="input grow validator appearance-none"
                  required
                  placeholder={`DP Percent (${minDp}%)`}
                  min={minDp}
                  max={100}
                  inputMode="decimal"
                  disabled={!paketId}
                />
                %
              </label>
              {!isLoadingPaketDp && paketId && <p>Minimum DP {minDp} %</p>}
            </fieldset>

            <SimulationSelect
              label="Tipe Angsuran"
              name="tipe_angsuran"
              value={tipeAngsuran}
              placeholder="Select Tipe Angsuran"
              loading={isLoadingParamSetting}
              onChange={setTipeAngsuran}
              options={paramSetting
                ?.filter((item) => item.param_name === "tipe_angsuran")
                .map((item) => ({
                  id: item.param_value,
                  label: item.param_value,
                }))}
            />

            <SimulationSelect
              label="Tenor"
              name="tenor"
              value={tenor}
              placeholder="Select Tenor"
              loading={isLoadingParamSetting}
              onChange={setTenor}
              options={paramSetting
                ?.filter((item) => item.param_name === "tenor")
                ?.sort((a, b) => Number(a.param_value) - Number(b.param_value))
                .map((item) => ({
                  id: item.param_value,
                  label: `${item.param_value} Bulan`,
                }))}
            />

            <SimulationSelect
              label="Tipe Pembiayaan"
              name="tipe_pembiayaan"
              value={tipePembiayaan}
              placeholder="Select Tipe Pembiayaan"
              loading={isLoadingParamSetting}
              onChange={setTipePembiayaan}
              options={paramSetting
                ?.filter((item) => item.param_name === "tipe_pembiayaan")
                .map((item) => ({
                  id: item.param_value,
                  label: item.param_value,
                }))}
            />

            <SimulationSelect
              label="Jenis Penggunaan"
              name="jenis_penggunaan"
              value={jenisPenggunaan}
              placeholder="Select Jenis Penggunaan"
              loading={isLoadingParamSetting}
              onChange={setJenisPenggunaan}
              options={paramSetting
                ?.filter((item) => item.param_name === "jenis_penggunaan")
                .map((item) => ({
                  id: item.param_value,
                  label: item.param_value,
                }))}
            />

            <div className="divider">
              <div className="font-bold">Asuransi Kendaraan</div>
            </div>

            <input type="hidden" name="branchId" value={branchId} />
            <label className="input w-full">
              <span className="label">Area</span>
              <input
                type="text"
                value={areaBranchGrouping?.area_asuransi_kendaraan_name || ""}
                readOnly
              />
            </label>

            <SimulationSelect
              label="Asuransi"
              name="asuransi_kendaraan"
              value={vehicleInsuranceId}
              placeholder="Select Vehicle Insurance"
              loading={isLoadingVehicleInsurance}
              disabled={!dealerId || !vehicleModelId}
              onChange={setVehicleInsuranceId}
              options={vehicleInsurance?.map((item) => ({
                id: item.id,
                label: `${item.name} - ${item.group}`,
              }))}
            />

            <SimulationSelect
              label="Jenis Asuransi"
              name="jenis_asuransi"
              value={jenisAsuransi}
              placeholder="Select Jenis Asuransi"
              loading={isLoadingParamSetting}
              onChange={setJenisAsuransi}
              options={paramSetting
                ?.filter((item) => item.param_name === "jenis_asuransi")
                .map((item) => ({
                  id: item.param_value,
                  label: item.param_value,
                }))}
            />

            <SimulationSelect
              label="Prepaid / Onloan"
              name="prepaid_onloan"
              value={prepaidOnloan}
              placeholder="Select Prepaid / Onloan"
              loading={isLoadingParamSetting}
              onChange={setPrepaidOnloan}
              options={paramSetting
                ?.filter((item) => item.param_name === "prepaid_onloan")
                .map((item) => ({
                  id: item.param_value,
                  label: item.param_value,
                }))}
            />

            <SimulationSelect
              label="Tipe Depresiasi"
              name="tipe_depresiasi"
              value={tipeDepresiasi}
              placeholder="Select Tipe Depresiasi"
              loading={isLoadingParamSetting}
              onChange={setTipeDepresiasi}
              options={paramSetting
                ?.filter((item) => item.param_name === "tipe_depresiasi")
                .map((item) => ({
                  id: item.param_value,
                  label: item.param_value,
                }))}
            />

            <details className="collapse collapse-arrow bg-base-100 border border-base-300">
              <summary className="collapse-title font-semibold text-sm">
                Extended Coverage
              </summary>
              <div className="collapse-content text-sm flex flex-col gap-2">
                <div className="flex flex-row flex-wrap gap-2">
                  <label className="label">
                    <input
                      key={selectedVehicleInsurance?.id}
                      type="checkbox"
                      name="is_bundlerfe"
                      disabled={!vehicleInsuranceId}
                      defaultChecked={selectedVehicleInsurance?.is_bundlerfe}
                      className="toggle"
                    />
                    Bundle RFE
                  </label>

                  <label className="label">
                    <input
                      key={selectedVehicleInsurance?.id}
                      type="checkbox"
                      name="is_ts"
                      disabled={!vehicleInsuranceId}
                      defaultChecked={selectedVehicleInsurance?.is_ts}
                      className="toggle"
                    />
                    TS{" "}
                  </label>

                  <label className="label">
                    <input
                      key={selectedVehicleInsurance?.id}
                      type="checkbox"
                      name="is_padriver"
                      disabled={!vehicleInsuranceId}
                      defaultChecked={selectedVehicleInsurance?.is_padriver}
                      className="toggle"
                    />
                    PA Driver
                  </label>

                  <label className="label">
                    <input
                      key={selectedVehicleInsurance?.id}
                      type="checkbox"
                      name="is_pai"
                      disabled={!vehicleInsuranceId}
                      defaultChecked={selectedVehicleInsurance?.is_pai}
                      className="toggle"
                    />
                    PAI
                  </label>
                </div>

                <SimulationSelect
                  key={selectedVehicleInsurance?.id}
                  label="PA Passenger"
                  name="pa_passenger"
                  value={paPassenger}
                  placeholder="Select PA Passenger"
                  loading={isLoadingParamSetting}
                  disabled={!vehicleInsuranceId}
                  onChange={setPaPassenger}
                  options={paramSetting
                    ?.filter((item) => item.param_name === "param_pa_passenger")
                    ?.sort(
                      (a, b) => Number(a.param_value) - Number(b.param_value),
                    )
                    .map((item) => ({
                      id: item.param_value,
                      label: `${item.param_value} pax`,
                    }))}
                />

                <SimulationSelect
                  label="TJH"
                  name="tjh"
                  value={tjh}
                  placeholder="Select TJH"
                  loading={isLoadingParamSetting}
                  disabled={!vehicleInsuranceId}
                  onChange={setTjh}
                  options={paramSetting
                    ?.filter((item) => item.param_name === "param_tjh")
                    ?.sort(
                      (a, b) => Number(a.param_value) - Number(b.param_value),
                    )
                    .map((item) => ({
                      id: item.param_value,
                      label: item.param_value,
                    }))}
                />

                <SimulationSelect
                  label="PA Coverage"
                  name="pa_coverage"
                  value={paCoverage}
                  placeholder="Select PA Coverage"
                  loading={isLoadingParamSetting}
                  disabled={!vehicleInsuranceId}
                  onChange={setPaCoverage}
                  options={paramSetting
                    ?.filter((item) => item.param_name === "param_pa_coverage")
                    ?.sort(
                      (a, b) => Number(a.param_value) - Number(b.param_value),
                    )
                    .map((item) => ({
                      id: item.param_value,
                      label: item.param_value,
                    }))}
                />
              </div>
            </details>
          </form>
        </div>
      </div>
    </>
  );
}
