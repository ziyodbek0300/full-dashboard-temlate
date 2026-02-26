import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Users } from "lucide-react";
import { PageLayout } from "@/shared/components/layout/page-layout";
import { Button } from "@/shared/components/ui/button";
import { ConfirmDialog } from "@/shared/components/confirm-dialog";
import { EmptyState } from "@/shared/components/empty-state";
import { LoadingSkeleton } from "@/shared/components/loading-skeleton";
import { useAuth } from "@/modules/auth/context";
import { Permission } from "@/shared/types";
import { ROUTES } from "@/shared/constants/routes";
import { useMutationWithToast } from "@/shared/hooks/use-mutation-with-toast";
import { useUsers, useDeleteUser } from "../hooks";
import { UserTable } from "../components/user-table";
import { UserFilters } from "../components/user-filters";
import type { User, UserFilters as UserFiltersType } from "../types";

export function UsersListPage() {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  const [filters, setFilters] = useState<UserFiltersType>({
    page: 1,
    perPage: 10,
  });
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const { data, isLoading } = useUsers(filters);
  const deleteMutation = useDeleteUser();

  const { mutateWithToast: deleteWithToast, isPending: isDeleting } =
    useMutationWithToast(deleteMutation, {
      successMessage: "User deleted successfully",
      errorMessage: "Failed to delete user",
      onSuccessCallback: () => setDeleteTarget(null),
    });

  const handleDelete = (): void => {
    if (!deleteTarget) return;
    deleteWithToast(deleteTarget.id);
  };

  return (
    <PageLayout
      title="Users"
      description="Manage your team members and their access."
      actions={
        hasPermission(Permission.USERS_CREATE) ? (
          <Button onClick={() => navigate(ROUTES.USER_CREATE)}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        ) : undefined
      }
    >
      <UserFilters filters={filters} onChange={setFilters} />

      {isLoading ? (
        <LoadingSkeleton variant="table" />
      ) : !data?.data.length ? (
        <EmptyState
          icon={Users}
          title="No users found"
          description="Get started by adding your first team member."
          action={
            hasPermission(Permission.USERS_CREATE) ? (
              <Button onClick={() => navigate(ROUTES.USER_CREATE)}>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            ) : undefined
          }
        />
      ) : (
        <UserTable
          data={data.data}
          page={filters.page || 1}
          totalPages={data.meta.totalPages}
          onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
          onDelete={setDeleteTarget}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete User"
        description={`Are you sure you want to delete ${deleteTarget?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        isPending={isDeleting}
      />
    </PageLayout>
  );
}
