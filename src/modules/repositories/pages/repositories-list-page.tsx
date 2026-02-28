import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Search } from "lucide-react";
import { useRepositoryStore } from "../store";
import { AddRepoDialog } from "../components/add-repo-dialog";
import { RepoCard } from "../components/repo-card";
import { RateLimitBanner } from "../components/rate-limit-banner";

export function RepositoriesListPage() {
  const repositories = useRepositoryStore((s) => s.repositories);
  const [search, setSearch] = useState("");

  const filtered = repositories.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.owner.toLowerCase().includes(q) || r.repo.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Source Code</h1>
          <p className="text-muted-foreground">
            Browse public GitHub repositories
          </p>
        </div>
        <AddRepoDialog />
      </div>

      <RateLimitBanner />

      {repositories.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search repositories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      {filtered.length === 0 && repositories.length === 0 && (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-2 text-center">
          <p className="text-lg font-medium">No repositories yet</p>
          <p className="text-muted-foreground">
            Add a public GitHub repository to get started.
          </p>
        </div>
      )}

      {filtered.length === 0 && repositories.length > 0 && (
        <div className="flex min-h-[200px] items-center justify-center">
          <p className="text-muted-foreground">
            No repositories match &quot;{search}&quot;
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <RepoCard
            key={`${r.owner}/${r.repo}`}
            owner={r.owner}
            repo={r.repo}
          />
        ))}
      </div>
    </div>
  );
}
