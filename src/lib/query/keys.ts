export const queryKeys = {
  user: ["user"] as const,
  dealerByBranch: (branchId: string) => ["dealerByBranch", branchId] as const,
  paketByBranch: (branchId: string) => ["paketByBranch", branchId] as const,
  paketDp: (paketId: string) => ["paketDp", paketId] as const,
  paketTenor: (paketId: string) => ["paketTenor", paketId] as const,
  paramSetting: () => ["paramSetting"] as const,
  areaBranchGrouping: (branchId: string) =>
    ["areaBranchGrouping", branchId] as const,
  vehicleInsurance: (dealerId: string, vehicleModelId: string) =>
    ["vehicleInsurance", dealerId, vehicleModelId] as const,
  vehicleBrand: ["vehicleBrand"] as const,
  vehicleModel: (brandId: string) => ["vehicleModel", brandId] as const,
  vehicleType: (modelId: string) => ["vehicleType", modelId] as const,
};

export const mutationKeys = {
  updateUser: ["updateUser"] as const,
};
