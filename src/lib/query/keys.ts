export const queryKeys = {
  user: ["user"] as const,
  dealerByBranch: (branchId: string) => ["dealerByBranch", branchId] as const,
  paket: (branchId: string, dealerId: string, vehicleModelId: string) =>
    ["paket", branchId, dealerId, vehicleModelId] as const,
  paketDp: (paketId: string) => ["paketDp", paketId] as const,
  paketDetail: (paketId: string, branchId: string) =>
    ["paketDetail", paketId, branchId] as const,
  paramSetting: () => ["paramSetting"] as const,
  areaBranchGrouping: (branchId: string) =>
    ["areaBranchGrouping", branchId] as const,
  vehicleInsurance: (dealerId: string, vehicleModelId: string) =>
    ["vehicleInsurance", dealerId, vehicleModelId] as const,
  vehicleInsuranceCoverage: () => ["vehicleInsuranceCoverage"] as const,
  vehicleInsuranceDepreciation: () => ["vehicleInsuranceDepreciation"] as const,
  vehicleInsuranceTjh: () => ["vehicleInsuranceTjh"] as const,
  vehicleInsurancePa: () => ["vehicleInsurancePa"] as const,
  vehicleBrand: ["vehicleBrand"] as const,
  vehicleModel: (brandId: string) => ["vehicleModel", brandId] as const,
  vehicleType: (modelId: string) => ["vehicleType", modelId] as const,
  lifeInsurance: (paketId: string) => ["lifeInsurance", paketId] as const,
  otherFee: (branchDealerMappingId: string) =>
    ["otherFee", branchDealerMappingId] as const,
};

export const mutationKeys = {
  updateUser: ["updateUser"] as const,
};
