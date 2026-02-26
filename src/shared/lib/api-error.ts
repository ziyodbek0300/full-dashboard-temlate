import type { ApiErrorResponse } from "@/shared/types/api";

export class ApiError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;

  constructor(response: ApiErrorResponse) {
    super(response.message);
    this.name = "ApiError";
    this.statusCode = response.statusCode;
    this.errors = response.errors;
  }

  static fromAxiosError(error: unknown): ApiError {
    if (error instanceof ApiError) return error;

    const axiosError = error as {
      response?: { data?: ApiErrorResponse; status?: number };
      message?: string;
    };

    if (axiosError.response?.data) {
      return new ApiError({
        message: axiosError.response.data.message || "An error occurred",
        statusCode: axiosError.response.status || 500,
        errors: axiosError.response.data.errors,
      });
    }

    return new ApiError({
      message: axiosError.message || "Network error",
      statusCode: 0,
    });
  }
}
