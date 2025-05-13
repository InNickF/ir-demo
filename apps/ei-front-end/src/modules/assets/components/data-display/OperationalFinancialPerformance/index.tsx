import {
  OperationalFinancialPerformanceChart as OperationalFinancialPerformanceChartType,
  OperationalFinancialPerformanceTableMetrics,
} from "@/modules/assets/typings/operational-financial-performance";
import { FC } from "react";
import { OperationalFinancialPerformanceHistoricalChart } from "./components/OperationalFinancialPerformanceHistoricalChart";
import { OperationalFinancialPerformanceMetricsTable } from "./components/OperationalFinancialPerformanceMetricsTable";
import "./styles.css";
import {
  OFPHistoricalChartButtonFilters,
  OFPSelectedMetric,
  OFPTableButtonFilters,
} from "./types";

export interface OperationalFinancialPerformanceProps
  extends OFPTableButtonFilters,
    OFPHistoricalChartButtonFilters,
    OFPSelectedMetric {
  title: string;
  className?: string;
  tableData: OperationalFinancialPerformanceTableMetrics[];
  isLoadingTable?: boolean;
  isRefetchingTable?: boolean;
  historicalData: OperationalFinancialPerformanceChartType[];
  isLoadingHistorical?: boolean;
  isRefetchingHistorical?: boolean;
}

export const OperationalFinancialPerformance: FC<
  OperationalFinancialPerformanceProps
> = ({
  title,
  className,
  tableData,
  isLoadingTable,
  isRefetchingTable,
  historicalData,
  isLoadingHistorical,
  isRefetchingHistorical,
  activeComparison,
  activeHistoricalVariant,
  comparisonButtonsFilters,
  historicalVariantButtonFilters,
  selectedMetric,
  onSelectMetric,
}) => {
  const prefix = "ei-operational-financial-performance";

  const getClasses = () => {
    const classes = [`${prefix}__container`];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <section className={getClasses()}>
      <OperationalFinancialPerformanceMetricsTable
        title={title}
        className={`${prefix}__table`}
        data={tableData}
        activeComparison={activeComparison}
        comparisonButtonsFilters={comparisonButtonsFilters}
        isLoading={isLoadingTable}
        isRefetching={isRefetchingTable}
        onSelectMetric={onSelectMetric}
        selectedMetric={selectedMetric}
      />
      <OperationalFinancialPerformanceHistoricalChart
        className={`${prefix}__chart`}
        data={historicalData}
        selectedMetric={selectedMetric}
        activeComparison={activeComparison}
        isLoading={isLoadingHistorical}
        isRefetching={isRefetchingHistorical}
        activeHistoricalVariant={activeHistoricalVariant}
        historicalVariantButtonFilters={historicalVariantButtonFilters}
      />
    </section>
  );
};
