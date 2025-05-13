import { useEffect, useRef } from "react";

export const useAutoInitialFocusOnlyOnFirstRender = (
  autoInitialFocus: boolean
) => {
  const isFirstRender = useRef(true);
  const autoInitialFocusRef = useRef(autoInitialFocus);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      autoInitialFocusRef.current = true;
    }

    return () => {
      isFirstRender.current = true;
      autoInitialFocusRef.current = false;
    };
  }, []);

  return autoInitialFocusRef.current;
};
