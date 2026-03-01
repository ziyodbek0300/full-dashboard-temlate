import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Star,
  GitFork,
  ExternalLink,
  PanelLeftClose,
  PanelLeft,
  Loader2,
} from "lucide-react";
import { FullscreenSpinner } from "@/shared/components/fullscreen-spinner";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { useRepository, usePathContent, useReadme } from "../hooks";
import { RepoBreadcrumbs } from "../components/repo-breadcrumbs";
import { DirectoryListing } from "../components/directory-listing";
import { FileViewer } from "../components/file-viewer";
import { ReadmePreview } from "../components/readme-preview";
import { RateLimitBanner } from "../components/rate-limit-banner";
import { FileTree } from "../components/file-tree";

export function RepositoryBrowserPage() {
  const { owner = "", repo = "", "*": splat = "" } = useParams();
  const path = splat;
  const [treeOpen, setTreeOpen] = useState(false);

  const repoQuery = useRepository(owner, repo);
  const pathQuery = usePathContent(owner, repo, path);
  const isDir = pathQuery.data?.type === "dir";
  const readmeQuery = useReadme(owner, repo, isDir ? path : "");

  const isInitialLoad = pathQuery.isLoading && !pathQuery.data;
  const isSwitching = pathQuery.isFetching && !!pathQuery.data;

  if (isInitialLoad) {
    return <FullscreenSpinner className="min-h-[400px]" />;
  }

  if (pathQuery.isError && !pathQuery.data) {
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

  const data = pathQuery.data;

  return (
    <div className="space-y-4">
      <RateLimitBanner />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => setTreeOpen(!treeOpen)}
            title={treeOpen ? "Hide file tree" : "Show file tree"}
          >
            {treeOpen ? (
              <PanelLeftClose className="h-4 w-4" />
            ) : (
              <PanelLeft className="h-4 w-4" />
            )}
          </Button>
          <RepoBreadcrumbs owner={owner} repo={repo} path={path} />
          {isSwitching && (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {repoQuery.data && (
            <>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                {repoQuery.data.stargazers_count.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="h-4 w-4" />
                {repoQuery.data.forks_count.toLocaleString()}
              </span>
            </>
          )}
          {data?.type === "file" && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={data.file.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-1 h-3.5 w-3.5" />
                GitHub
              </a>
            </Button>
          )}
          {!path && repoQuery.data && (
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
          )}
        </div>
      </div>

      {!path && repoQuery.data?.description && (
        <p className="text-sm text-muted-foreground">
          {repoQuery.data.description}
        </p>
      )}

      <div className="flex gap-4">
        <div
          className={cn(
            "shrink-0 overflow-hidden rounded-md border bg-background transition-all duration-200",
            treeOpen ? "w-64" : "w-0 border-0"
          )}
        >
          {treeOpen && (
            <div className="h-[calc(100vh-16rem)] overflow-y-auto">
              <FileTree owner={owner} repo={repo} activePath={path} />
            </div>
          )}
        </div>

        <div className={cn("min-w-0 flex-1", isSwitching && "opacity-60")}>
          {data?.type === "dir" && (
            <DirectoryListing
              owner={owner}
              repo={repo}
              contents={data.contents}
            />
          )}

          {data?.type === "file" && (
            <FileViewer
              filename={data.file.name}
              content={data.file.content}
              size={data.file.size}
              downloadUrl={data.file.download_url}
            />
          )}
        </div>
      </div>

      {isDir && readmeQuery.data && (
        <ReadmePreview content={readmeQuery.data} />
      )}
    </div>
  );
}
