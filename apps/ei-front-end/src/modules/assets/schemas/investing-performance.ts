import { GenericXYDateChartSchema } from "@/commons/schemas/charts";
import { LegacyGenericLabelValueObjectSchema } from "@/commons/schemas/filters";
import { z } from "zod";

export const NetContributionDistributionChartSchema = GenericXYDateChartSchema;

export const TotalDistributionByTypeDoughnutSchema =
  LegacyGenericLabelValueObjectSchema(z.number());

export const TotalDistributionActualVsBudgetChartSchema =
  GenericXYDateChartSchema;
