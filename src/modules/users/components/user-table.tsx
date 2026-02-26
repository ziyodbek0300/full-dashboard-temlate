import { type ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { DataTable } from "@/shared/components/data-table";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Permission } from "@/shared/types";
import { PermissionGate } from "@/shared/components/permission-gate";
import { ROUTES } from "@/shared/constants/routes";
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

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant="secondary" className="capitalize">
          {row.original.role}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={row.original.status === "active" ? "default" : "outline"}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigate(ROUTES.USER_DETAIL(row.original.id))}
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <PermissionGate permission={Permission.USERS_UPDATE}>
              <DropdownMenuItem
                onClick={() => navigate(ROUTES.USER_EDIT(row.original.id))}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            </PermissionGate>
            <PermissionGate permission={Permission.USERS_DELETE}>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(row.original)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </PermissionGate>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

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
