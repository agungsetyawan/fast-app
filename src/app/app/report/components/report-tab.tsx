"use client";

import {
  Banknote,
  Calculator,
  ChevronDown,
  ChevronUp,
  Eye,
} from "lucide-react";
import { useMemo, useState } from "react";

type DataType = {
  id: string;
  paket_name: string;
  area: string;
  branch: string;
  customer_name: string;
};

type TabKey = "budget" | "credit";

type TabState = {
  search: string;
  page: number;
  sortKey: keyof DataType;
  sortAsc: boolean;
};

const ROWS_PER_PAGE = 10;

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "budget", label: "Simulasi Budget", icon: <Banknote size={16} /> },
  { key: "credit", label: "Simulasi Credit", icon: <Calculator size={16} /> },
];

const DEFAULT_TAB_STATE: TabState = {
  search: "",
  page: 1,
  sortKey: "id",
  sortAsc: true,
};

export default function ReportTab({
  simulasiBudget = [],
  simulasiCredit = [],
}: {
  simulasiBudget: DataType[];
  simulasiCredit: DataType[];
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("budget");
  const [tabStates, setTabStates] = useState<Record<TabKey, TabState>>({
    budget: { ...DEFAULT_TAB_STATE },
    credit: { ...DEFAULT_TAB_STATE },
  });

  const { search, page, sortKey, sortAsc } = tabStates[activeTab];
  const rawData = activeTab === "budget" ? simulasiBudget : simulasiCredit;

  const updateTabState = (patch: Partial<TabState>) => {
    setTabStates((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], ...patch },
    }));
  };

  const handleSearch = (value: string) => {
    updateTabState({ search: value, page: 1 });
  };

  const handleSort = (key: keyof DataType) => {
    updateTabState(
      key === sortKey
        ? { sortAsc: !sortAsc }
        : { sortKey: key, sortAsc: true, page: 1 },
    );
  };

  const handlePreview = (item: DataType) => {
    console.log("Preview item:", item);
    // router.push(`/preview/${item.id}`)
  };

  const processedData = useMemo(() => {
    const filtered = search
      ? rawData.filter((item) =>
          Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase()),
        )
      : [...rawData];

    return filtered.sort((a, b) => {
      const aVal = a[sortKey] ?? "";
      const bVal = b[sortKey] ?? "";
      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [rawData, search, sortKey, sortAsc]);

  const totalPages = Math.ceil(processedData.length / ROWS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return processedData.slice(start, start + ROWS_PER_PAGE);
  }, [processedData, page]);

  const SortableHeader = ({
    label,
    colKey,
  }: {
    label: string;
    colKey: keyof DataType;
  }) => (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <>
    <td
      onClick={() => handleSort(colKey)}
      className="cursor-pointer select-none"
    >
      {label}{" "}
      {sortKey === colKey &&
        (sortAsc ? (
          <ChevronUp size={16} className="inline-block" />
        ) : (
          <ChevronDown size={16} className="inline-block" />
        ))}
    </td>
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs — daisyUI tabs-box */}
      <div
        role="tablist"
        className="tabs tabs-box w-full md:w-fit justify-around"
      >
        {TABS.map(({ key, label, icon }) => (
          <button
            key={key}
            role="tab"
            type="button"
            onClick={() => setActiveTab(key)}
            className={`tab gap-2 max-sm:w-1/2 font-semibold ${activeTab === key ? "tab-active" : ""}`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder={`Search ${activeTab}...`}
        className="input input-bordered w-full md:max-w-xs"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* Table — daisyUI table with border wrapper */}
      <div className="overflow-auto h-[calc(100vh-340px)] md:h-[calc(100vh-400px)] w-full rounded-box border border-base-content/5 bg-base-100">
        <table className="table table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <SortableHeader label="Label" colKey="customer_name" />
              <SortableHeader label="Paket Name" colKey="paket_name" />
              <SortableHeader label="Area" colKey="area" />
              <SortableHeader label="Branch" colKey="branch" />
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-base-content/50">
                  No data
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-base-200">
                  <td>{item.customer_name}</td>
                  <td>{item.paket_name}</td>
                  <td>{item.area}</td>
                  <td>{item.branch}</td>
                  <th className="bg-base-100 text-center">
                    <button
                      type="button"
                      onClick={() => handlePreview(item)}
                      className="btn btn-ghost btn-xs btn-square"
                    >
                      <Eye size={16} />
                    </button>
                  </th>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-base-content/60">
          Page {page} of {totalPages || 1}
        </span>

        <div className="join">
          <button
            type="button"
            className="join-item btn btn-sm"
            disabled={page === 1}
            onClick={() => updateTabState({ page: page - 1 })}
          >
            «
          </button>
          <button type="button" className="join-item btn btn-sm btn-active">
            {page}
          </button>
          <button
            type="button"
            className="join-item btn btn-sm"
            disabled={page >= totalPages}
            onClick={() => updateTabState({ page: page + 1 })}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
