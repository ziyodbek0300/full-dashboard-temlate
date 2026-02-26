import { api } from "@/shared/lib/axios";
import type { ApiResponse, PaginatedResponse } from "@/shared/types/api";
import type { CreateUserDto, UpdateUserDto, User, UserFilters } from "./types";

export async function getUsers(
  filters: UserFilters = {}
): Promise<PaginatedResponse<User>> {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.role) params.set("role", filters.role);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.perPage) params.set("perPage", String(filters.perPage));

  const response = await api.get<PaginatedResponse<User>>(
    `/users?${params.toString()}`
  );
  return response.data;
}

export async function getUser(id: string): Promise<User> {
  const response = await api.get<ApiResponse<User>>(`/users/${id}`);
  return response.data.data;
}

export async function createUser(data: CreateUserDto): Promise<User> {
  const response = await api.post<ApiResponse<User>>("/users", data);
  return response.data.data;
}

export async function updateUser(
  id: string,
  data: UpdateUserDto
): Promise<User> {
  const response = await api.patch<ApiResponse<User>>(`/users/${id}`, data);
  return response.data.data;
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/users/${id}`);
}
