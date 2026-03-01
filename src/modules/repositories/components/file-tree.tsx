import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { ROUTES } from "@/shared/constants/routes";
import { useContents } from "../hooks";
import { FileIcon } from "./file-icon";
import type { GitHubContent } from "../types";

function sortContents(contents: GitHubContent[]): GitHubContent[] {
  return [...contents].sort((a, b) => {
    if (a.type === "dir" && b.type !== "dir") return -1;
    if (a.type !== "dir" && b.type === "dir") return 1;
    return a.name.localeCompare(b.name);
  });
}

interface TreeNodeProps {
  item: GitHubContent;
  owner: string;
  repo: string;
  activePath: string;
  depth: number;
}

function TreeNode({ item, owner, repo, activePath, depth }: TreeNodeProps) {
  const isActive = activePath === item.path;
  const isParentOfActive = activePath.startsWith(item.path + "/");
  const [expanded, setExpanded] = useState(isParentOfActive);

  if (item.type === "dir") {
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "flex w-full items-center gap-1 rounded-sm px-2 py-1 text-left text-sm hover:bg-accent",
            isActive && "bg-accent font-medium"
          )}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          <ChevronRight
            className={cn(
              "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform",
              expanded && "rotate-90"
            )}
          />
          <FileIcon
            name={item.name}
            type="dir"
            className="h-4 w-4 shrink-0 text-muted-foreground"
          />
          <span className="truncate">{item.name}</span>
        </button>
        {expanded && (
          <TreeDirectory
            owner={owner}
            repo={repo}
            path={item.path}
            activePath={activePath}
            depth={depth + 1}
          />
        )}
      </div>
    );
  }

  return (
    <Link
      to={ROUTES.REPOSITORY_PATH(owner, repo, item.path)}
      className={cn(
        "flex items-center gap-1 rounded-sm px-2 py-1 text-sm hover:bg-accent",
        isActive && "bg-accent font-medium"
      )}
      style={{ paddingLeft: `${depth * 12 + 22}px` }}
    >
      <FileIcon
        name={item.name}
        type="file"
        className="h-4 w-4 shrink-0 text-muted-foreground"
      />
      <span className="truncate">{item.name}</span>
    </Link>
  );
}

interface TreeDirectoryProps {
  owner: string;
  repo: string;
  path: string;
  activePath: string;
  depth: number;
}

function TreeDirectory({
  owner,
  repo,
  path,
  activePath,
  depth,
}: TreeDirectoryProps) {
  const { data, isLoading } = useContents(owner, repo, path);

  if (isLoading) {
    return (
      <div
        className="py-1 text-xs text-muted-foreground"
        style={{ paddingLeft: `${depth * 12 + 22}px` }}
      >
        Loading...
      </div>
    );
  }

  if (!data) return null;

  const sorted = sortContents(data);

  return (
    <div>
      {sorted.map((item) => (
        <TreeNode
          key={item.sha}
          item={item}
          owner={owner}
          repo={repo}
          activePath={activePath}
          depth={depth}
        />
      ))}
    </div>
  );
}

interface FileTreeProps {
  owner: string;
  repo: string;
  activePath: string;
}

export function FileTree({ owner, repo, activePath }: FileTreeProps) {
  return (
    <div className="overflow-y-auto py-1">
      <TreeDirectory
        owner={owner}
        repo={repo}
        path=""
        activePath={activePath}
        depth={0}
      />
    </div>
  );
}
