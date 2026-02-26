import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageLayout } from "@/shared/components/layout/page-layout";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/constants/routes";
import { useMutationWithToast } from "@/shared/hooks/use-mutation-with-toast";
import { useCreateUser } from "../hooks";
import {
  CreateUserForm,
  type CreateFormValues,
} from "../components/create-user-form";

export function UserCreatePage() {
  const navigate = useNavigate();
  const createUser = useCreateUser();

  const { mutateWithToast, isPending } = useMutationWithToast(createUser, {
    successMessage: "User created successfully",
    errorMessage: "Failed to create user",
    redirectTo: ROUTES.USERS,
  });

  const handleSubmit = (data: CreateFormValues): void => {
    mutateWithToast(data);
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
      <CreateUserForm onSubmit={handleSubmit} isPending={isPending} />
    </PageLayout>
  );
}
