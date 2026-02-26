import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks";
import { ROUTES } from "@/shared/constants/routes";
import { Button } from "@/shared/components/ui/button";
import { FormField } from "@/shared/components/form";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues): void => {
    login.mutate(data, {
      onSuccess: () => navigate(ROUTES.USERS),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        label="Email"
        type="email"
        placeholder="name@example.com"
        registration={register("email")}
        error={errors.email}
      />

      <FormField
        label="Password"
        type="password"
        placeholder="Enter your password"
        registration={register("password")}
        error={errors.password}
      />

      {login.error && (
        <p className="text-sm text-destructive">
          {login.error instanceof Error ? login.error.message : "Login failed"}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={login.isPending}>
        {login.isPending ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
