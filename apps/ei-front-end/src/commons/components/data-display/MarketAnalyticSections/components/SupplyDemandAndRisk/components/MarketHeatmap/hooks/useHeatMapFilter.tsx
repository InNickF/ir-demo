import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

const HeatmapFilters = ["boundaries", "warehouses"] as const;
export type HeatmapFilters = typeof HeatmapFilters[number];

interface UseHeatmapFilterArgs {
  onChange?: () => void;
}
export const useHeatmapFilter = (
  { onChange }: UseHeatmapFilterArgs = { onChange: null }
) => {
  const [heatmapFilter, setHeatmapFilter] = useState<HeatmapFilters>(
    HeatmapFilters[0]
  );

  const setHeatmap = (key: HeatmapFilters) => {
    setHeatmapFilter(key);
    onChange?.();
  };

  const heatmapFilterItems: ButtonGroupItem[] = [
    {
      key: "boundaries",
      text: "Boundaries",
      onClick: (key) => setHeatmap(key as HeatmapFilters),
    },
    {
      key: "warehouses",
      text: "Warehouses",
      onClick: (key) => setHeatmap(key as HeatmapFilters),
    },
  ];

  const boundariesMapClasses =
    heatmapFilter === "boundaries"
      ? "generic-entrance-animation"
      : "generic-entrance-animation hidden";

  const warehousesMapClasses =
    heatmapFilter === "warehouses"
      ? "generic-entrance-animation"
      : "generic-entrance-animation hidden";

  return {
    heatmapFilter,
    heatmapFilterItems,
    boundariesMapClasses,
    warehousesMapClasses,
  };
};
