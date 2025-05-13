import { useIsomorphicLayoutEffect } from "@/commons/hooks/useIsomorphicLayoutEffect";
import { useState } from "react";

export const useCompsFinderMapHeight = () => {
  const [height, setHeight] = useState<number | null>(0);

  useIsomorphicLayoutEffect(() => {
    const setCompsFinderMapHeight = () => {
      const header = document.querySelector("[data-header='comps-finder']");
      if (!header) {
        setHeight(null);
        return;
      }
      const navbar = document.querySelector(".acq-navbar");
      const navbarHeight = navbar?.clientHeight || 0;
      const headerHeight = header?.clientHeight || 0;
      const viewportHeight = window.innerHeight;
      const loadingLineHeight = 2;
      const mapHeight =
        viewportHeight - navbarHeight - headerHeight - loadingLineHeight;

      setHeight(mapHeight);
    };

    window.addEventListener("resize", setCompsFinderMapHeight);
    setCompsFinderMapHeight();
    return () => {
      window.removeEventListener("resize", setCompsFinderMapHeight);
    };
  }, []);

  return height;
};
