import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageLayout } from "@/shared/components/layout/page-layout";
import { Button } from "@/shared/components/ui/button";
import { LoadingSkeleton } from "@/shared/components/loading-skeleton";
import { ROUTES } from "@/shared/constants/routes";
import { useMutationWithToast } from "@/shared/hooks/use-mutation-with-toast";
import { useUser, useUpdateUser } from "../hooks";
import {
  EditUserForm,
  type EditFormValues,
} from "../components/edit-user-form";

export function UserEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading } = useUser(id!);
  const updateUser = useUpdateUser();

  const { mutateWithToast, isPending } = useMutationWithToast(updateUser, {
    successMessage: "User updated successfully",
    errorMessage: "Failed to update user",
    redirectTo: ROUTES.USERS,
  });

  const handleSubmit = (data: EditFormValues): void => {
    mutateWithToast({ id: id!, data });
  };

  if (isLoading) return <LoadingSkeleton variant="form" count={4} />;
  if (!user) return null;

  return (
    <PageLayout
      title={`Edit ${user.name}`}
      description="Update user details."
      actions={
        <Button variant="outline" onClick={() => navigate(ROUTES.USERS)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      }
    >
      <EditUserForm user={user} onSubmit={handleSubmit} isPending={isPending} />
    </PageLayout>
  );
}
