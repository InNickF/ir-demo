import { useRouter } from "next/router";
import { getTokensFromStorage } from "../utils/jwt";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export interface useRedirectIfHasSessionProps {
  beforeRedirect?: () => void;
  onNoRedirection?: () => void;
}

export const useRedirectIfHasSession = ({
  beforeRedirect,
  onNoRedirection,
}: useRedirectIfHasSessionProps) => {
  const router = useRouter();

  useIsomorphicLayoutEffect(() => {
    const token = getTokensFromStorage();
    if (token.access) {
      beforeRedirect && beforeRedirect();
      router.push("/");
    } else {
      onNoRedirection && onNoRedirection();
    }
  }, []);
};
