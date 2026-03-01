import { useParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { FullscreenSpinner } from "@/shared/components/fullscreen-spinner";
import { Button } from "@/shared/components/ui/button";
import { useFileContent } from "../hooks";
import { RepoBreadcrumbs } from "../components/repo-breadcrumbs";
import { FileViewer } from "../components/file-viewer";
import { RateLimitBanner } from "../components/rate-limit-banner";

export function RepositoryFilePage() {
  const { owner = "", repo = "", "*": splat = "" } = useParams();
  const path = splat;

  const { data, isLoading, isError } = useFileContent(owner, repo, path);

  if (isLoading) {
    return <FullscreenSpinner className="min-h-[400px]" />;
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-2">
        <p className="text-lg font-medium">Failed to load file</p>
        <p className="text-muted-foreground">
          The file may not exist or the rate limit has been reached.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <RateLimitBanner />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <RepoBreadcrumbs owner={owner} repo={repo} path={path} isFile />
        <Button variant="outline" size="sm" className="self-start" asChild>
          <a href={data.html_url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-1 h-3.5 w-3.5" />
            View on GitHub
          </a>
        </Button>
      </div>

      <FileViewer
        filename={data.name}
        content={data.content}
        size={data.size}
        downloadUrl={data.download_url}
      />
    </div>
  );
}
