import axios from "axios";
import type {
  GitHubRepository,
  GitHubContent,
  GitHubFileContent,
  GitHubRateLimit,
} from "./types";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

const token = import.meta.env.VITE_GITHUB_TOKEN;
if (token) {
  githubApi.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export async function getRepository(
  owner: string,
  repo: string
): Promise<GitHubRepository> {
  const response = await githubApi.get<GitHubRepository>(
    `/repos/${owner}/${repo}`
  );
  return response.data;
}

export async function getContents(
  owner: string,
  repo: string,
  path = ""
): Promise<GitHubContent[]> {
  const response = await githubApi.get<GitHubContent[]>(
    `/repos/${owner}/${repo}/contents/${path}`
  );
  return response.data;
}

export async function getFileContent(
  owner: string,
  repo: string,
  path: string
): Promise<GitHubFileContent> {
  const response = await githubApi.get<GitHubFileContent>(
    `/repos/${owner}/${repo}/contents/${path}`
  );
  return response.data;
}

export async function getReadme(
  owner: string,
  repo: string,
  path = ""
): Promise<string | null> {
  try {
    const endpoint = path
      ? `/repos/${owner}/${repo}/readme/${path}`
      : `/repos/${owner}/${repo}/readme`;
    const response = await githubApi.get<{ content: string }>(endpoint);
    return atob(response.data.content);
  } catch {
    return null;
  }
}

export async function getRateLimit(): Promise<GitHubRateLimit> {
  const response = await githubApi.get<{
    resources: { core: GitHubRateLimit };
  }>("/rate_limit");
  return response.data.resources.core;
}
