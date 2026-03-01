import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/constants/query-keys";
import * as authApi from "./api";
import type { LoginRequest, RegisterRequest } from "./types";

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.currentUser,
    queryFn: authApi.getCurrentUser,
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      localStorage.setItem("access_token", response.tokens.accessToken);
      localStorage.setItem("refresh_token", response.tokens.refreshToken);
      queryClient.setQueryData(queryKeys.auth.currentUser, response.user);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      localStorage.setItem("access_token", response.tokens.accessToken);
      localStorage.setItem("refresh_token", response.tokens.refreshToken);
      queryClient.setQueryData(queryKeys.auth.currentUser, response.user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      queryClient.setQueryData(queryKeys.auth.currentUser, null);
      queryClient.removeQueries({
        predicate: (query) => query.queryKey !== queryKeys.auth.currentUser,
      });
    },
  });
}
