import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/shared/components/ui/table";
import { FileIcon } from "./file-icon";
import type { GitHubContent } from "../types";

interface DirectoryListingProps {
  owner: string;
  repo: string;
  contents: GitHubContent[];
}

function sortContents(contents: GitHubContent[]): GitHubContent[] {
  return [...contents].sort((a, b) => {
    if (a.type === "dir" && b.type !== "dir") return -1;
    if (a.type !== "dir" && b.type === "dir") return 1;
    return a.name.localeCompare(b.name);
  });
}

function formatSize(bytes: number): string {
  if (bytes === 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DirectoryListing({
  owner,
  repo,
  contents,
}: DirectoryListingProps) {
  const sorted = sortContents(contents);

  return (
    <div className="rounded-md border">
      <Table>
        <TableBody>
          {sorted.map((item) => (
            <TableRow key={item.sha}>
              <TableCell className="w-8 py-2 pl-4 pr-0">
                <FileIcon
                  name={item.name}
                  type={item.type}
                  className="h-4 w-4 text-muted-foreground"
                />
              </TableCell>
              <TableCell className="py-2">
                <Link
                  to={ROUTES.REPOSITORY_PATH(owner, repo, item.path)}
                  className="hover:text-primary hover:underline"
                >
                  {item.name}
                </Link>
              </TableCell>
              <TableCell className="py-2 pr-4 text-right text-muted-foreground">
                {item.type === "file" ? formatSize(item.size) : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
