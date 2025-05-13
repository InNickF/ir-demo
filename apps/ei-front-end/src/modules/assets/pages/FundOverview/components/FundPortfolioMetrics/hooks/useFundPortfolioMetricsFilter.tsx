import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

export const FundPortfolioMetricsFilters = ["LIQ", "PROJ"] as const;

type FundPortfolioMetricsFilters = typeof FundPortfolioMetricsFilters[number];

export const useFundPortfolioMetricsFilter = () => {
  const [FundPortfolioMetricsFilter, setFundPortfolioMetricsFilter] =
    useState<FundPortfolioMetricsFilters>(FundPortfolioMetricsFilters[0]);
  const FundPortfolioMetricsItems: ButtonGroupItem[] = [
    {
      key: "LIQ",
      text: "Latest Marks",
      size: "small",
      onClick: (key) =>
        setFundPortfolioMetricsFilter(key as FundPortfolioMetricsFilters),
    },
    {
      key: "PROJ",
      text: "Projected Exit",
      size: "small",
      onClick: (key) =>
        setFundPortfolioMetricsFilter(key as FundPortfolioMetricsFilters),
    },
  ];

  return {
    FundPortfolioMetricsFilter,
    FundPortfolioMetricsItems,
  };
};
