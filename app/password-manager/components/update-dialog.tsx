"use client";

import PasswordService from "@/services/password-manager.service";
import { Eye, EyeClosed, RefreshCw } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "@/schemas/password.schema";
import { updatePassword } from "@/store/slices/passwordSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGeneratePassword } from "@/hooks/use-generate-password";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { encryptText } from "@/utils/encrypt";
import { decryptText } from "@/utils/encrypt";

export const UpdateDialog = ({ defaultValues, action }) => {
  const [open, setOpen] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const { password, generatePassword } = useGeneratePassword();
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      ...defaultValues,
      password: decryptText(defaultValues.password),
    },
  });
  const { handleSubmit, formState, control } = form;

  const handlePasswordType = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const handleGeneratePassword = () => {
    generatePassword();
    form.setValue("password", password);
  };

  async function onSubmit(values: z.infer<typeof passwordSchema>) {
    try {
      const expectedValues = {
        ...defaultValues,
        ...values,
      };

      if (values.password !== defaultValues.password) {
        expectedValues.password = encryptText(values.password);
      }

      const data = await PasswordService.updatePassword(
        expectedValues.id,
        expectedValues
      );
      action(updatePassword(data));
      toast.success("Shortened URL updated");
      setOpen(false);
    } catch (e) {
      toast.error("Failed to submit. Try later");
      console.log(e);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently update your
            data.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Google account" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Aw3some JohnDoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="account"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe123@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-end justify-between gap-x-2">
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type={passwordType}
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="outline"
                type="button"
                onClick={handleGeneratePassword}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={handlePasswordType}
              >
                {passwordType === "password" ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeClosed className="h-4 w-4" />
                )}
              </Button>
            </div>
            <FormField
              control={control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Something to do" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={formState.isSubmitting}
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
