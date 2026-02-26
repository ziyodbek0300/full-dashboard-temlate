import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { PageLayout } from "@/shared/components/layout/page-layout";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/constants/routes";
import { useCreateUser } from "../hooks";
import { UserForm } from "../components/user-form";
import type { CreateUserDto } from "../types";

export function UserCreatePage() {
  const navigate = useNavigate();
  const createUser = useCreateUser();

  const handleSubmit = (data: unknown): void => {
    createUser.mutate(data as CreateUserDto, {
      onSuccess: () => {
        toast.success("User created successfully");
        navigate(ROUTES.USERS);
      },
      onError: () => {
        toast.error("Failed to create user");
      },
    });
  };

  return (
    <PageLayout
      title="Create User"
      description="Add a new team member."
      actions={
        <Button variant="outline" onClick={() => navigate(ROUTES.USERS)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      }
    >
      <UserForm onSubmit={handleSubmit} isPending={createUser.isPending} />
    </PageLayout>
  );
}
