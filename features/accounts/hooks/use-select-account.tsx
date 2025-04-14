import { useRef, useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetAccounts } from "../api/use-get-accounts";
import { useCreateAccount } from "../api/use-create-account";
import { Select } from "@/components/select";
import { Input } from "@/components/ui/input";

export const useSelectAccount = (
  title = "Select Account",
  message = "Please select an account or create a new one"
): [() => React.ReactElement, () => Promise<string | boolean>] => {
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const [newAccountName, setNewAccountName] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const [promise, setPromise] = useState<{
    resolve: (value: string | boolean) => void;
  } | null>(null);

  // Fix: Changed type to string | undefined to match potential undefined values from Select
  const selectValue = useRef<string | undefined>("");

  const confirm = () =>
    new Promise<string | boolean>((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
    setIsCreatingNew(false);
    setNewAccountName("");
  };

  const handleConfirm = () => {
    if (isCreatingNew && newAccountName) {
      onCreateAccount(newAccountName);
      promise?.resolve(true);
    } else {
      // Fix: Added undefined check with fallback to false
      promise?.resolve(selectValue.current || false);
    }
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name,
    });

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Account</DialogTitle>
          <DialogDescription>
            Please Select an account to continue.
          </DialogDescription>
        </DialogHeader>
        <Select
          placeholder="select an account"
          options={accountOptions}
          onCreate={onCreateAccount}
          onChange={(value) => (selectValue.current = value)}
          disabled={accountQuery.isLoading || accountMutation.isPending}
        />
        <DialogFooter className="pt-2">
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  return [ConfirmationDialog, confirm];
};