import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { setAppContextAtom } from "../store/jotai/app-context";
import { getCurrentModuleAndPage } from "../model-in/configs/utils";

export const useAutoSetAppContext = () => {
  const router = useRouter();
  const [, setAppContext] = useAtom(setAppContextAtom);

  useEffect(() => {
    // Set initial state when the app mounts
    setAppContext(getCurrentModuleAndPage());

    // Listen for route changes
    const handleRouteChange = () => {
      setAppContext(getCurrentModuleAndPage());
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // Cleanup
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, setAppContext]);
};
