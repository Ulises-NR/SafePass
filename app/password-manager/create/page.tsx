"use client";

import PasswordService from "@/services/password-manager.service";
import { Eye, EyeClosed, RefreshCw } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "@/schemas/password.schema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useGeneratePassword } from "@/hooks/use-generate-password";
import { useAppDispatch } from "@/store";
import { addPassword } from "@/store/slices/passwordSlice";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { encryptText } from "@/utils/encrypt";

const Create = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [passwordType, setPasswordType] = useState("password");
  const { password, generatePassword } = useGeneratePassword();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
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
      if (!user) return;

      const formattedValues = {
        ...values,
        user_id: user.uid,
        password: encryptText(values.password),
      };
      const res = await PasswordService.addPassword(formattedValues);

      dispatch(addPassword(res));
      toast.success("Password added successfully!");
      router.push("/password-manager");
    } catch {
      toast.error("Error adding password");
    }
  }

  if (!user && !loading) {
    return router.push("/auth/signin");
  }

  if (user && !loading) {
    return (
      <>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-screen-sm mx-auto bg-neutral-50 p-4 rounded-md space-y-4 my-12"
          >
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
      </>
    );
  }
};

export default Create;
