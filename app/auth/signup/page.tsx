"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas/user.schema";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useFirebase } from "@/hooks/use-firebase";
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
import Link from "next/link";

const SignUp = () => {
  const { createUserWithEmailAndPassword, signInWithGoogle } = useFirebase();
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit, formState, control } = form;

  async function handleGoogleLogin() {
    try {
      await signInWithGoogle();
      router.push("/");
    } catch {
      console.error("Error creating user with email and password");
    }
  }

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const res = await createUserWithEmailAndPassword(
        values.email,
        values.password
      );
      console.log({ res });
    } catch {
      console.error("Error creating user with email and password");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-screen-sm p-8 rounded bg-neutral-50 mx-auto space-y-8 my-32"
      >
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <Button
            className="w-full disabled:bg-current/10"
            type="submit"
            disabled={formState.isSubmitting}
          >
            Submit
          </Button>
          <Button
            className="w-full"
            type="button"
            variant="outline"
            onClick={() => handleGoogleLogin()}
          >
            Sign in with Google
          </Button>
          <p>
            You already have an account?
            <Link className="underline ml-2" href="/auth/signin">
              Signin
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default SignUp;
