import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/shared/components/data-table";
import { useAuth } from "@/modules/auth/context";
import { Permission } from "@/shared/types";
import { ROUTES } from "@/shared/constants/routes";
import { getUserColumns } from "./user-columns";
import type { User } from "../types";

interface UserTableProps {
  data: User[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onDelete: (user: User) => void;
}

export function UserTable({
  data,
  page,
  totalPages,
  onPageChange,
  onDelete,
}: UserTableProps) {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();

  const columns = useMemo(
    () =>
      getUserColumns({
        onView: (user) => navigate(ROUTES.USER_DETAIL(user.id)),
        onEdit: hasPermission(Permission.USERS_UPDATE)
          ? (user) => navigate(ROUTES.USER_EDIT(user.id))
          : undefined,
        onDelete: hasPermission(Permission.USERS_DELETE) ? onDelete : undefined,
      }),
    [navigate, hasPermission, onDelete]
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
}
