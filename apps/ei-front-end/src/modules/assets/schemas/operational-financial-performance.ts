import { z } from "zod";
import {
  OPERATIONAL_FINANCIAL_PERFORMANCE_METRIC_TYPES,
  OPERATIONAL_STATEMENT_METRICS,
} from "../utils/operational-financial-performance";

export const OperationalFinancialPerformanceTableMetricsSchema = z.object({
  metric: z.string(),
  ytd_actuals: z.number().nullish(),
  ytd_reference: z.number().nullish(),
  variance: z.number().nullish(),
  variance_percentage: z.number().nullish(),
  type: z.enum(OPERATIONAL_FINANCIAL_PERFORMANCE_METRIC_TYPES),
});

// TODO: OPTIMIZE THIS SCHEMA FOR BETTER READING
export const OperationalFinancialPerformanceChartDataSchema = z
  .object({
    label: z.string(),
    value: z.array(
      z.object({
        x: z.string(),
        y: z.number(),
      })
    ),
  })
  .nullish();

export const OperationalFinancialPerformanceChartSchema = z.object({
  label: z.string(),
  value: z.array(OperationalFinancialPerformanceChartDataSchema),
});

export const FundOperationalStatementMetrics = z.enum(
  OPERATIONAL_STATEMENT_METRICS
);

export const FundOperationalStatementSchema = z.object({
  yardi_property_code: z.string().nullable(),
  name: z.string().nullable(),
  drill_down: z
    .array(
      z.object({
        metric: FundOperationalStatementMetrics,
        actual: z.number().nullable(),
        reference: z.number().nullable(),
        variance: z.number().nullable(),
        variance_percentage: z.number().nullable(),
        type: z.enum(OPERATIONAL_FINANCIAL_PERFORMANCE_METRIC_TYPES),
      })
    )
    .nullable(),
});
