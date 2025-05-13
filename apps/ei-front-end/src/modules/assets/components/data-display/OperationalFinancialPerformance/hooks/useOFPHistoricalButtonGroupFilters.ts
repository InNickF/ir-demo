import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeAndKeepCase } from "@/commons/model-in/formatters/utils";
import { OperationalFinancialPerformanceHistoricalChartVariant } from "@/modules/assets/typings/operational-financial-performance";
import { OPERATIONAL_FINANCIAL_PERFORMANCE_HISTORICAL_CHART_VARIANTS } from "@/modules/assets/utils/operational-financial-performance";
import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

export const useOFPHistoricalButtonGroupFilters = () => {
  const [activeHistoricalVariant, setActiveHistoricalVariant] =
    useState<OperationalFinancialPerformanceHistoricalChartVariant>(
      OPERATIONAL_FINANCIAL_PERFORMANCE_HISTORICAL_CHART_VARIANTS[0]
    );

  const getButtonText = (
    filter: OperationalFinancialPerformanceHistoricalChartVariant
  ) => {
    if (filter === "normal") {
      return "Monthly";
    }
    return convertToTitleCase(humanizeSnakeAndKeepCase(filter));
  };

  const historicalVariantButtonFilters: ButtonGroupItem[] =
    OPERATIONAL_FINANCIAL_PERFORMANCE_HISTORICAL_CHART_VARIANTS.map(
      (filter) => ({
        key: filter,
        text: getButtonText(filter),
        onClick: () => {
          setActiveHistoricalVariant(filter);
        },
      })
    );

  return {
    activeHistoricalVariant,
    historicalVariantButtonFilters,
    setActiveHistoricalVariant,
  };
};
