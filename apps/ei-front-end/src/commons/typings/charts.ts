import {
  GenericXYDateChartSchema,
  GenericChartXYDateToChartSchema,
  GenericChartXYSchema,
  GenericXYDateMultilineToChartSchema,
  GenericStepBarChartDataSchema,
} from "@/commons/schemas/charts";
import { z } from "zod";

export type GenericXYDateChart = z.infer<typeof GenericXYDateChartSchema>;

/**
 * GenericChartXYDateToChart: The reason of this type is because charts needs dates as timestamps.
 */
export type GenericChartXYDateToChart = z.infer<
  typeof GenericChartXYDateToChartSchema
>;
export type GenericChartXY = z.infer<typeof GenericChartXYSchema>;

/**
 * GenericXYDateMultilineToChart: The reason of this type is because charts needs dates as timestamps.
 */
export type GenericXYDateMultilineToChart = z.infer<
  typeof GenericXYDateMultilineToChartSchema
>;

export type GenericStepBarChartData = z.infer<
  typeof GenericStepBarChartDataSchema
>;
