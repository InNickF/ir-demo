import {
  NetContributionDistributionChartSchema,
  TotalDistributionActualVsBudgetChartSchema,
  TotalDistributionByTypeDoughnutSchema,
} from "@/assets/schemas/investing-performance";
import { DistributionsContributionsKPIsSchema } from "../../entities/abstracts/distribution-contribution";
import { privateAxios } from "@/commons/services/clients";
import { GenericFilterPayload } from "@/commons/typings";
import { querySerializer } from "@/commons/utils/query-serializer";
import { z } from "zod";

export type InvestingPerformanceGeneralFilters =
  | (GenericFilterPayload & { investment_entity_code: string })
  | (GenericFilterPayload & { investment_fund_name: string });

export type DistributionsContributionsKPIsFilters =
  InvestingPerformanceGeneralFilters;
export const getDistributionsContributionsKPIs = async (
  filters: DistributionsContributionsKPIsFilters
) => {
  const serializedQuery = querySerializer({
    type: "distributions-contributions",
    ...filters,
  });
  const response = await privateAxios.get(
    `/data-asset/fund-transactions/charts${serializedQuery}`
  );

  return DistributionsContributionsKPIsSchema.parse(response?.data);
};

export type NetContributionDistributionChartFilters =
  InvestingPerformanceGeneralFilters;
export const getNetContributionDistributionChart = async (
  filters: NetContributionDistributionChartFilters
) => {
  const serializedQuery = querySerializer({
    type: "net-contributions-distributions",
    ...filters,
  });
  const response = await privateAxios.get(
    `/data-asset/fund-transactions/charts${serializedQuery}`
  );

  return z.array(NetContributionDistributionChartSchema).parse(response?.data);
};

export interface PropertyTotalDistributionByTypeDoughnutFilters
  extends GenericFilterPayload {
  investment_entity_code: string;
}
export const getPropertyTotalDistributionByTypeDoughnut = async (
  filters: PropertyTotalDistributionByTypeDoughnutFilters
) => {
  const serializedQuery = querySerializer({
    type: "total-distributions-by-type",
    ...filters,
  });
  const response = await privateAxios.get(
    `/data-asset/fund-transactions/charts${serializedQuery}`
  );

  return z.array(TotalDistributionByTypeDoughnutSchema).parse(response?.data);
};

export type TotalDistributionActualLineChartFilters =
  InvestingPerformanceGeneralFilters;
export const getTotalDistributionActualLineChart = async (
  filters: TotalDistributionActualLineChartFilters
) => {
  const serializedQuery = querySerializer({
    type: "total-distributions-actual",
    ...filters,
  });
  const response = await privateAxios.get(
    `/data-asset/fund-transactions/charts${serializedQuery}`
  );

  return z
    .array(TotalDistributionActualVsBudgetChartSchema)
    .parse(response?.data);
};

export type TotalDistributionBudgetLineChartFilters =
  | (GenericFilterPayload & { yardi_property_code: string })
  | (GenericFilterPayload & { fund_name: string });
export const getTotalDistributionBudgetLineChart = async (
  filters: TotalDistributionBudgetLineChartFilters
) => {
  const serializedQuery = querySerializer({
    type: "total-distributions-budget",
    ...filters,
  });
  const response = await privateAxios.get(
    `/data-asset/operational-financial-performances/charts${serializedQuery}`
  );

  return z
    .array(TotalDistributionActualVsBudgetChartSchema)
    .parse(response?.data);
};
