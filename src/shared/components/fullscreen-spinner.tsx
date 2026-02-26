import { cn } from "@/shared/lib/utils";

interface FullscreenSpinnerProps {
  className?: string;
}

export function FullscreenSpinner({ className }: FullscreenSpinnerProps) {
  return (
    <div
      className={cn("flex min-h-screen items-center justify-center", className)}
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}
