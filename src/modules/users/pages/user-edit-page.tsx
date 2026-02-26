import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { PageLayout } from "@/shared/components/layout/page-layout";
import { Button } from "@/shared/components/ui/button";
import { LoadingSkeleton } from "@/shared/components/loading-skeleton";
import { ROUTES } from "@/shared/constants/routes";
import { useUser, useUpdateUser } from "../hooks";
import { UserForm } from "../components/user-form";
import type { UpdateUserDto } from "../types";

export function UserEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading } = useUser(id!);
  const updateUser = useUpdateUser();

  const handleSubmit = (data: unknown): void => {
    updateUser.mutate(
      { id: id!, data: data as UpdateUserDto },
      {
        onSuccess: () => {
          toast.success("User updated successfully");
          navigate(ROUTES.USERS);
        },
        onError: () => {
          toast.error("Failed to update user");
        },
      }
    );
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
      <UserForm
        user={user}
        onSubmit={handleSubmit}
        isPending={updateUser.isPending}
      />
    </PageLayout>
  );
}
