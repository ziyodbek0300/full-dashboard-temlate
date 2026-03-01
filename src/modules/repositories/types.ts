export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  default_branch: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  topics: string[];
  updated_at: string;
}

export interface GitHubContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  type: "file" | "dir" | "symlink" | "submodule";
  download_url: string | null;
  html_url: string;
}

export interface GitHubFileContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  type: "file";
  content: string;
  encoding: "base64";
  download_url: string | null;
  html_url: string;
}

export interface SavedRepository {
  owner: string;
  repo: string;
  addedAt: string;
}

export interface GitHubRateLimit {
  limit: number;
  remaining: number;
  reset: number;
}

export type PathContent =
  | { type: "dir"; contents: GitHubContent[] }
  | { type: "file"; file: GitHubFileContent };
