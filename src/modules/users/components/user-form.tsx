import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Role } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import type { User } from "../types";

const createSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.nativeEnum(Role),
});

const updateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.nativeEnum(Role),
  status: z.enum(["active", "inactive"]),
});

type CreateFormValues = z.infer<typeof createSchema>;
type UpdateFormValues = z.infer<typeof updateSchema>;

interface UserFormProps {
  user?: User;
  onSubmit: (data: CreateFormValues | UpdateFormValues) => void;
  isPending?: boolean;
}

export function UserForm({ user, onSubmit, isPending }: UserFormProps) {
  const isEditing = !!user;
  const schema = isEditing ? updateSchema : createSchema;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateFormValues | UpdateFormValues>({
    resolver: zodResolver(schema),
    defaultValues: user
      ? {
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        }
      : { role: Role.VIEWER },
  });

  const currentRole = watch("role");
  const currentStatus = isEditing
    ? watch("status" as keyof UpdateFormValues)
    : undefined;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {!isEditing && (
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password" as keyof CreateFormValues)}
          />
          {"password" in errors && errors.password && (
            <p className="text-sm text-destructive">
              {
                (errors as { password?: { message?: string } }).password
                  ?.message
              }
            </p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label>Role</Label>
        <Select
          value={currentRole}
          onValueChange={(value) => setValue("role", value as Role)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={Role.ADMIN}>Admin</SelectItem>
            <SelectItem value={Role.MANAGER}>Manager</SelectItem>
            <SelectItem value={Role.VIEWER}>Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isEditing && (
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={currentStatus as string}
            onValueChange={(value) =>
              setValue(
                "status" as keyof UpdateFormValues,
                value as "active" | "inactive"
              )
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : isEditing ? "Update User" : "Create User"}
      </Button>
    </form>
  );
}
