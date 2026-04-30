"use client";

import {
  type ChangeEvent,
  useActionState,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAreaBranchGrouping } from "@/hooks/useArea";
import { useDealer } from "@/hooks/useDealer";
import { useOtherFee } from "@/hooks/useFee";
import { useLifeInsurance } from "@/hooks/useLifeInsurance";
import { usePaket, usePaketDetail, usePaketDp } from "@/hooks/usePaket";
import { useParamSetting } from "@/hooks/useParamSetting";
import { useUser } from "@/hooks/useUser";
import {
  useVehicleBrand,
  useVehicleModel,
  useVehicleType,
} from "@/hooks/useVehicle";
import { useVehicleInsurance } from "@/hooks/useVehicleInsurance";
import { parseSimulationForm } from "../lib/parse-simulation-form";

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
  lifeInsurancePrepaidOnloan: "Onloan",
} as const;

const PROVISI_DIC_OPTIONS: SelectOption[] = [
  {
    id: "provisi",
    label: "Provisi",
  },
  {
    id: "dic",
    label: "DIC",
  },
];

export function SimulationForm() {
  // Param Setting
  const { data: paramSetting, isLoading: isLoadingParamSetting } =
    useParamSetting();
  const paramOptions = useMemo(() => {
    const buildOptions = (
      paramName: string,
      formatLabel: (value: string) => string = (value) => value,
      sortNumeric = false,
    ): SelectOption[] => {
      const items = paramSetting?.filter(
        (item) => item.param_name === paramName,
      );
      if (!items) return [];

      if (sortNumeric) {
        items.sort((a, b) => Number(a.param_value) - Number(b.param_value));
      }

      return items.map((item) => ({
        id: item.param_value,
        label: formatLabel(item.param_value),
      }));
    };

    return {
      tipeAngsuran: buildOptions("tipe_angsuran"),
      tenor: buildOptions("tenor", (value) => `${value} Bulan`, true),
      tipePembiayaan: buildOptions("tipe_pembiayaan"),
      jenisPenggunaan: buildOptions("jenis_penggunaan"),
      jenisAsuransi: buildOptions("jenis_asuransi"),
      prepaidOnloan: buildOptions("prepaid_onloan"),
      tipeDepresiasi: buildOptions("tipe_depresiasi"),
      paPassenger: buildOptions(
        "param_pa_passenger",
        (value) => `${value} pax`,
        true,
      ),
      tjh: buildOptions("param_tjh", undefined, true),
      paCoverage: buildOptions("param_pa_coverage", undefined, true),
      lifeInsurancePrepaidOnloan: buildOptions(
        "param_life_insurance_prepaid_onloan",
      ),
    };
  }, [paramSetting]);

  // User Sales
  const { data: user } = useUser();
  const branchId = user?.branch_id ?? "";

  // Dealer
  const { data: dealer, isLoading: isLoadingDealer } = useDealer(branchId);
  const [dealerId, setDealerId] = useState<string>("");
  const selectedDealer = useMemo(
    () => dealer?.find((item) => item.id === dealerId),
    [dealer, dealerId],
  );

  // Vehicle Brand
  const { data: vehicleBrand, isLoading: isLoadingVehicleBrand } =
    useVehicleBrand();
  const [vehicleBrandId, setVehicleBrandId] = useState<string>(
    DEFAULT_PREDEFINE.vehicleBrandId,
  );

  // Vehicle Model
  const { data: vehicleModel, isLoading: isLoadingVehicleModel } =
    useVehicleModel(vehicleBrandId);
  const [vehicleModelId, setVehicleModelId] = useState<string>("");

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
  const selectedPaket = useMemo(
    () => paket?.find((item) => item.id === paketId),
    [paket, paketId],
  );

  // Paket DP
  const { data: paketDp, isLoading: isLoadingPaketDp } = usePaketDp(paketId);
  const minDp = paketDp?.[0]?.percent_dp ?? 0;
  const [dp, setDp] = useState<string>("");
  useEffect(() => {
    setDp(minDp.toString());
  }, [minDp]);

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

  // Paket Detail
  const { data: paketDetail } = usePaketDetail(paketId, branchId);
  const targetDpPercent = useMemo(
    () =>
      paketDp
        ?.filter((val) => val.percent_dp <= Number(dp || 0))
        .reduce((max, curr) => Math.max(max, curr.percent_dp), 0),
    [paketDp, dp],
  );
  const selectedPaketDetail = useMemo(() => {
    const detailByDp = paketDetail?.find(
      (item) => item.percent_dp === targetDpPercent,
    );
    if (!detailByDp) return undefined;

    const type = detailByDp.types.find(
      (item) => item.tipe_angsuran === tipeAngsuran,
    );
    const detail = type?.details?.find((item) => item.tenor === Number(tenor));

    return {
      percent_dp: detailByDp.percent_dp,
      percent_dic: detailByDp.percent_dic,
      percent_provisi: detailByDp.percent_provisi,
      rate: detail?.rate || 0,
    };
  }, [paketDetail, targetDpPercent, tipeAngsuran, tenor]);
  const [rate, setRate] = useState<string>("");
  const [provisi, setProvisi] = useState<string>("");
  const [dic, setDic] = useState<string>("");
  useEffect(() => {
    setRate(selectedPaketDetail?.rate?.toString() ?? "0");
    setProvisi(selectedPaketDetail?.percent_provisi?.toString() ?? "0");
    setDic(selectedPaketDetail?.percent_dic?.toString() ?? "0");
  }, [
    selectedPaketDetail?.rate,
    selectedPaketDetail?.percent_provisi,
    selectedPaketDetail?.percent_dic,
  ]);

  // Vehicle Insurance
  const { data: areaBranchGrouping } = useAreaBranchGrouping(branchId);

  const { data: vehicleInsurance, isLoading: isLoadingVehicleInsurance } =
    useVehicleInsurance(dealerId, vehicleModelId);
  const [vehicleInsuranceId, setVehicleInsuranceId] = useState<string>("");
  const selectedVehicleInsurance = useMemo(
    () => vehicleInsurance?.find((item) => item.id === vehicleInsuranceId),
    [vehicleInsurance, vehicleInsuranceId],
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

  // Life Insurance
  const { data: lifeInsurance, isLoading: isLoadingLifeInsurance } =
    useLifeInsurance(paketId);
  const [lifeInsuranceId, setLifeInsuranceId] = useState<string>("");
  const selectedLifeInsurance = useMemo(
    () => lifeInsurance?.find((item) => item.id === lifeInsuranceId),
    [lifeInsurance, lifeInsuranceId],
  );
  const [lifeInsurancePrepaidOnloan, setLifeInsurancePrepaidOnloan] =
    useState<string>(DEFAULT_PREDEFINE.lifeInsurancePrepaidOnloan);
  const [jumlahTertanggung, setJumlahTertanggung] = useState<string>("");
  useEffect(() => {
    setLifeInsurancePrepaidOnloan(selectedLifeInsurance?.prepaid_onloan ?? "");
    setJumlahTertanggung(
      selectedLifeInsurance?.jumlah_tertanggung?.toString() ?? "",
    );
  }, [selectedLifeInsurance]);

  // Fee
  const defaultBiayaPolis = paramSetting?.find(
    (item) => item.param_name === "param_default_biaya_polis",
  )?.param_value;
  const defaultBiayaAdmin = paramSetting?.find(
    (item) => item.param_name === "param_default_biaya_admin",
  )?.param_value;
  const [policyFee, setPolicyFee] = useState<string>("");
  const [adminFee, setAdminFee] = useState<string>("");
  useEffect(() => {
    setPolicyFee(defaultBiayaPolis ?? "");
  }, [defaultBiayaPolis]);
  useEffect(() => {
    setAdminFee(defaultBiayaAdmin ?? "");
  }, [defaultBiayaAdmin]);

  const [provisiDic, setProvisiDic] = useState<string>("provisi");

  const { data: otherFee, isLoading: isLoadingOtherFee } = useOtherFee(
    selectedDealer?.branch_dealer_mapping_id || "",
  );
  const [otherFeeValue, setOtherFeeValue] = useState<string>("");
  useEffect(() => {
    setOtherFeeValue(otherFee?.min_value?.toString() ?? "0");
  }, [otherFee]);

  const resetLifeInsurance = () => {
    setLifeInsuranceId("");
    setLifeInsurancePrepaidOnloan(DEFAULT_PREDEFINE.lifeInsurancePrepaidOnloan);
    setJumlahTertanggung("");
  };
  const resetPaket = () => {
    setPaketId("");
    setDp("");
    setRate("");
    setProvisi("");
    setDic("");
    resetLifeInsurance();
  };
  const resetVehicleInsurance = () => {
    setVehicleInsuranceId("");
    setPaPassenger("");
  };
  const handleDealerChange = (value: string) => {
    setDealerId(value);
    setVehicleBrandId(DEFAULT_PREDEFINE.vehicleBrandId);
    setVehicleModelId("");
    setVehicleTypeId("");
    resetPaket();
    resetVehicleInsurance();
  };
  const handleVehicleBrandChange = (value: string) => {
    setVehicleBrandId(value);
    setVehicleModelId("");
    setVehicleTypeId("");
    resetPaket();
    resetVehicleInsurance();
  };
  const handleVehicleModelChange = (value: string) => {
    setVehicleModelId(value);
    setVehicleTypeId("");
    resetPaket();
    resetVehicleInsurance();
  };
  const handlePaketChange = (value: string) => {
    setPaketId(value);
    setDp("");
    setRate("");
    setProvisi("");
    setDic("");
    resetLifeInsurance();
  };

  type ActionState = {
    error: string | null;
    success: boolean;
    email: string;
  };

  const initialState: ActionState = {
    error: null,
    success: false,
    email: "",
  };
  // Form State
  const calculate = async (
    prevState: ActionState,
    formData: FormData,
  ): Promise<ActionState> => {
    const values = parseSimulationForm(formData);

    console.log(values);
    return prevState;
  };
  const [_state, formAction, isCalculating] = useActionState(
    calculate,
    initialState,
  );

  return (
    <>
      <ul className="steps w-full sticky top-16 z-50 bg-base-200 shadow">
        <li className="step step-primary">Input Data</li>
        <li className="step">Kalkulasi</li>
      </ul>

      <div className="w-full flex flex-col gap-2 p-4">
        <div className="flex flex-col gap-2 items-start">
          <form action={formAction} className="w-full flex flex-col gap-2">
            <div className="divider">
              <div className="font-bold">General</div>
            </div>

            <label className="input w-full">
              <span className="label">Branch</span>
              <input
                name="branch_name"
                type="text"
                value={user?.branch_name || ""}
                readOnly
              />
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
              onChange={handlePaketChange}
              options={paket?.map((item) => ({
                id: item.id,
                label: item.name,
              }))}
            />
            {paketId && (
              <p className="text-xs text-warning-content">
                Tipe Kalkulasi {selectedPaket?.paket_type}
              </p>
            )}

            <div className="flex gap-2">
              <fieldset className="fieldset flex-1 md:flex-1">
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

              <fieldset className="fieldset md:flex-1">
                <legend className="fieldset-legend">DP</legend>
                <label className="input w-full">
                  <input
                    name="dp"
                    type="number"
                    className="input grow validator appearance-none"
                    required
                    placeholder={`DP ${minDp}%`}
                    min={minDp}
                    max={100}
                    inputMode="decimal"
                    value={dp}
                    onChange={(e) => setDp(e.target.value)}
                    disabled={!paketId}
                  />
                  %
                </label>
                {!isLoadingPaketDp && paketId && (
                  <p className="text-xs text-warning-content">
                    Minimum {minDp} %
                  </p>
                )}
              </fieldset>
            </div>

            <SimulationSelect
              label="Tipe Angsuran"
              name="tipe_angsuran"
              value={tipeAngsuran}
              placeholder="Select Tipe Angsuran"
              loading={isLoadingParamSetting}
              onChange={setTipeAngsuran}
              options={paramOptions.tipeAngsuran}
            />

            <SimulationSelect
              label="Tenor"
              name="tenor"
              value={tenor}
              placeholder="Select Tenor"
              loading={isLoadingParamSetting}
              onChange={setTenor}
              options={paramOptions.tenor}
            />

            <SimulationSelect
              label="Tipe Pembiayaan"
              name="tipe_pembiayaan"
              value={tipePembiayaan}
              placeholder="Select Tipe Pembiayaan"
              loading={isLoadingParamSetting}
              onChange={setTipePembiayaan}
              options={paramOptions.tipePembiayaan}
            />

            <SimulationSelect
              label="Jenis Penggunaan"
              name="jenis_penggunaan"
              value={jenisPenggunaan}
              placeholder="Select Jenis Penggunaan"
              loading={isLoadingParamSetting}
              onChange={setJenisPenggunaan}
              options={paramOptions.jenisPenggunaan}
            />

            <div className="divider">
              <div className="font-bold">Asuransi Kendaraan</div>
            </div>

            <label className="input w-full">
              <span className="label">Area</span>
              <input
                name="area_asuransi_kendaraan_name"
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
              options={paramOptions.jenisAsuransi}
            />

            <SimulationSelect
              label="Prepaid / Onloan"
              name="prepaid_onloan"
              value={prepaidOnloan}
              placeholder="Select Prepaid / Onloan"
              loading={isLoadingParamSetting}
              onChange={setPrepaidOnloan}
              options={paramOptions.prepaidOnloan}
            />

            <SimulationSelect
              label="Tipe Depresiasi"
              name="tipe_depresiasi"
              value={tipeDepresiasi}
              placeholder="Select Tipe Depresiasi"
              loading={isLoadingParamSetting}
              onChange={setTipeDepresiasi}
              options={paramOptions.tipeDepresiasi}
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

                <SimulationSelect
                  key={selectedVehicleInsurance?.id}
                  label="PA Passenger"
                  name="pa_passenger"
                  value={paPassenger}
                  placeholder="Select PA Passenger"
                  loading={isLoadingParamSetting}
                  disabled={!vehicleInsuranceId}
                  onChange={setPaPassenger}
                  options={paramOptions.paPassenger}
                />

                <SimulationSelect
                  label="TJH"
                  name="tjh"
                  value={tjh}
                  placeholder="Select TJH"
                  loading={isLoadingParamSetting}
                  disabled={!vehicleInsuranceId}
                  onChange={setTjh}
                  options={paramOptions.tjh}
                />

                <SimulationSelect
                  label="PA Coverage"
                  name="pa_coverage"
                  value={paCoverage}
                  placeholder="Select PA Coverage"
                  loading={isLoadingParamSetting}
                  disabled={!vehicleInsuranceId}
                  onChange={setPaCoverage}
                  options={paramOptions.paCoverage}
                />
              </div>
            </details>

            <div className="divider">
              <div className="font-bold">Asuransi Jiwa</div>
            </div>

            <SimulationSelect
              label="Asuransi Jiwa"
              name="life_insurance_id"
              value={lifeInsuranceId}
              placeholder="Select Asuransi Jiwa"
              loading={isLoadingLifeInsurance}
              disabled={!paketId}
              onChange={setLifeInsuranceId}
              options={lifeInsurance?.map((item) => ({
                id: item.id,
                label: item.name,
              }))}
            />

            <SimulationSelect
              key={selectedLifeInsurance?.id}
              label="Prepaid / Onloan"
              name="life_insurance_prepaid_onloan"
              value={lifeInsurancePrepaidOnloan}
              placeholder="Select Prepaid / Onloan"
              loading={isLoadingParamSetting}
              disabled={!lifeInsuranceId}
              onChange={setLifeInsurancePrepaidOnloan}
              options={paramOptions.lifeInsurancePrepaidOnloan}
            />

            <details className="collapse collapse-arrow bg-base-100 border border-base-300">
              <summary className="collapse-title font-semibold text-sm">
                Additional Coverage
              </summary>
              <div className="collapse-content text-sm flex flex-col gap-2">
                <div className="flex flex-row flex-wrap gap-2">
                  <label className="label">
                    <input
                      key={selectedLifeInsurance?.id}
                      type="checkbox"
                      name="is_affinity"
                      disabled={!lifeInsuranceId}
                      defaultChecked={!!selectedLifeInsurance?.affinity}
                      className="toggle"
                    />
                    Affinity
                  </label>

                  <label className="label">
                    <input
                      key={selectedLifeInsurance?.id}
                      type="checkbox"
                      name="is_ght"
                      disabled={!lifeInsuranceId}
                      defaultChecked={!!selectedLifeInsurance?.garda_healthtech}
                      className="toggle"
                    />
                    GHT
                  </label>
                </div>

                <SimulationSelect
                  key={selectedLifeInsurance?.id}
                  label="Jumlah Tertanggung"
                  name="jumlah_tertanggung"
                  value={jumlahTertanggung}
                  placeholder="Select Jumlah Tertanggung"
                  loading={isLoadingParamSetting}
                  disabled={!lifeInsuranceId}
                  onChange={setJumlahTertanggung}
                  options={paramOptions.paPassenger}
                />
              </div>
            </details>

            <div className="divider">
              <div className="font-bold">Rate & Others</div>
            </div>

            <fieldset className="fieldset md:flex-1">
              <legend className="fieldset-legend">Rate</legend>
              <label className="input w-full">
                <input
                  name="rate"
                  type="number"
                  className="input grow validator appearance-none"
                  required
                  placeholder={`Rate ${selectedPaketDetail?.rate ?? ""}%`}
                  min={selectedPaketDetail?.rate}
                  max={100}
                  inputMode="decimal"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  disabled={!paketId}
                />
                %
              </label>
              {!isLoadingPaketDp && paketId && selectedPaketDetail?.rate && (
                <p className="text-xs text-warning-content">
                  Minimum rate {selectedPaketDetail?.rate} %
                </p>
              )}
            </fieldset>

            <SimulationSelect
              label="Provisi / DIC"
              name="provisi_dic"
              value={provisiDic}
              placeholder="Select Provisi / DIC"
              loading={isLoadingParamSetting}
              disabled={!paketId}
              onChange={setProvisiDic}
              options={PROVISI_DIC_OPTIONS}
            />

            {provisiDic === "provisi" && (
              <fieldset className="fieldset md:flex-1">
                <legend className="fieldset-legend">Provisi</legend>
                <label className="input w-full">
                  <input
                    name="provisi"
                    type="number"
                    className="input grow validator appearance-none"
                    required
                    placeholder={`Provisi ${selectedPaketDetail?.percent_provisi ?? ""}%`}
                    min={0}
                    max={selectedPaketDetail?.percent_provisi}
                    inputMode="decimal"
                    value={provisi}
                    onChange={(e) => setProvisi(e.target.value)}
                    disabled={!paketId}
                  />
                  %
                </label>
                {!isLoadingPaketDp &&
                  paketId &&
                  selectedPaketDetail?.percent_provisi && (
                    <p className="text-xs text-warning-content">
                      Maximum provisi {selectedPaketDetail?.percent_provisi} %
                    </p>
                  )}
              </fieldset>
            )}
            {provisiDic === "dic" && (
              <fieldset className="fieldset md:flex-1">
                <legend className="fieldset-legend">DIC</legend>
                <label className="input w-full">
                  <input
                    name="dic"
                    type="number"
                    className="input grow validator appearance-none"
                    required
                    placeholder={`DIC ${selectedPaketDetail?.percent_dic ?? ""}%`}
                    min={0}
                    max={selectedPaketDetail?.percent_dic}
                    inputMode="decimal"
                    value={dic}
                    onChange={(e) => setDic(e.target.value)}
                    disabled={!paketId}
                  />
                  %
                </label>
                {!isLoadingPaketDp &&
                  paketId &&
                  selectedPaketDetail?.percent_dic && (
                    <p className="text-xs text-warning-content">
                      Maximum DIC {selectedPaketDetail?.percent_dic} %
                    </p>
                  )}
              </fieldset>
            )}

            <fieldset className="fieldset md:flex-1">
              <legend className="fieldset-legend">Biaya Polis</legend>
              <label className="input w-full">
                Rp
                <input
                  name="policy_fee"
                  type="number"
                  className="input grow validator appearance-none"
                  required
                  inputMode="decimal"
                  value={policyFee}
                  readOnly
                />
              </label>
            </fieldset>

            <fieldset className="fieldset md:flex-1">
              <legend className="fieldset-legend">Biaya Admin</legend>
              <label className="input w-full">
                Rp
                <input
                  name="admin_fee"
                  type="number"
                  className="input grow validator appearance-none"
                  required
                  min={defaultBiayaAdmin}
                  inputMode="decimal"
                  value={adminFee}
                  onChange={(e) => setAdminFee(e.target.value)}
                />
              </label>
              {!isLoadingParamSetting && (
                <p className="text-xs text-warning-content">
                  Minimum Biaya Admin {defaultBiayaAdmin}
                </p>
              )}
            </fieldset>

            <fieldset className="fieldset md:flex-1">
              <legend className="fieldset-legend">Other Fee</legend>
              <label className="input w-full">
                Rp
                <input
                  name="other_fee"
                  type="number"
                  className="input grow validator appearance-none"
                  required
                  min={otherFee?.min_value ?? 0}
                  max={otherFee?.max_value ?? 0}
                  disabled={!dealerId}
                  inputMode="decimal"
                  value={otherFeeValue}
                  onChange={(e) => setOtherFeeValue(e.target.value)}
                />
              </label>
              {dealerId && !isLoadingOtherFee && otherFee?.min_value && (
                <p className="text-xs text-warning-content">
                  Other Fee {otherFee?.min_value ?? 0} -{" "}
                  {otherFee?.max_value ?? 0}
                </p>
              )}
            </fieldset>

            <button
              type="submit"
              className="btn btn-primary sticky bottom-16"
              disabled={isCalculating}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
