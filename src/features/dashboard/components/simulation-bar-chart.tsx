"use client";

import type { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

type Props = {
  budgetData: number[];
  creditData: number[];
  categories: string[];
};

type ChartInstance = {
  render: () => Promise<unknown> | unknown;
  destroy: () => void;
};

export default function SimulationBarChart({
  budgetData,
  creditData,
  categories,
}: Props) {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!chartRef.current) return;
    let chart: ChartInstance | null = null;
    let isMounted = true;

    const options: ApexOptions = {
      theme: {
        mode: theme === "dark" ? "dark" : "light",
      },
      series: [
        {
          name: "Simulasi Budget",
          color: "var(--color-success)",
          data: budgetData,
        },
        {
          name: "Simulasi Credit",
          color: "var(--color-secondary)",
          data: creditData,
        },
      ],
      chart: {
        sparkline: {
          enabled: false,
        },
        type: "bar",
        width: "100%",
        height: 600,
        background: "var(--color-base-200)",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "100%",
          borderRadius: 6,
          borderRadiusApplication: "around",
          dataLabels: {
            position: "top",
          },
        },
      },
      legend: {
        show: true,
        position: "bottom",
        fontFamily: "Nunito Sans, Nunito Sans Fallback",
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories,
        axisTicks: { show: false },
        axisBorder: { show: false },
        labels: {
          show: true,
          style: {
            fontFamily: "Nunito Sans, Nunito Sans Fallback",
            cssClass: "text-xs font-normal",
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "left",
          style: {
            fontFamily: "Nunito Sans, Nunito Sans Fallback",
            cssClass: "text-xs font-normal text-left",
          },
        },
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -20,
        },
      },
    };

    async function renderChart() {
      const { default: ApexCharts } = await import("apexcharts");
      if (!isMounted || !chartRef.current) return;

      const instance = new ApexCharts(chartRef.current, options);
      chart = instance;
      await instance.render();
    }

    void renderChart();

    return () => {
      isMounted = false;
      chart?.destroy();
    };
  }, [theme, budgetData, creditData, categories]);

  return <div ref={chartRef} className="w-full" />;
}
