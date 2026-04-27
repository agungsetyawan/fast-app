"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useDealer } from "@/hooks/useDealer";
import { usePaket } from "@/hooks/usePaket";
import { useUser } from "@/hooks/useUser";
import {
  useVehicleBrand,
  useVehicleModel,
  useVehicleType,
} from "@/hooks/useVehicle";

export default function Page() {
  const [branchId, setBranchId] = useState<string>("");
  const [dealerId, setDealerId] = useState<string>("");
  const [vehicleBrandId, setVehicleBrandId] = useState<string>("");
  const [vehicleModelId, setVehicleModelId] = useState<string>("");
  const [vehicleTypeId, setVehicleTypeId] = useState<string>("");
  const [paketId, setPaketId] = useState<string>("");

  const { data: user } = useUser();
  useEffect(() => {
    setBranchId(user?.branch_id ?? "");
  }, [user]);

  const { data: dealer, isLoading: isLoadingDealer } = useDealer(branchId);
  const { data: vehicleBrand, isLoading: isLoadingVehicleBrand } =
    useVehicleBrand();
  const { data: vehicleModel, isLoading: isLoadingVehicleModel } =
    useVehicleModel(vehicleBrandId);
  const { data: vehicleType, isLoading: isLoadingVehicleType } =
    useVehicleType(vehicleModelId);
  const { data: paket, isLoading: isLoadingPaket } = usePaket(branchId);

  const handleDealerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDealerId(value);
    setVehicleBrandId("");
    setVehicleModelId("");
    setVehicleTypeId("");
  };

  const handleVehicleBrandChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = e.target.value;
    setVehicleBrandId(value);
    setVehicleModelId("");
    setVehicleTypeId("");
  };

  const handleVehicleModelChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = e.target.value;
    setVehicleModelId(value);
    setVehicleTypeId("");
  };

  const handleVehicleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setVehicleTypeId(value);
  };

  const handlePaketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPaketId(value);
  };

  return (
    <>
      <ul className="steps w-full sticky top-16 z-50 bg-base-200 shadow">
        <li className="step step-primary">Input Data</li>
        <li className="step">Kalkulasi</li>
      </ul>

      <div className="w-full flex flex-col gap-2 p-4">
        <div className="flex flex-col gap-2 items-start">
          <form className="w-full flex flex-col gap-2">
            <h1 className="text-2xl font-bold">General</h1>

            <input type="hidden" name="branchId" value={branchId} />
            <label className="input w-full">
              <span className="label">Branch</span>
              <input
                type="text"
                disabled
                defaultValue={user?.branch_name || ""}
              />
            </label>

            <label className="select w-full">
              <span className="label">Dealer</span>
              <select
                className="select"
                name="dealerId"
                value={dealerId}
                required
                disabled={!branchId || isLoadingDealer}
                onChange={handleDealerChange}
              >
                <option value="">
                  {isLoadingDealer ? "Loading..." : "Select Dealer"}
                </option>
                {dealer?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} - {item.tipe_dealer}
                  </option>
                ))}
              </select>
            </label>

            <label className="select w-full">
              <span className="label">Brand</span>
              <select
                className="select"
                name="vehicleBrandId"
                value={vehicleBrandId}
                required
                disabled={!dealerId || isLoadingVehicleBrand}
                onChange={handleVehicleBrandChange}
              >
                <option value="">
                  {isLoadingVehicleBrand ? "Loading..." : "Select Brand"}
                </option>
                {vehicleBrand?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="select w-full">
              <span className="label">Model</span>
              <select
                className="select"
                name="vehicleModelId"
                value={vehicleModelId}
                required
                disabled={!vehicleBrandId || isLoadingVehicleModel}
                onChange={handleVehicleModelChange}
              >
                <option value="">
                  {isLoadingVehicleModel ? "Loading..." : "Select Model"}
                </option>
                {vehicleModel?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} - {item.category}
                  </option>
                ))}
              </select>
            </label>

            <label className="select w-full">
              <span className="label">Tipe Kendaraan</span>
              <select
                className="select"
                name="vehicleTypeId"
                value={vehicleTypeId}
                required
                disabled={!vehicleModelId || isLoadingVehicleType}
                onChange={handleVehicleTypeChange}
              >
                <option value="">
                  {isLoadingVehicleType
                    ? "Loading..."
                    : "Select Tipe Kendaraan"}
                </option>
                {vehicleType?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="select w-full">
              <span className="label">Paket</span>
              <select
                className="select"
                name="paketId"
                value={paketId}
                required
                disabled={!branchId || isLoadingPaket}
                onChange={handlePaketChange}
              >
                <option value="">
                  {isLoadingPaket ? "Loading..." : "Select Paket"}
                </option>
                {paket?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
          </form>
        </div>
      </div>
    </>
  );
}
