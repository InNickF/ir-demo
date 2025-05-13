import { OperationalFinancialPerformanceComparison } from "@/modules/assets/typings/operational-financial-performance";
import { OPERATIONAL_FINANCIAL_PERFORMANCE_COMPARISONS } from "@/modules/assets/utils/operational-financial-performance";
import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

export const useOFPComparisonButtonGroupFilters = () => {
  const [activeComparison, setActiveComparison] =
    useState<OperationalFinancialPerformanceComparison>(
      OPERATIONAL_FINANCIAL_PERFORMANCE_COMPARISONS[0]
    );

  const comparisonButtonsFilters: ButtonGroupItem[] = [
    {
      key: "budget",
      text: "Budget",
      size: "small",
      onClick: (key) =>
        setActiveComparison(key as OperationalFinancialPerformanceComparison),
    },
    {
      key: "underwriting",
      text: "Underwriting",
      size: "small",
      disabled: true,
      onClick: (key) =>
        setActiveComparison(key as OperationalFinancialPerformanceComparison),
    },
    {
      key: "other",
      text: "Other Period",
      size: "small",
      disabled: true,
      onClick: (key) =>
        setActiveComparison(key as OperationalFinancialPerformanceComparison),
    },
  ];

  return {
    activeComparison,
    comparisonButtonsFilters,
    setActiveComparison,
  };
};
