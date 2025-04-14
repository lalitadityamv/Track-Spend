import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.transactions)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.transactions)[":id"]["$patch"]
>["json"];

export const useEditTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions[":id"]["$patch"]({
        param: { id },
        json,
      });
      if (!response.ok) {
        throw new Error(`Failed to update transaction: ${response.status}`);
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transaction updated");
      queryClient.invalidateQueries({ queryKey: ["transactions"] }); // Invalidate the list
      queryClient.invalidateQueries({ queryKey: ["summary"] }); // Invalidate the list
      queryClient.invalidateQueries({ queryKey: ["transactions", id] }); // Invalidate the specific item
    },
    onError: (error) => {
      console.error("Transaction update error:", error);
      toast.error("Failed to edit transaction");
    },
  });
  return mutation;
};
