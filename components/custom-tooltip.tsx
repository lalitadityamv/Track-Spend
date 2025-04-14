
import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "./ui/separator";

export const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;
  
  const date = new Date(payload[0].payload.date);
  const income = payload[0].value;
  const expenses = payload[1].value;
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <p className="font-medium text-gray-800">{format(date, "MMM dd, yyyy")}</p>
      <Separator className="my-2" />
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-emerald-500 rounded-full" />
            <p className="text-sm text-muted-foreground">Income</p>
          </div>
          <p className="text-sm text-right font-medium">
            {formatCurrency(income)}
          </p>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-red-500 rounded-full" />
            <p className="text-sm text-muted-foreground">Expense</p>
          </div>
          <p className="text-sm text-right font-medium">
            {formatCurrency(expenses*-1)}
          </p>
        </div>
      </div>
    </div>
  );
};