import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { convertAmountFromMiliunits } from "@/lib/utils";

type TransactionResponse = {
  data?: {
    id: string;
    date: string;
    accountId: string;
    categoryId: string | null;
    payee: string;
    amount: number;
    notes: string | null;
  };
  error?: string;
};

export const useGetTransaction = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["transactions", id],
    queryFn: async () => {
      if (!id) return null;
      
      const response = await client.api.transactions[":id"].$get({ param: { id } });
      
      if (!response.ok) {
        // Handle error response
        const errorBody = await response.json().catch(() => ({ error: `HTTP error ${response.status}` }));
        // Type assertion here to help TypeScript
        const errorData = errorBody as { error?: string };
        throw new Error(errorData.error || `Failed to fetch transaction: ${response.status}`);
      }
      
      // For successful responses
      const data = await response.json() as TransactionResponse;
      if (!data.data) {
        throw new Error("No transaction data received");
      }
      return {
        ...data.data,
        amount:convertAmountFromMiliunits(data.data.amount)
      };
    },
  });

  return query;
};