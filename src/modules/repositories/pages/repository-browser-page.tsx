import { useParams } from "react-router-dom";
import { FullscreenSpinner } from "@/shared/components/fullscreen-spinner";
import { useRepository, useContents, useReadme } from "../hooks";
import { RepoBreadcrumbs } from "../components/repo-breadcrumbs";
import { DirectoryListing } from "../components/directory-listing";
import { ReadmePreview } from "../components/readme-preview";
import { RateLimitBanner } from "../components/rate-limit-banner";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export function RepositoryBrowserPage() {
  const { owner = "", repo = "", "*": splat = "" } = useParams();
  const path = splat;

  const repoQuery = useRepository(owner, repo);
  const contentsQuery = useContents(owner, repo, path);
  const readmeQuery = useReadme(owner, repo, path);

  if (contentsQuery.isLoading) {
    return <FullscreenSpinner className="min-h-[400px]" />;
  }

  if (contentsQuery.isError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-2">
        <p className="text-lg font-medium">Failed to load contents</p>
        <p className="text-muted-foreground">
          The repository or path may not exist, or the rate limit has been
          reached.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <RateLimitBanner />

      <RepoBreadcrumbs owner={owner} repo={repo} path={path} />

      {!path && repoQuery.data && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          {repoQuery.data.description && (
            <p className="flex-1 text-sm text-muted-foreground">
              {repoQuery.data.description}
            </p>
          )}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              {repoQuery.data.stargazers_count.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-4 w-4" />
              {repoQuery.data.forks_count.toLocaleString()}
            </span>
            <Button variant="outline" size="sm" asChild>
              <a
                href={repoQuery.data.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-1 h-3.5 w-3.5" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      )}

      {contentsQuery.data && (
        <DirectoryListing
          owner={owner}
          repo={repo}
          contents={contentsQuery.data}
        />
      )}

      {readmeQuery.data && <ReadmePreview content={readmeQuery.data} />}
    </div>
  );
}
