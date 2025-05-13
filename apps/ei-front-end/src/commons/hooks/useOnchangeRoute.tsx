import { useEffect } from "react";
import { useRouter } from "next/router";

export const useOnChangeRoute = (callback: () => void) => {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeComplete", callback);
    return () => {
      router.events.off("routeChangeComplete", callback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
