import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { Role } from "@/shared/types";
import { mockDb } from "./data";

interface MockResponse {
  status: number;
  data: unknown;
}

function delay(ms = 300): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function matchRoute(
  url: string,
  method: string,
  pattern: string,
  targetMethod: string
): Record<string, string> | null {
  if (method.toLowerCase() !== targetMethod.toLowerCase()) return null;

  const patternParts = pattern.split("/");
  const urlParts = url.split("?")[0].split("/");

  if (patternParts.length !== urlParts.length) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(":")) {
      params[patternParts[i].slice(1)] = urlParts[i];
    } else if (patternParts[i] !== urlParts[i]) {
      return null;
    }
  }
  return params;
}

function getSearchParams(url: string): URLSearchParams {
  const qIndex = url.indexOf("?");
  if (qIndex === -1) return new URLSearchParams();
  return new URLSearchParams(url.slice(qIndex + 1));
}

function handleRequest(
  url: string,
  method: string,
  body: unknown
): MockResponse | null {
  // Auth: login
  if (matchRoute(url, method, "/auth/login", "post")) {
    const { email, password } = body as { email: string; password: string };
    const users = mockDb.getUsers();
    const user = users.find((u) => u.email === email);

    if (!user || password !== mockDb.DEFAULT_PASSWORD) {
      return {
        status: 401,
        data: { message: "Invalid email or password", statusCode: 401 },
      };
    }

    const authUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    mockDb.setCurrentUser(authUser);

    return {
      status: 200,
      data: {
        data: {
          user: authUser,
          tokens: {
            accessToken: "mock-access-token-" + user.id,
            refreshToken: "mock-refresh-token-" + user.id,
          },
        },
      },
    };
  }

  // Auth: register
  if (matchRoute(url, method, "/auth/register", "post")) {
    const { name, email, password } = body as {
      name: string;
      email: string;
      password: string;
    };
    const users = mockDb.getUsers();

    if (users.find((u) => u.email === email)) {
      return {
        status: 409,
        data: { message: "Email already in use", statusCode: 409 },
      };
    }

    if (password.length < 6) {
      return {
        status: 400,
        data: { message: "Password too short", statusCode: 400 },
      };
    }

    const newUser = {
      id: mockDb.generateId(),
      name,
      email,
      role: Role.VIEWER,
      status: "active" as const,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    mockDb.saveUsers(users);

    const authUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
    mockDb.setCurrentUser(authUser);

    return {
      status: 200,
      data: {
        data: {
          user: authUser,
          tokens: {
            accessToken: "mock-access-token-" + newUser.id,
            refreshToken: "mock-refresh-token-" + newUser.id,
          },
        },
      },
    };
  }

  // Auth: me
  if (matchRoute(url, method, "/auth/me", "get")) {
    const currentUser = mockDb.getCurrentUser();
    if (!currentUser) {
      return {
        status: 401,
        data: { message: "Not authenticated", statusCode: 401 },
      };
    }
    return { status: 200, data: { data: currentUser } };
  }

  // Auth: logout
  if (matchRoute(url, method, "/auth/logout", "post")) {
    mockDb.setCurrentUser(null);
    return { status: 200, data: { data: null } };
  }

  // Auth: refresh
  if (matchRoute(url, method, "/auth/refresh", "post")) {
    const currentUser = mockDb.getCurrentUser();
    if (!currentUser) {
      return {
        status: 401,
        data: { message: "Invalid refresh token", statusCode: 401 },
      };
    }
    return {
      status: 200,
      data: {
        data: {
          accessToken: "mock-access-token-refreshed-" + currentUser.id,
          refreshToken: "mock-refresh-token-refreshed-" + currentUser.id,
        },
      },
    };
  }

  // Users: list
  if (matchRoute(url, method, "/users", "get")) {
    const params = getSearchParams(url);
    const search = params.get("search")?.toLowerCase() || "";
    const role = params.get("role") || "";
    const page = parseInt(params.get("page") || "1");
    const perPage = parseInt(params.get("perPage") || "10");

    let users = mockDb.getUsers();

    if (search) {
      users = users.filter(
        (u) =>
          u.name.toLowerCase().includes(search) ||
          u.email.toLowerCase().includes(search)
      );
    }
    if (role) {
      users = users.filter((u) => u.role === role);
    }

    const total = users.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const start = (page - 1) * perPage;
    const paged = users.slice(start, start + perPage);

    return {
      status: 200,
      data: {
        data: paged,
        meta: { page, perPage, total, totalPages },
      },
    };
  }

  // Users: get single
  const getParams = matchRoute(url, method, "/users/:id", "get");
  if (getParams) {
    const user = mockDb.getUsers().find((u) => u.id === getParams.id);
    if (!user) {
      return {
        status: 404,
        data: { message: "User not found", statusCode: 404 },
      };
    }
    return { status: 200, data: { data: user } };
  }

  // Users: create
  if (matchRoute(url, method, "/users", "post")) {
    const { name, email, role } = body as {
      name: string;
      email: string;
      password: string;
      role: Role;
    };
    const users = mockDb.getUsers();

    if (users.find((u) => u.email === email)) {
      return {
        status: 409,
        data: { message: "Email already in use", statusCode: 409 },
      };
    }

    const newUser = {
      id: mockDb.generateId(),
      name,
      email,
      role,
      status: "active" as const,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    mockDb.saveUsers(users);

    return { status: 201, data: { data: newUser } };
  }

  // Users: update
  const patchParams = matchRoute(url, method, "/users/:id", "patch");
  if (patchParams) {
    const users = mockDb.getUsers();
    const index = users.findIndex((u) => u.id === patchParams.id);
    if (index === -1) {
      return {
        status: 404,
        data: { message: "User not found", statusCode: 404 },
      };
    }
    const updates = body as Record<string, unknown>;
    users[index] = { ...users[index], ...updates };
    mockDb.saveUsers(users);
    return { status: 200, data: { data: users[index] } };
  }

  // Users: delete
  const deleteParams = matchRoute(url, method, "/users/:id", "delete");
  if (deleteParams) {
    const users = mockDb.getUsers();
    const index = users.findIndex((u) => u.id === deleteParams.id);
    if (index === -1) {
      return {
        status: 404,
        data: { message: "User not found", statusCode: 404 },
      };
    }
    users.splice(index, 1);
    mockDb.saveUsers(users);
    return { status: 200, data: { data: null } };
  }

  return null;
}

export function setupMockInterceptor(axiosInstance: AxiosInstance): void {
  axiosInstance.interceptors.request.use(async (config) => {
    const baseURL = config.baseURL || "";
    const url = config.url || "";
    const fullPath = url.startsWith("http") ? url : url;
    const method = config.method || "get";

    // Strip the baseURL prefix if present to get the relative path
    const relativePath = fullPath.startsWith(baseURL)
      ? fullPath.slice(baseURL.length)
      : fullPath;

    const result = handleRequest(relativePath, method, config.data ? (typeof config.data === "string" ? JSON.parse(config.data) : config.data) : undefined);

    if (result) {
      await delay();

      if (result.status >= 400) {
        const error = {
          response: {
            status: result.status,
            data: result.data,
          },
          config,
          isAxiosError: true,
        };
        return Promise.reject(error);
      }

      // Return an adapter override that resolves with the mock data
      (config as InternalAxiosRequestConfig & { _mockResponse?: MockResponse })._mockResponse = result;
      config.adapter = () =>
        Promise.resolve({
          data: result.data,
          status: result.status,
          statusText: "OK",
          headers: {},
          config,
        });
    }

    return config;
  });
}
