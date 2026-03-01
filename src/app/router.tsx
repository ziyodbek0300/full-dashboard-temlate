import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, useRouteError } from "react-router-dom";
import { AuthGuard } from "@/shared/components/guards/auth-guard";
import { PublicGuard } from "@/shared/components/guards/public-guard";
import { AppLayout } from "@/shared/components/layout/app-layout";
import { FullscreenSpinner } from "@/shared/components/fullscreen-spinner";
import { ROUTES } from "@/shared/constants/routes";
import { Button } from "@/shared/components/ui/button";

const LoginPage = lazy(() =>
  import("@/modules/auth/pages/login-page").then((m) => ({
    default: m.LoginPage,
  }))
);
const RegisterPage = lazy(() =>
  import("@/modules/auth/pages/register-page").then((m) => ({
    default: m.RegisterPage,
  }))
);
const UsersListPage = lazy(() =>
  import("@/modules/users/pages/users-list-page").then((m) => ({
    default: m.UsersListPage,
  }))
);
const UserDetailPage = lazy(() =>
  import("@/modules/users/pages/user-detail-page").then((m) => ({
    default: m.UserDetailPage,
  }))
);
const UserCreatePage = lazy(() =>
  import("@/modules/users/pages/user-create-page").then((m) => ({
    default: m.UserCreatePage,
  }))
);
const UserEditPage = lazy(() =>
  import("@/modules/users/pages/user-edit-page").then((m) => ({
    default: m.UserEditPage,
  }))
);
const SettingsPage = lazy(() =>
  import("@/modules/settings/pages/settings-page").then((m) => ({
    default: m.SettingsPage,
  }))
);
const RepositoriesListPage = lazy(() =>
  import("@/modules/repositories/pages/repositories-list-page").then((m) => ({
    default: m.RepositoriesListPage,
  }))
);
const RepositoryBrowserPage = lazy(() =>
  import("@/modules/repositories/pages/repository-browser-page").then((m) => ({
    default: m.RepositoryBrowserPage,
  }))
);

function RouteErrorFallback() {
  const error = useRouteError();
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-muted-foreground">
        {error instanceof Error
          ? error.message
          : "An unexpected error occurred"}
      </p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Try again
      </Button>
    </div>
  );
}

function LazyLoad({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<FullscreenSpinner className="min-h-[400px]" />}>
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
  {
    element: <PublicGuard />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: (
          <LazyLoad>
            <LoginPage />
          </LazyLoad>
        ),
      },
      {
        path: ROUTES.REGISTER,
        element: (
          <LazyLoad>
            <RegisterPage />
          </LazyLoad>
        ),
      },
    ],
  },
  {
    element: <AuthGuard />,
    children: [
      {
        element: <AppLayout />,
        errorElement: <RouteErrorFallback />,
        children: [
          {
            path: ROUTES.APP,
            element: <Navigate to={ROUTES.USERS} replace />,
          },
          {
            path: ROUTES.USERS,
            element: (
              <LazyLoad>
                <UsersListPage />
              </LazyLoad>
            ),
          },
          {
            path: ROUTES.USER_CREATE,
            element: (
              <LazyLoad>
                <UserCreatePage />
              </LazyLoad>
            ),
          },
          {
            path: "/app/users/:id",
            element: (
              <LazyLoad>
                <UserDetailPage />
              </LazyLoad>
            ),
          },
          {
            path: "/app/users/:id/edit",
            element: (
              <LazyLoad>
                <UserEditPage />
              </LazyLoad>
            ),
          },
          {
            path: ROUTES.SETTINGS,
            element: (
              <LazyLoad>
                <SettingsPage />
              </LazyLoad>
            ),
          },
          {
            path: ROUTES.REPOSITORIES,
            element: (
              <LazyLoad>
                <RepositoriesListPage />
              </LazyLoad>
            ),
          },
          {
            path: "/app/repositories/:owner/:repo/*",
            element: (
              <LazyLoad>
                <RepositoryBrowserPage />
              </LazyLoad>
            ),
          },
        ],
      },
    ],
  },
]);
