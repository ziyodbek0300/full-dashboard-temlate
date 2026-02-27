export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  APP: "/app",
  USERS: "/app/users",
  USER_CREATE: "/app/users/new",
  USER_DETAIL: (id: string): string => `/app/users/${id}`,
  USER_EDIT: (id: string): string => `/app/users/${id}/edit`,
  SETTINGS: "/app/settings",
  REPOSITORIES: "/app/repositories",
  REPOSITORY_BROWSER: (owner: string, repo: string, path?: string): string =>
    path
      ? `/app/repositories/${owner}/${repo}/tree/${path}`
      : `/app/repositories/${owner}/${repo}`,
  REPOSITORY_FILE: (owner: string, repo: string, path: string): string =>
    `/app/repositories/${owner}/${repo}/blob/${path}`,
} as const;
