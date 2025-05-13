import { z } from "zod";
import {
  NetContributionDistributionChartSchema,
  TotalDistributionActualVsBudgetChartSchema,
  TotalDistributionByTypeDoughnutSchema,
} from "../schemas/investing-performance";
import { DistributionsContributionsKPIsSchema } from "../entities/abstracts/distribution-contribution";

export type DistributionsContributionsKPIs = z.infer<
  typeof DistributionsContributionsKPIsSchema
>;

export type NetContributionDistributionChart = z.infer<
  typeof NetContributionDistributionChartSchema
>;

export type TotalDistributionByTypeDoughnut = z.infer<
  typeof TotalDistributionByTypeDoughnutSchema
>;

export type TotalDistributionActualVsBudgetChart = z.infer<
  typeof TotalDistributionActualVsBudgetChartSchema
>;
