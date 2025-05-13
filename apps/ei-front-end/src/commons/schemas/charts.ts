import { z } from "zod";
import { LegacyGenericLabelValueObjectSchema } from "./filters";

export const GenericXYDateChartSchema = z.object({
  x: z.string(),
  y: z.number(),
});

export const GenericChartXYSchema = z.object({
  x: z.number(),
  y: z.number(),
  metadata: z.any().nullish(),
});

export const GenericChartXYDateToChartSchema = z.object({
  x: z.number(),
  y: z.number(),
  metadata: z.any().nullish(),
});

export const GenericXYDateMultilineToChartSchema =
  LegacyGenericLabelValueObjectSchema(z.array(GenericChartXYDateToChartSchema));

export const GenericStepBarChartDataSchema = z.object({
  category: z.string().nullish(),
  value: z.number().nullish(),
  open: z.number().nullish(),
  stepValue: z.number().nullish(),
  displayValue: z.number().nullish(),
});
