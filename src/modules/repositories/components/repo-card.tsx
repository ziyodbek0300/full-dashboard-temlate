import { Link } from "react-router-dom";
import { Star, GitFork, Circle, Trash2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { ROUTES } from "@/shared/constants/routes";
import { useRepository } from "../hooks";
import { useRepositoryStore } from "../store";

interface RepoCardProps {
  owner: string;
  repo: string;
}

export function RepoCard({ owner, repo }: RepoCardProps) {
  const { data, isLoading, isError } = useRepository(owner, repo);
  const removeRepository = useRepositoryStore((s) => s.removeRepository);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {owner}/{repo}
          </CardTitle>
          <CardDescription className="text-destructive">
            Failed to load repository info
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeRepository(owner, repo)}
          >
            <Trash2 className="mr-1 h-3.5 w-3.5" />
            Remove
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-1">
        <CardTitle className="text-base">
          <Link
            to={ROUTES.REPOSITORY_PATH(owner, repo)}
            className="hover:text-primary hover:underline"
          >
            {data.full_name}
          </Link>
        </CardTitle>
        {data.description && (
          <CardDescription className="line-clamp-2">
            {data.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {data.language && (
            <span className="flex items-center gap-1">
              <Circle className="h-3 w-3 fill-current" />
              {data.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5" />
            {data.stargazers_count.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-3.5 w-3.5" />
            {data.forks_count.toLocaleString()}
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => removeRepository(owner, repo)}
        >
          <Trash2 className="mr-1 h-3.5 w-3.5" />
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}
