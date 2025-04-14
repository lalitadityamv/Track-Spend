"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useGetSummary } from "@/features/summary/api/use-get-summary";

export const AccountFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const accountId = params.get("accountId") || "all";
  const { isLoading: isLoadingSummary } = useGetSummary();
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const onChange = (newValue: string) => {
    const query = {
      accountId: newValue,
      from,
      to,
    };
    if (newValue === "all") {
      query.accountId = "";
    }
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );
    router.push(url);
  };
  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isLoadingSummary || isLoadingAccounts}
    >
      <SelectTrigger
        className="lg:w-auto w-full h9 rounded-md px-3 bg-white text-stone-900 
        font-normal border border-stone-200 data-[state=open]:bg-stone-100 
        hover:bg-stone-100 focus:ring-0 focus:ring-offset-0 outline-none"
      >
        <SelectValue placeholder="Select Account" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All accounts</SelectItem>
        {accounts?.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
