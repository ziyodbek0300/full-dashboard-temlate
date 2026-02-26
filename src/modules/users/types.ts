import { Role } from "@/shared/types";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "active" | "inactive";
  createdAt: string;
  avatarUrl?: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: Role;
  status?: "active" | "inactive";
}

export interface UserFilters {
  search?: string;
  role?: Role;
  page?: number;
  perPage?: number;
}
