import { AxiosError } from "axios";
import { useRouter } from "next/router";

interface UseRedirectOn404Params {
  redirectPath: string;
  additionalErrorCodes?: number[];
}
type RedirectOn404ErrorFn = (error: unknown) => void;

export const useRedirectOn404 = ({
  redirectPath,
  additionalErrorCodes = [],
}: UseRedirectOn404Params): RedirectOn404ErrorFn => {
  const router = useRouter();
  const errorCodes = [404, 403, 401, 400, ...additionalErrorCodes];
  return (error) => {
    const isAxiosError = error instanceof AxiosError;
    if (!isAxiosError) return;
    if (errorCodes?.includes(error.response?.status)) {
      router.push(redirectPath || "/404");
    }
  };
};
