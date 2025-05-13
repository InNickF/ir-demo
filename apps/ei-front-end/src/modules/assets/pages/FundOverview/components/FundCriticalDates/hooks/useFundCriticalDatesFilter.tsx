import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

const FundCriticalDatesFilters = ["fund", "assets"] as const;
type FundCriticalDatesFilters = typeof FundCriticalDatesFilters[number];

export const useFundCriticalDatesFilter = () => {
  const [FundCriticalDatesFilter, setFundCriticalDatesFilter] =
    useState<FundCriticalDatesFilters>(FundCriticalDatesFilters[0]);
  const FundCriticalDatesItems: ButtonGroupItem[] = [
    {
      key: "fund",
      text: "Fund",
      size: "small",
      onClick: (key) =>
        setFundCriticalDatesFilter(key as FundCriticalDatesFilters),
    },
    {
      key: "assets",
      text: "Assets",
      size: "small",
      onClick: (key) =>
        setFundCriticalDatesFilter(key as FundCriticalDatesFilters),
    },
  ];

  return {
    FundCriticalDatesFilter,
    FundCriticalDatesItems,
  };
};
