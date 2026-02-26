import { api } from "@/shared/lib/axios";
import type { ApiResponse } from "@/shared/types/api";
import type {
  AuthResponse,
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from "./types";

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await api.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    data
  );
  return response.data.data;
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await api.post<ApiResponse<AuthResponse>>(
    "/auth/register",
    data
  );
  return response.data.data;
}

export async function getCurrentUser(): Promise<AuthUser> {
  const response = await api.get<ApiResponse<AuthUser>>("/auth/me");
  return response.data.data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function refreshToken(
  token: string
): Promise<{ accessToken: string; refreshToken: string }> {
  const response = await api.post<
    ApiResponse<{ accessToken: string; refreshToken: string }>
  >("/auth/refresh", { refreshToken: token });
  return response.data.data;
}
