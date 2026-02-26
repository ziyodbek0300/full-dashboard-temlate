import type { ReactNode } from "react";
import { useAuth } from "@/modules/auth/context";
import type { Permission } from "@/shared/types";

interface PermissionGateProps {
  permission: Permission;
  fallback?: ReactNode;
  children: ReactNode;
}

export function PermissionGate({
  permission,
  fallback = null,
  children,
}: PermissionGateProps) {
  const { hasPermission } = useAuth();

  if (!hasPermission(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
