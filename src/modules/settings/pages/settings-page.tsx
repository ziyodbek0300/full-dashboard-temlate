import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { PageLayout } from "@/shared/components/layout/page-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { FormField } from "@/shared/components/form";
import { useAuth } from "@/modules/auth/context";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function SettingsPage() {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = (_data: ProfileFormValues): void => {
    toast.success("Profile updated successfully");
  };

  return (
    <PageLayout title="Settings" description="Manage your account settings.">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg space-y-4"
          >
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

            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
