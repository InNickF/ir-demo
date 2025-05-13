import { useEffect, useRef, useState } from "react";

export const useIsMounted = (): boolean => {
  const [isMounted, setIsMounted] = useState(false);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      setIsMounted(true);
      mounted.current = true;
    }
  }, []);
  return isMounted;
};
