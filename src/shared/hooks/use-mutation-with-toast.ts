import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { UseMutationResult } from "@tanstack/react-query";

interface UseMutationWithToastOptions {
  successMessage: string;
  errorMessage: string;
  redirectTo?: string;
  onSuccessCallback?: () => void;
}

export function useMutationWithToast<TData, TError, TVariables, TContext>(
  mutation: UseMutationResult<TData, TError, TVariables, TContext>,
  options: UseMutationWithToastOptions
) {
  const navigate = useNavigate();

  const mutateWithToast = useCallback(
    (variables: TVariables) => {
      mutation.mutate(variables, {
        onSuccess: () => {
          toast.success(options.successMessage);
          options.onSuccessCallback?.();
          if (options.redirectTo) {
            navigate(options.redirectTo);
          }
        },
        onError: () => {
          toast.error(options.errorMessage);
        },
      });
    },
    [mutation, options, navigate]
  );

  return { mutateWithToast, isPending: mutation.isPending };
}
