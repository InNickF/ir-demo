import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

const PortfolioMetricsFilters = ["LIQ", "PROJ"] as const;
type PortfolioMetricsFilters = typeof PortfolioMetricsFilters[number];

export const usePortfolioMetricsFilter = () => {
  const [PortfolioMetricsFilter, setPortfolioMetricsFilter] =
    useState<PortfolioMetricsFilters>(PortfolioMetricsFilters[0]);
  const PortfolioMetricsItems: ButtonGroupItem[] = [
    {
      key: "LIQ",
      text: "Latest Marks",
      size: "small",
      onClick: (key) =>
        setPortfolioMetricsFilter(key as PortfolioMetricsFilters),
    },
    {
      key: "PROJ",
      text: "Projected Exit",
      size: "small",
      onClick: (key) =>
        setPortfolioMetricsFilter(key as PortfolioMetricsFilters),
    },
  ];

  return {
    PortfolioMetricsFilter,
    PortfolioMetricsItems,
  };
};
