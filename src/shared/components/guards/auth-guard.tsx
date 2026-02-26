import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/modules/auth/context";
import { ROUTES } from "@/shared/constants/routes";
import { FullscreenSpinner } from "@/shared/components/fullscreen-spinner";

export function AuthGuard() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <FullscreenSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}
