"use client";

import { useMemo, useState, useEffect } from "react";
import { Banknote, Calculator, Eye } from "lucide-react";

type DataType = {
    id: string;
    paket_name: string;
    area: string;
    branch: string;
    customer_name: string;
};

const ROWS_PER_PAGE = 10;

const handlePreview = (item: DataType) => {
    console.log("Preview item:", item);
    // later you can open modal or route:
    // router.push(`/preview/${item.id}`)
};

export default function ReportTab({
    simulasiBudget = [],
    simulasiCredit = [],
}: {
    simulasiBudget: DataType[];
    simulasiCredit: DataType[];
}) {
    const [activeTab, setActiveTab] = useState<"budget" | "credit">("budget");

    // search per tab
    const [budgetSearch, setBudgetSearch] = useState("");
    const [creditSearch, setCreditSearch] = useState("");

    // pagination per tab
    const [budgetPage, setBudgetPage] = useState(1);
    const [creditPage, setCreditPage] = useState(1);

    const [sortKey, setSortKey] = useState<keyof DataType>("id");
    const [sortAsc, setSortAsc] = useState(true);

    const rawData =
        activeTab === "budget" ? simulasiBudget : simulasiCredit;

    const searchValue =
        activeTab === "budget" ? budgetSearch : creditSearch;

    const setSearchValue =
        activeTab === "budget" ? setBudgetSearch : setCreditSearch;

    const page = activeTab === "budget" ? budgetPage : creditPage;
    const setPage = activeTab === "budget" ? setBudgetPage : setCreditPage;

    // reset page when switching tab or searching
    useEffect(() => {
        setPage(1);
    }, [activeTab, searchValue]);

    // 🔍 filter + sort
    const processedData = useMemo(() => {
        let data = [...rawData];

        if (searchValue) {
            data = data.filter((item) =>
                Object.values(item)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            );
        }

        data.sort((a, b) => {
            const aVal = a[sortKey] ?? "";
            const bVal = b[sortKey] ?? "";

            if (aVal < bVal) return sortAsc ? -1 : 1;
            if (aVal > bVal) return sortAsc ? 1 : -1;
            return 0;
        });

        return data;
    }, [rawData, searchValue, sortKey, sortAsc]);

    // pagination
    const totalPages = Math.ceil(processedData.length / ROWS_PER_PAGE);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * ROWS_PER_PAGE;
        return processedData.slice(start, start + ROWS_PER_PAGE);
    }, [processedData, page]);

    const handleSort = (key: keyof DataType) => {
        if (key === sortKey) {
            setSortAsc(!sortAsc);
        } else {
            setSortKey(key);
            setSortAsc(true);
        }
    };

    return (
        <div className="flex flex-col gap-4">

            {/* Tabs */}
            <div className="relative flex items-center gap-1 bg-base-200/70 backdrop-blur-md p-1 rounded-2xl w-fit shadow-sm border border-base-300">

                {/* Budget */}
                <button
                    onClick={() => setActiveTab("budget")}
                    className={`
      relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
      transition-all duration-200
      ${activeTab === "budget"
                            ? "bg-base-100 text-primary shadow-md"
                            : "text-base-content/60 hover:text-base-content hover:bg-base-300/60"
                        }
    `}
                >
                    <Banknote size={18} className="opacity-90" />
                    Simulasi Budget
                </button>

                {/* Credit */}
                <button
                    onClick={() => setActiveTab("credit")}
                    className={`
      relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
      transition-all duration-200
      ${activeTab === "credit"
                            ? "bg-base-100 text-primary shadow-md"
                            : "text-base-content/60 hover:text-base-content hover:bg-base-300/60"
                        }
    `}
                >
                    <Calculator size={18} className="opacity-90" />
                    Simulasi Credit
                </button>

            </div>

            {/* Search */}
            <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                className="input input-bordered w-full max-w-xs"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />

            {/* Table */}
            <div className="overflow-auto h-[calc(100vh-250px)] w-full">
                <table className="table table-pin-rows">

                    <thead className="bg-base-200">
                        <tr>
                            <th
                                onClick={() => handleSort("customer_name")}
                            >
                                Label {sortKey === "customer_name" ? (sortAsc ? "↑" : "↓") : ""}
                            </th>
                            <th onClick={() => handleSort("paket_name")} className="cursor-pointer">
                                Paket Name {sortKey === "paket_name" ? (sortAsc ? "↑" : "↓") : ""}
                            </th>
                            <th onClick={() => handleSort("area")} className="cursor-pointer">
                                Area {sortKey === "area" ? (sortAsc ? "↑" : "↓") : ""}
                            </th>
                            <th onClick={() => handleSort("branch")} className="cursor-pointer">
                                Branch {sortKey === "branch" ? (sortAsc ? "↑" : "↓") : ""}
                            </th>
                            <th className="sticky right-0 bg-base-100 z-20 text-center shadow-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    No data
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        {item.customer_name}
                                    </td>
                                    <td>{item.paket_name}</td>
                                    <td>{item.area}</td>
                                    <td>{item.branch}</td>
                                    {/* 👁 Action */}
                                    <td className="sticky right-0 bg-base-100 z-20 text-center shadow-left">
                                        <button title="Action" aria-label="Action"
                                            onClick={() => handlePreview(item)}
                                            className="btn btn-ghost btn-xs"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">

                <span className="text-sm">
                    Page {page} of {totalPages || 1}
                </span>

                <div className="join">
                    <button
                        className="join-item btn btn-sm"
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        «
                    </button>

                    <button className="join-item btn btn-sm">
                        {page}
                    </button>

                    <button
                        className="join-item btn btn-sm"
                        disabled={page === totalPages || totalPages === 0}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        »
                    </button>
                </div>

            </div>
        </div>
    );
}