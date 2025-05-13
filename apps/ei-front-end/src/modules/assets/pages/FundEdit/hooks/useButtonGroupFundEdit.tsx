import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

const fundEditFilters = ["information", "critical_dates", "benchmark"] as const;

type FundEditFilters = typeof fundEditFilters[number];

export const useButtonGroupFundEdit = () => {
  const [fundEditFilter, setFundEditFilter] = useState<FundEditFilters>(
    fundEditFilters[0]
  );

  const fundEditFilterItems: ButtonGroupItem[] = [
    {
      key: "information",
      text: "Information",
      onClick: (key) => setFundEditFilter(key as FundEditFilters),
    },
    {
      key: "critical_dates",
      text: "Critical Dates",
      onClick: (key) => setFundEditFilter(key as FundEditFilters),
    },
    /* {
      key: "benchmark",
      text: "Benchmark",
      onClick: (key) => setFundEditFilter(key as FundEditFilters),
    }, */
  ];

  const fundEditInformationClasses =
    fundEditFilter === "information" ? undefined : "hidden";

  const fundEditBenchmarkClasses =
    fundEditFilter === "benchmark" ? undefined : "hidden";

  const fundEditCriticalDatesClasses =
    fundEditFilter === "critical_dates" ? undefined : "hidden";

  return {
    fundEditFilter,
    fundEditFilterItems,
    fundEditInformationClasses,
    fundEditCriticalDatesClasses,
    fundEditBenchmarkClasses,
  };
};
