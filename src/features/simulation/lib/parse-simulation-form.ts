export type SimulationFormValues = {
  branchName: string;
  dealerId: string;
  vehicleBrandId: string;
  vehicleModelId: string;
  vehicleTypeId: string;
  paketId: string;
  otr: number;
  dp: number;
  tipeAngsuran: string;
  tenor: number;
  tipePembiayaan: string;
  jenisPenggunaan: string;
  areaAsuransiKendaraanName: string;
  asuransiKendaraan: string;
  jenisAsuransi: string;
  prepaidOnloan: string;
  tipeDepresiasi: string;
  isBundleRfe: boolean;
  isTs: boolean;
  isPadriver: boolean;
  isPai: boolean;
  paPassenger: string;
  tjh: number;
  paCoverage: number;
  lifeInsuranceId: string;
  lifeInsurancePrepaidOnloan: string;
  isAffinity: boolean;
  isGht: boolean;
  jumlahTertanggung: string;
  rate: number;
  provisiDic: string;
  provisi: number | null;
  dic: number | null;
  policyFee: number;
  adminFee: number;
  otherFee: number;
};

function getFormString(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

function getFormNumber(formData: FormData, name: string) {
  const value = Number(getFormString(formData, name));
  return Number.isFinite(value) ? value : 0;
}

function getOptionalFormNumber(formData: FormData, name: string) {
  const value = getFormString(formData, name);
  if (!value) return null;
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
}

export function parseSimulationForm(formData: FormData): SimulationFormValues {
  return {
    branchName: getFormString(formData, "branch_name"),
    dealerId: getFormString(formData, "dealerId"),
    vehicleBrandId: getFormString(formData, "vehicleBrandId"),
    vehicleModelId: getFormString(formData, "vehicleModelId"),
    vehicleTypeId: getFormString(formData, "vehicleTypeId"),
    paketId: getFormString(formData, "paketId"),
    otr: getFormNumber(formData, "otr"),
    dp: getFormNumber(formData, "dp"),
    tipeAngsuran: getFormString(formData, "tipe_angsuran"),
    tenor: getFormNumber(formData, "tenor"),
    tipePembiayaan: getFormString(formData, "tipe_pembiayaan"),
    jenisPenggunaan: getFormString(formData, "jenis_penggunaan"),
    areaAsuransiKendaraanName: getFormString(
      formData,
      "area_asuransi_kendaraan_name",
    ),
    asuransiKendaraan: getFormString(formData, "asuransi_kendaraan"),
    jenisAsuransi: getFormString(formData, "jenis_asuransi"),
    prepaidOnloan: getFormString(formData, "prepaid_onloan"),
    tipeDepresiasi: getFormString(formData, "tipe_depresiasi"),
    isBundleRfe: formData.has("is_bundlerfe"),
    isTs: formData.has("is_ts"),
    isPadriver: formData.has("is_padriver"),
    isPai: formData.has("is_pai"),
    paPassenger: getFormString(formData, "pa_passenger"),
    tjh: getFormNumber(formData, "tjh"),
    paCoverage: getFormNumber(formData, "pa_coverage"),
    lifeInsuranceId: getFormString(formData, "life_insurance_id"),
    lifeInsurancePrepaidOnloan: getFormString(
      formData,
      "life_insurance_prepaid_onloan",
    ),
    isAffinity: formData.has("is_affinity"),
    isGht: formData.has("is_ght"),
    jumlahTertanggung: getFormString(formData, "jumlah_tertanggung"),
    rate: getFormNumber(formData, "rate"),
    provisiDic: getFormString(formData, "provisi_dic"),
    provisi: getOptionalFormNumber(formData, "provisi"),
    dic: getOptionalFormNumber(formData, "dic"),
    policyFee: getFormNumber(formData, "policy_fee"),
    adminFee: getFormNumber(formData, "admin_fee"),
    otherFee: getFormNumber(formData, "other_fee"),
  };
}
