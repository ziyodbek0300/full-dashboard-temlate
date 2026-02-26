export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  APP: "/app",
  USERS: "/app/users",
  USER_CREATE: "/app/users/new",
  USER_DETAIL: (id: string): string => `/app/users/${id}`,
  USER_EDIT: (id: string): string => `/app/users/${id}/edit`,
  SETTINGS: "/app/settings",
} as const;
