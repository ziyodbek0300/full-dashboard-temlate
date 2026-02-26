import { type Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Role } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";
import { FormField, FormSelect } from "@/shared/components/form";
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

const ROLE_OPTIONS = [
  { label: "Admin", value: Role.ADMIN },
  { label: "Manager", value: Role.MANAGER },
  { label: "Viewer", value: Role.VIEWER },
];

const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export function UserForm({ user, onSubmit, isPending }: UserFormProps) {
  const isEditing = !!user;
  const schema = isEditing ? updateSchema : createSchema;

  const {
    register,
    handleSubmit,
    control,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
      <FormField
        label="Name"
        registration={register("name")}
        error={errors.name}
      />

      <FormField
        label="Email"
        type="email"
        registration={register("email")}
        error={errors.email}
      />

      {!isEditing && (
        <FormField
          label="Password"
          type="password"
          registration={register("password" as keyof CreateFormValues)}
          error={
            "password" in errors
              ? ((errors as { password?: { message?: string } }).password as
                  | import("react-hook-form").FieldError
                  | undefined)
              : undefined
          }
        />
      )}

      <FormSelect
        label="Role"
        name="role"
        control={control}
        options={ROLE_OPTIONS}
        error={errors.role}
      />

      {isEditing && (
        <FormSelect
          label="Status"
          name={"status" as Path<CreateFormValues | UpdateFormValues>}
          control={control}
          options={STATUS_OPTIONS}
          error={
            "status" in errors
              ? (errors.status as import("react-hook-form").FieldError)
              : undefined
          }
        />
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : isEditing ? "Update User" : "Create User"}
      </Button>
    </form>
  );
}
