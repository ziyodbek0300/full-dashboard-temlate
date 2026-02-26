import { Role } from "@/shared/types";
import type { User } from "@/modules/users/types";
import type { AuthUser } from "@/modules/auth/types";

const STORAGE_KEY = "mock_users";
const CURRENT_USER_KEY = "mock_current_user";

const DEFAULT_USERS: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: Role.ADMIN,
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: Role.MANAGER,
    status: "active",
    createdAt: "2024-02-20T14:30:00Z",
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol@example.com",
    role: Role.VIEWER,
    status: "active",
    createdAt: "2024-03-10T09:15:00Z",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david@example.com",
    role: Role.VIEWER,
    status: "inactive",
    createdAt: "2024-04-05T16:45:00Z",
  },
  {
    id: "5",
    name: "Eva Martinez",
    email: "eva@example.com",
    role: Role.MANAGER,
    status: "active",
    createdAt: "2024-05-12T11:20:00Z",
  },
  {
    id: "6",
    name: "Frank Lee",
    email: "frank@example.com",
    role: Role.VIEWER,
    status: "active",
    createdAt: "2024-06-18T08:00:00Z",
  },
  {
    id: "7",
    name: "Grace Kim",
    email: "grace@example.com",
    role: Role.ADMIN,
    status: "active",
    createdAt: "2024-07-22T13:10:00Z",
  },
  {
    id: "8",
    name: "Henry Chen",
    email: "henry@example.com",
    role: Role.VIEWER,
    status: "inactive",
    createdAt: "2024-08-30T15:30:00Z",
  },
];

const DEFAULT_PASSWORD = "password";

function getUsers(): User[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored) as User[];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
  return DEFAULT_USERS;
}

function saveUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function getCurrentUser(): AuthUser | null {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  if (stored) return JSON.parse(stored) as AuthUser;
  return null;
}

function setCurrentUser(user: AuthUser | null): void {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

let nextId = 100;

export const mockDb = {
  getUsers,
  saveUsers,
  getCurrentUser,
  setCurrentUser,
  DEFAULT_PASSWORD,
  generateId: (): string => String(nextId++),
};
