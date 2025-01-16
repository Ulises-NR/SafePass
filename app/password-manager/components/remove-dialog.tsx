"use client";

import PasswordService from "@/services/password-manager.service";
import { useTransition } from "react";
import { deletePassword } from "@/store/slices/passwordSlice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const RemoveDialog = ({ id, action }) => {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await PasswordService.removePassword(id);

      action(deletePassword(id));
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Remove</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            data.
          </DialogDescription>
        </DialogHeader>

        <Button disabled={isPending} onClick={handleDelete} type="submit">
          Remove data
        </Button>
      </DialogContent>
    </Dialog>
  );
};
