import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Role } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";
import { FormField, FormSelect } from "@/shared/components/form";
import { ROLE_OPTIONS } from "@/shared/constants/role-options";

const createSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.nativeEnum(Role),
});

export type CreateFormValues = z.infer<typeof createSchema>;

interface CreateUserFormProps {
  onSubmit: (data: CreateFormValues) => void;
  isPending?: boolean;
}

export function CreateUserForm({ onSubmit, isPending }: CreateUserFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateFormValues>({
    resolver: zodResolver(createSchema),
    defaultValues: { role: Role.VIEWER },
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

      <FormField
        label="Password"
        type="password"
        registration={register("password")}
        error={errors.password}
      />

      <FormSelect
        label="Role"
        name="role"
        control={control}
        options={ROLE_OPTIONS}
        error={errors.role}
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Create User"}
      </Button>
    </form>
  );
}
