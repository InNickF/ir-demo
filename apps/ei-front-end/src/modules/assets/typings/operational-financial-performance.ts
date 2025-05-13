import {
  FundOperationalStatementSchema,
  OperationalFinancialPerformanceChartDataSchema,
  OperationalFinancialPerformanceChartSchema,
  OperationalFinancialPerformanceTableMetricsSchema,
} from "@/assets/schemas/operational-financial-performance";
import {
  OPERATIONAL_FINANCIAL_PERFORMANCE_COMPARISONS,
  OPERATIONAL_FINANCIAL_PERFORMANCE_HISTORICAL_CHART_VARIANTS,
} from "@/assets/utils/operational-financial-performance";
import { GenericFilterPayload } from "@/commons/typings";
import { z } from "zod";

export type OperationalFinancialPerformanceTableMetrics = z.infer<
  typeof OperationalFinancialPerformanceTableMetricsSchema
>;

export type OperationalFinancialPerformanceChart = z.infer<
  typeof OperationalFinancialPerformanceChartSchema
>;

export type OperationalFinancialPerformanceChartData = z.infer<
  typeof OperationalFinancialPerformanceChartDataSchema
>;

export type OperationalFinancialPerformanceHistoricalChartVariant =
  typeof OPERATIONAL_FINANCIAL_PERFORMANCE_HISTORICAL_CHART_VARIANTS[number];

export type OperationalFinancialPerformanceComparison =
  typeof OPERATIONAL_FINANCIAL_PERFORMANCE_COMPARISONS[number];

export interface OperationalFinancialPerformanceMetricsAPIFilters
  extends GenericFilterPayload {
  reference?: OperationalFinancialPerformanceComparison;
}

export interface OperationalFinancialPerformanceHistoricalMetricsAPIFilters
  extends GenericFilterPayload,
    OperationalFinancialPerformanceMetricsAPIFilters {
  variant?: OperationalFinancialPerformanceHistoricalChartVariant;
}

export type FundOperationalStatement = z.infer<
  typeof FundOperationalStatementSchema
>;
