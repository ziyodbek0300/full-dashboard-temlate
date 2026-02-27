import { Link } from "react-router-dom";
import { LoginForm } from "../components/login-form";
import { ROUTES } from "@/shared/constants/routes";

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Enter your credentials to sign in
          </p>
        </div>
        <LoginForm />
        <div className="rounded-md border bg-muted/50 p-3 text-sm">
          <p className="mb-2 font-medium">Demo Credentials</p>
          <div className="space-y-1 text-muted-foreground">
            <p>
              <span className="font-mono">alice@example.com</span> / password{" "}
              <span className="text-xs">(Admin)</span>
            </p>
            <p>
              <span className="font-mono">bob@example.com</span> / password{" "}
              <span className="text-xs">(Manager)</span>
            </p>
            <p>
              <span className="font-mono">carol@example.com</span> / password{" "}
              <span className="text-xs">(Viewer)</span>
            </p>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            to={ROUTES.REGISTER}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
