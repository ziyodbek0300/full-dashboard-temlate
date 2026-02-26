import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/modules/auth/context";
import { ROUTES } from "@/shared/constants/routes";
import type { Permission, Role } from "@/shared/types";

interface RoleGuardProps {
  role?: Role;
  permission?: Permission;
}

export function RoleGuard({ role, permission }: RoleGuardProps) {
  const { hasRole, hasPermission } = useAuth();

  if (role && !hasRole(role)) {
    return <Navigate to={ROUTES.USERS} replace />;
  }

  if (permission && !hasPermission(permission)) {
    return <Navigate to={ROUTES.USERS} replace />;
  }

  return <Outlet />;
}
