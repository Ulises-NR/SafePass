"use client";

import { Clipboard, RefreshCw } from "lucide-react";
import { useGeneratePassword } from "@/hooks/use-generate-password";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const PasswordGenerator = () => {
  const {
    password,
    length,
    useUppercase,
    useNumbers,
    useSymbols,
    setLength,
    setUseUppercase,
    setUseNumbers,
    setUseSymbols,
    generatePassword,
  } = useGeneratePassword();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Password generator</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Password generator</DialogTitle>
          <DialogDescription>
            Custom password generator with the options you want. Copy the
            password to the clipboard to use anywhere.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input value={password} readOnly className="flex-grow" />
            <Button onClick={copyToClipboard} size="icon">
              <Clipboard className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Longitud: {length}</Label>
              <span className="text-sm text-gray-500">{length} caracteres</span>
            </div>
            <Slider
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
              max={30}
              min={6}
              step={1}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="uppercase">Mayúsculas</Label>
            <Switch
              id="uppercase"
              checked={useUppercase}
              onCheckedChange={setUseUppercase}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="numbers">Números</Label>
            <Switch
              id="numbers"
              checked={useNumbers}
              onCheckedChange={setUseNumbers}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="symbols">Símbolos</Label>
            <Switch
              id="symbols"
              checked={useSymbols}
              onCheckedChange={setUseSymbols}
            />
          </div>
          <Button onClick={generatePassword} className="flex-grow">
            <RefreshCw className="mr-2 h-4 w-4" /> Generar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
