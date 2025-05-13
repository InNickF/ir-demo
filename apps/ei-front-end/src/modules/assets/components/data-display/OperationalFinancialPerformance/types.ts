import {
  OperationalFinancialPerformanceComparison,
  OperationalFinancialPerformanceHistoricalChartVariant,
} from "@/modules/assets/typings/operational-financial-performance";
import { ButtonGroupItem } from "in-ui-react";

export interface OFPTableButtonFilters {
  comparisonButtonsFilters: ButtonGroupItem[];
  activeComparison: OperationalFinancialPerformanceComparison;
}

export interface OFPHistoricalChartButtonFilters {
  activeHistoricalVariant: OperationalFinancialPerformanceHistoricalChartVariant;
  historicalVariantButtonFilters: ButtonGroupItem[];
}

export interface OFPSelectedMetric {
  selectedMetric: string;
  onSelectMetric: (metric: string) => void;
}
