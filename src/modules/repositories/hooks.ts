import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/constants/query-keys";
import * as repoApi from "./api";

export function useRepository(owner: string, repo: string) {
  return useQuery({
    queryKey: queryKeys.repositories.detail(owner, repo),
    queryFn: () => repoApi.getRepository(owner, repo),
    enabled: !!owner && !!repo,
    staleTime: 10 * 60 * 1000,
  });
}

export function useContents(owner: string, repo: string, path = "") {
  return useQuery({
    queryKey: queryKeys.repositories.contents(owner, repo, path),
    queryFn: () => repoApi.getContents(owner, repo, path),
    enabled: !!owner && !!repo,
    staleTime: 5 * 60 * 1000,
  });
}

export function useFileContent(owner: string, repo: string, path: string) {
  return useQuery({
    queryKey: queryKeys.repositories.contents(owner, repo, path),
    queryFn: () => repoApi.getFileContent(owner, repo, path),
    enabled: !!owner && !!repo && !!path,
    staleTime: 5 * 60 * 1000,
  });
}

export function useReadme(owner: string, repo: string, path = "") {
  return useQuery({
    queryKey: queryKeys.repositories.readme(owner, repo, path),
    queryFn: () => repoApi.getReadme(owner, repo, path),
    enabled: !!owner && !!repo,
    staleTime: 10 * 60 * 1000,
  });
}

export function useRateLimit() {
  return useQuery({
    queryKey: ["github", "rate-limit"],
    queryFn: () => repoApi.getRateLimit(),
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });
}
