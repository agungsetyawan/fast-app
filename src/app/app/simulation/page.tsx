"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
import { useAreaBranchGrouping } from "@/hooks/useArea";
import { useDealer } from "@/hooks/useDealer";
import { usePaket, usePaketTenor } from "@/hooks/usePaket";
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

export default function Page() {
  const [dealerId, setDealerId] = useState<string>("");
  const [vehicleBrandId, setVehicleBrandId] = useState<string>("");
  const [vehicleModelId, setVehicleModelId] = useState<string>("");
  const [vehicleTypeId, setVehicleTypeId] = useState<string>("");
  const [paketId, setPaketId] = useState<string>("");
  const [paketTenorId, setPaketTenorId] = useState<string>("");
  const [tipeAngsuran, setTipeAngsuran] = useState<string>("");
  const [jenisCustomer, setJenisCustomer] = useState<string>("");
  const [jenisPenggunaan, setJenisPenggunaan] = useState<string>("");
  const [vehicleInsuranceId, setVehicleInsuranceId] = useState<string>("");
  const [jenisAsuransi, setJenisAsuransi] = useState<string>("");
  const [prepaidOnloan, setPrepaidOnloan] = useState<string>("");

  const { data: user } = useUser();
  const branchId = user?.branch_id ?? "";

  const { data: dealer, isLoading: isLoadingDealer } = useDealer(branchId);
  const { data: vehicleBrand, isLoading: isLoadingVehicleBrand } =
    useVehicleBrand();
  const { data: vehicleModel, isLoading: isLoadingVehicleModel } =
    useVehicleModel(vehicleBrandId);
  const { data: vehicleType, isLoading: isLoadingVehicleType } =
    useVehicleType(vehicleModelId);
  const { data: paket, isLoading: isLoadingPaket } = usePaket(branchId);
  const { data: tenor, isLoading: isLoadingPaketTenor } =
    usePaketTenor(paketId);
  const { data: paramSetting, isLoading: isLoadingParamSetting } =
    useParamSetting();
  const { data: areaBranchGrouping } = useAreaBranchGrouping(branchId);
  const { data: vehicleInsurance, isLoading: isLoadingVehicleInsurance } =
    useVehicleInsurance(dealerId, vehicleModelId);

  const handleDealerChange = (value: string) => {
    setDealerId(value);
    setVehicleBrandId("");
    setVehicleModelId("");
    setVehicleTypeId("");
    setVehicleInsuranceId("");
  };

  const handleVehicleBrandChange = (value: string) => {
    setVehicleBrandId(value);
    setVehicleModelId("");
    setVehicleTypeId("");
  };

  const handleVehicleModelChange = (value: string) => {
    setVehicleModelId(value);
    setVehicleTypeId("");
    setVehicleInsuranceId("");
  };

  const selectedVehicleInsurance = vehicleInsurance?.find(
    (item) => item.id === vehicleInsuranceId,
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
              disabled={!dealerId}
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
              disabled={!branchId}
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
                  placeholder="100000000"
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
                  placeholder="30"
                  min={0}
                  max={100}
                  inputMode="decimal"
                />
                %
              </label>
              {/* <p className="validator-hint">DP wajib lebih dari 0</p> */}
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
              value={paketTenorId}
              placeholder="Select Tenor"
              loading={isLoadingPaketTenor}
              onChange={setPaketTenorId}
              options={tenor?.map((item) => ({
                id: item.tenor.toString(),
                label: `${item.tenor} Bulan`,
              }))}
            />

            <div className="divider">
              <div className="font-bold">Customer</div>
            </div>

            <label className="input w-full">
              <span className="label">Customer Name</span>
              <input type="text" name="customer_name" defaultValue={""} />
            </label>

            <SimulationSelect
              label="Jenis Customer"
              name="jenis_customer"
              value={jenisCustomer}
              placeholder="Select Jenis Customer"
              loading={isLoadingParamSetting}
              onChange={setJenisCustomer}
              options={paramSetting
                ?.filter((item) => item.param_name === "jenis_customer")
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
                TS
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

            <fieldset className="fieldset">
              <legend className="fieldset-legend">PA Passenger</legend>
              <label className="input w-full">
                <input
                  name="pa_passenger"
                  type="number"
                  className="input grow validator appearance-none"
                  required
                  disabled={!vehicleInsuranceId}
                  defaultValue={selectedVehicleInsurance?.pa_passenger}
                  min={1}
                  max={10}
                  inputMode="decimal"
                />
                pax
              </label>
              {/* <p className="validator-hint">PA Passenger wajib antara 1-10 orang</p> */}
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}
