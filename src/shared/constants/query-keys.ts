export const queryKeys = {
  auth: {
    currentUser: ["auth", "current-user"] as const,
  },
  users: {
    all: ["users"] as const,
    lists: () => [...queryKeys.users.all, "list"] as const,
    list: (filters: object) => [...queryKeys.users.lists(), filters] as const,
    details: () => [...queryKeys.users.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
  repositories: {
    all: ["repositories"] as const,
    detail: (owner: string, repo: string) =>
      [...queryKeys.repositories.all, "detail", owner, repo] as const,
    contents: (owner: string, repo: string, path: string) =>
      [...queryKeys.repositories.all, "contents", owner, repo, path] as const,
    readme: (owner: string, repo: string, path: string) =>
      [...queryKeys.repositories.all, "readme", owner, repo, path] as const,
  },
} as const;
