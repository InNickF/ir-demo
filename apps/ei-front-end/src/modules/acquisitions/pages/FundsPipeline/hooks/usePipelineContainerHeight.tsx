import { useIsomorphicLayoutEffect } from "@/commons/hooks/useIsomorphicLayoutEffect";
import { useState } from "react";

export const usePipelineContainerHeight = () => {
  const [pipelineHeight, setPipelineHeight] = useState<number | "90vh">(0);

  useIsomorphicLayoutEffect(() => {
    const setPipelineContainerHeight = () => {
      const header = document.querySelector(".acq-funds-overview-header");
      const filters = document.querySelector(".acq-funds-pipeline-filters");
      const navbar = document.querySelector(".acq-navbar");
      const navbarHeight = navbar?.clientHeight || 0;
      const headerHeight = header?.clientHeight || 0;
      const filtersHeight = filters?.clientHeight || 0;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const gridHeight =
        viewportHeight - navbarHeight - headerHeight - filtersHeight - 35;

      const isViewportWidthSmall = viewportWidth < 500;
      const isGridHeightSmall = gridHeight < 200;
      setPipelineHeight(
        isViewportWidthSmall || isGridHeightSmall ? "90vh" : gridHeight
      );
    };

    window.addEventListener("resize", setPipelineContainerHeight);
    setPipelineContainerHeight();
    return () => {
      window.removeEventListener("resize", setPipelineContainerHeight);
    };
  }, []);

  return pipelineHeight;
};
