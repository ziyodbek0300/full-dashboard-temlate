import { AlertTriangle } from "lucide-react";
import { useRateLimit } from "../hooks";

export function RateLimitBanner() {
  const { data } = useRateLimit();

  if (!data || data.remaining > 10) return null;

  const resetDate = new Date(data.reset * 1000);
  const minutesUntilReset = Math.ceil(
    (resetDate.getTime() - Date.now()) / 60000
  );

  return (
    <div className="flex items-center gap-2 rounded-md border border-yellow-500/50 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-700 dark:text-yellow-400">
      <AlertTriangle className="h-4 w-4 shrink-0" />
      <span>
        GitHub API rate limit low: {data.remaining}/{data.limit} requests
        remaining. Resets in {minutesUntilReset} minute
        {minutesUntilReset === 1 ? "" : "s"}.
        {!import.meta.env.VITE_GITHUB_TOKEN &&
          " Add a VITE_GITHUB_TOKEN to increase the limit."}
      </span>
    </div>
  );
}
