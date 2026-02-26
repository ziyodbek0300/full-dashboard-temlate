import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useCurrentUser } from "./hooks";
import type { AuthUser } from "./types";
import { Permission, Role, ROLE_PERMISSIONS } from "@/shared/types";

interface AuthContextValue {
  user: AuthUser | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasRole: (role: Role) => boolean;
  hasPermission: (permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading, isError } = useCurrentUser();

  const value = useMemo<AuthContextValue>(() => {
    const isAuthenticated = !!user && !isError;
    return {
      user,
      isLoading,
      isAuthenticated,
      hasRole: (role: Role) => user?.role === role,
      hasPermission: (permission: Permission) => {
        if (!user) return false;
        const permissions = ROLE_PERMISSIONS[user.role];
        return permissions.includes(permission);
      },
    };
  }, [user, isLoading, isError]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
