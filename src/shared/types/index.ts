export enum Role {
  ADMIN = "admin",
  MANAGER = "manager",
  VIEWER = "viewer",
}

export enum Permission {
  USERS_READ = "users:read",
  USERS_CREATE = "users:create",
  USERS_UPDATE = "users:update",
  USERS_DELETE = "users:delete",
  SETTINGS_READ = "settings:read",
  SETTINGS_UPDATE = "settings:update",
}

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.ADMIN]: Object.values(Permission),
  [Role.MANAGER]: [
    Permission.USERS_READ,
    Permission.USERS_CREATE,
    Permission.USERS_UPDATE,
    Permission.SETTINGS_READ,
  ],
  [Role.VIEWER]: [Permission.USERS_READ, Permission.SETTINGS_READ],
};
