"use client";

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useAppDispatch } from "@/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RemoveDialog } from "./remove-dialog";
import { UpdateDialog } from "./update-dialog";
import { decryptText } from "@/utils/encrypt";

export const PasswordCard = ({ password }: { password: PasswordBody }) => {
  const [showPassword, setShowPassword] = useState(password.password);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleShowPassword = () => {
    setShowPassword((prevState) => {
      return prevState === password.password
        ? decryptText(prevState)
        : password.password;
    });

    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{password.title}</CardTitle>
        <CardDescription>{password.username}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-x-2">
          <h2 className="flex-grow break-all whitespace-normal">
            {showPassword}
          </h2>
          <Button variant="outline" onClick={handleShowPassword}>
            {isPasswordVisible ? <EyeClosed /> : <Eye />}
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full grid grid-cols-2 gap-2">
          <RemoveDialog id={password.id} action={dispatch} />
          <UpdateDialog defaultValues={password} action={dispatch} />
        </div>
      </CardFooter>
    </Card>
  );
};

type PasswordBody = {
  account?: string;
  notes?: string;
  password: string;
  title: string;
  user_id: string;
  username: string;
  website?: string;
};
