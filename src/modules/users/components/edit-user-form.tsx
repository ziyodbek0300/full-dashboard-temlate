import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Role } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";
import { FormField, FormSelect } from "@/shared/components/form";
import { ROLE_OPTIONS } from "@/shared/constants/role-options";
import type { User } from "../types";

const updateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.nativeEnum(Role),
  status: z.enum(["active", "inactive"]),
});

export type EditFormValues = z.infer<typeof updateSchema>;

const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

interface EditUserFormProps {
  user: User;
  onSubmit: (data: EditFormValues) => void;
  isPending?: boolean;
}

export function EditUserForm({ user, onSubmit, isPending }: EditUserFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
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

      <FormSelect
        label="Role"
        name="role"
        control={control}
        options={ROLE_OPTIONS}
        error={errors.role}
      />

      <FormSelect
        label="Status"
        name="status"
        control={control}
        options={STATUS_OPTIONS}
        error={errors.status}
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Update User"}
      </Button>
    </form>
  );
}
