import {
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
  Controller,
} from "react-hook-form";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface FormSelectProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  options: { label: string; value: string }[];
  error?: FieldError;
  placeholder?: string;
}

export function FormSelect<T extends FieldValues>({
  label,
  name,
  control,
  options,
  error,
  placeholder,
}: FormSelectProps<T>) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}
