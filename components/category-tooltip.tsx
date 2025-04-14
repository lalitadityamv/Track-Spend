import { formatCurrency } from "@/lib/utils";
import { Separator } from "./ui/separator";

export const CategoryTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;

  const name = payload[0].payload.name;
  const value = payload[0].value;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <p className="font-medium text-gray-800">{name}</p>
      <Separator className="my-2" />
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-red-500 rounded-full" />
            <p className="text-sm text-muted-foreground">Expense</p>
          </div>
          <p className="text-sm text-right font-medium">
            {formatCurrency(value * -1)}
          </p>
        </div>
      </div>
    </div>
  );
};
