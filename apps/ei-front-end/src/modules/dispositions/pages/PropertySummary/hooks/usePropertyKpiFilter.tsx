import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

const PropertyKpiFilters = ["LIQ", "PROJ"] as const;
type PropertyKpiFilters = typeof PropertyKpiFilters[number];

export const usePropertyKpiFilter = () => {
  const [propertyKpiFilter, setPropertyKpiFilter] =
    useState<PropertyKpiFilters>(PropertyKpiFilters[0]);
  const propertyKpiItems: ButtonGroupItem[] = [
    {
      key: "LIQ",
      text: "Latest Marks",
      size: "small",
      onClick: (key) => setPropertyKpiFilter(key as PropertyKpiFilters),
    },
    {
      key: "PROJ",
      text: "Projected Exit",
      size: "small",
      onClick: (key) => setPropertyKpiFilter(key as PropertyKpiFilters),
    },
  ];

  return {
    propertyKpiFilter,
    propertyKpiItems,
  };
};
