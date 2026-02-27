import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";

interface RepoBreadcrumbsProps {
  owner: string;
  repo: string;
  path?: string;
  isFile?: boolean;
}

export function RepoBreadcrumbs({
  owner,
  repo,
  path,
  isFile,
}: RepoBreadcrumbsProps) {
  const segments = path ? path.split("/").filter(Boolean) : [];

  return (
    <nav className="flex items-center gap-1 text-sm">
      <Link
        to={ROUTES.REPOSITORIES}
        className="text-muted-foreground hover:text-foreground"
      >
        Repositories
      </Link>
      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
      <Link
        to={ROUTES.REPOSITORY_BROWSER(owner, repo)}
        className="font-semibold text-foreground hover:underline"
      >
        {owner}/{repo}
      </Link>
      {segments.map((segment, i) => {
        const isLast = i === segments.length - 1;
        const segmentPath = segments.slice(0, i + 1).join("/");

        return (
          <span key={segmentPath} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            {isLast ? (
              <span className="font-medium text-foreground">{segment}</span>
            ) : (
              <Link
                to={
                  isFile && isLast
                    ? ROUTES.REPOSITORY_FILE(owner, repo, segmentPath)
                    : ROUTES.REPOSITORY_BROWSER(owner, repo, segmentPath)
                }
                className="text-muted-foreground hover:text-foreground hover:underline"
              >
                {segment}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
