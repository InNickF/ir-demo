import { useIsomorphicLayoutEffect } from "@/commons/hooks/useIsomorphicLayoutEffect";
import { useState } from "react";

export const useSmartsheetTableHeight = () => {
  const [height, setHeight] = useState<number | null>(0);

  useIsomorphicLayoutEffect(() => {
    const setDealsSmartsheetTableHeight = () => {
      const header = document.querySelector(`[data-header="deals-table-page"]`);
      if (!header) {
        setHeight(null);
        return;
      }
      const navbar = document.querySelector(".acq-navbar");
      const filters = document.querySelector(".acq-deals-filters-header");
      const navbarHeight = navbar?.clientHeight || 0;
      const headerHeight = header?.clientHeight || 0;
      const filtersHeight = filters?.clientHeight || 0;
      const viewportHeight = window.innerHeight;
      const mapHeight =
        viewportHeight - navbarHeight - headerHeight - filtersHeight - 20;

      setHeight(mapHeight);
    };

    window.addEventListener("resize", setDealsSmartsheetTableHeight);
    setDealsSmartsheetTableHeight();
    return () => {
      window.removeEventListener("resize", setDealsSmartsheetTableHeight);
    };
  }, []);

  return height;
};
