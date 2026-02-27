import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SavedRepository } from "./types";

interface RepositoryStore {
  repositories: SavedRepository[];
  addRepository: (owner: string, repo: string) => void;
  removeRepository: (owner: string, repo: string) => void;
  hasRepository: (owner: string, repo: string) => boolean;
}

export const useRepositoryStore = create<RepositoryStore>()(
  persist(
    (set, get) => ({
      repositories: [],
      addRepository: (owner, repo) => {
        const existing = get().repositories;
        if (existing.some((r) => r.owner === owner && r.repo === repo)) return;
        set({
          repositories: [
            ...existing,
            { owner, repo, addedAt: new Date().toISOString() },
          ],
        });
      },
      removeRepository: (owner, repo) => {
        set({
          repositories: get().repositories.filter(
            (r) => !(r.owner === owner && r.repo === repo)
          ),
        });
      },
      hasRepository: (owner, repo) => {
        return get().repositories.some(
          (r) => r.owner === owner && r.repo === repo
        );
      },
    }),
    { name: "repository-store" }
  )
);
