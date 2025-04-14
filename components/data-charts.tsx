"use client";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { Chart } from "./chart";
import { SpendingPie } from "./spending-pie";

export const DataChart = () => {
  const { data, isLoading } = useGetSummary();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mt-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data?.days} />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPie data={data?.categories}/>
      </div>
    </div>
  );
};