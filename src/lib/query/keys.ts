export const queryKeys = {
  user: ["user"] as const,
  dealerByBranch: (branchId: string) => ["dealerByBranch", branchId] as const,
  paketByBranch: (branchId: string) => ["paketByBranch", branchId] as const,
  vehicleBrand: ["vehicleBrand"] as const,
  vehicleModel: (brandId: string) => ["vehicleModel", brandId] as const,
  vehicleType: (modelId: string) => ["vehicleType", modelId] as const,
};

export const mutationKeys = {
  updateUser: ["updateUser"] as const,
};
