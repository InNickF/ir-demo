import { useIsomorphicLayoutEffect } from "@/commons/hooks/useIsomorphicLayoutEffect";
import { useState } from "react";

export const useLoanTableHeight = () => {
  const [height, setHeight] = useState<number | null>(0);

  useIsomorphicLayoutEffect(() => {
    const setLoanTableHeight = () => {
      const header = document.querySelector(`[data-header="loans-table-page"]`);
      if (!header) {
        setHeight(null);
        return;
      }
      const navbar = document.querySelector(".debt-navbar");
      const filters = document.querySelector(".debt-loans-filters-header");
      const navbarHeight = navbar?.clientHeight || 0;
      const headerHeight = header?.clientHeight || 0;
      const filtersHeight = filters?.clientHeight || 0;
      const viewportHeight = window.innerHeight;
      const mapHeight =
        viewportHeight - navbarHeight - headerHeight - filtersHeight - 50;

      setHeight(mapHeight);
    };

    window.addEventListener("resize", setLoanTableHeight);
    setLoanTableHeight();
    return () => {
      window.removeEventListener("resize", setLoanTableHeight);
    };
  }, []);

  return height;
};
