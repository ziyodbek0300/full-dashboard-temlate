import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Input, type InputProps } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

interface FormFieldProps extends Omit<InputProps, "name"> {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

export function FormField({
  label,
  registration,
  error,
  ...inputProps
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={registration.name}>{label}</Label>
      <Input id={registration.name} {...registration} {...inputProps} />
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}
