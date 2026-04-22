"use client";

import ApexCharts from "apexcharts";
import { useEffect, useRef } from "react";

type Props = {
  budgetData: number[];
  creditData: number[];
  categories: string[];
};

export default function BarChart({
  budgetData,
  creditData,
  categories,
}: Props) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const options = {
      series: [
        {
          name: "Simulasi Budget",
          color: "#007A55",
          data: budgetData,
        },
        {
          name: "Simulasi Credit",
          data: creditData,
          color: "#C70036",
        },
      ],
      chart: {
        sparkline: {
          enabled: false,
        },
        type: "bar",
        width: "100%",
        height: 400,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "100%",
          borderRadius: 6,
          dataLabels: {
            position: "top",
          },
        },
      },
      legend: {
        show: true,
        position: "bottom",
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
        formatter: (value: number) => {
          return value;
        },
      },
      xaxis: {
        categories: categories,
        axisTicks: { show: false },
        axisBorder: { show: false },
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-body",
          },
          formatter: (value: string) => value,
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-body",
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

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return <div ref={chartRef} className="w-full" />;
}
