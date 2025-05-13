import { KpiPortfolioSchema } from "@/assets/schemas/kpis";
import {
  FundOperationalStatementSchema,
  OperationalFinancialPerformanceChartSchema,
  OperationalFinancialPerformanceTableMetricsSchema,
} from "@/assets/schemas/operational-financial-performance";
import {
  ARChartItemSchema,
  GavPortfolioSchema,
  LoanExpirationSchema,
  QuarterlyPortfolioSchema,
  StackedGraphPortfolio,
} from "@/assets/schemas/portfolio";
import {
  OperationalFinancialPerformanceHistoricalMetricsAPIFilters,
  OperationalFinancialPerformanceMetricsAPIFilters,
} from "@/assets/typings/operational-financial-performance";
import { FundId } from "@/assets/typings/portfolio";
import { ARTenantType } from "@/assets/typings/tenants";
import { privateAxios } from "@/commons/services/clients";
import { GenericFilterPayload } from "@/commons/typings";
import { querySerializer } from "@/commons/utils/query-serializer";
import { z } from "zod";

export const legacyGetGavPortfolioFilter = async (
  filters: GenericFilterPayload,
  by?: string
) => {
  const serializedQuery = querySerializer({ ...filters, filter: by });
  const response = await privateAxios.get(
    `/asset/portfolio/portfolio-gav/${serializedQuery}`
  );
  return z.array(GavPortfolioSchema).parse(response.data);
};

export const legacyGetLoanPortfolioFilter = async (
  filters: GenericFilterPayload,
  by?: string
) => {
  const serializedQuery = querySerializer({ ...filters, filter: by });
  const response = await privateAxios.get(
    `/asset/portfolio/portfolio-loan/${serializedQuery}`
  );
  return z.array(StackedGraphPortfolio).parse(response.data);
};

export const legacyGetLeasePortfolioFilter = async (
  filters: GenericFilterPayload,
  by?: string
) => {
  const serializedQuery = querySerializer({ ...filters, filter: by });
  const response = await privateAxios.get(
    `/asset/portfolio/portfolio-lease/${serializedQuery}`
  );
  return z.array(StackedGraphPortfolio).parse(response.data);
};

export const getPortfolioQuarterly = async (
  filters: GenericFilterPayload,
  by?: string
) => {
  const serializedQuery = querySerializer({ ...filters, filter: by });
  const response = await privateAxios.get(
    `/asset/portfolio/portfolio-quarterly/${serializedQuery}`
  );
  return z.array(QuarterlyPortfolioSchema).parse(response.data);
};

export const getPortfolioKpi = async (
  filters: GenericFilterPayload,
  by?: string
) => {
  const serializedQuery = querySerializer({ ...filters, source: by });
  const response = await privateAxios.get(
    `/asset/portfolio/portfolio-kpi/${serializedQuery}`
  );
  return KpiPortfolioSchema.parse(response.data[0]);
};

export interface GetARChartFilters extends GenericFilterPayload {
  fund?: FundId;
  tenant_type?: ARTenantType;
}
export const getARChart = async (filters: GetARChartFilters) => {
  const finalFilters = {
    ...filters,
    funds: filters?.fund,
    type: "rents_and_accounts_receivable",
  };
  const serializedQuery = querySerializer(finalFilters);
  const response = await privateAxios.get(
    `/data-asset/accounts-receivable-and-current-month-charges/charts${serializedQuery}`
  );
  return z.array(ARChartItemSchema).parse(response.data);
};

export interface GetPortfolioOFPMetricsFilters
  extends OperationalFinancialPerformanceMetricsAPIFilters {
  fund_name: string;
}
export const getPortfolioOFPMetrics = async (
  filters: GetPortfolioOFPMetricsFilters
) => {
  const finalFilters: GenericFilterPayload = {
    ...filters,
    type: "property_performance_table",
  };

  const serializedQuery = querySerializer(finalFilters);

  const response = await privateAxios.get(
    `/data-asset/operational-financial-performances/charts${serializedQuery}`
  );

  return z
    .array(OperationalFinancialPerformanceTableMetricsSchema)
    .parse(response.data);
};

export interface GetPortfolioOFPHistoricalMetricsFilters
  extends OperationalFinancialPerformanceHistoricalMetricsAPIFilters {
  fund_name: string;
}
export const getPortfolioOFPHistoricalMetrics = async (
  filters: GetPortfolioOFPHistoricalMetricsFilters
) => {
  const serializedQuery = querySerializer({
    type: "property_performance_chart",
    ...filters,
  });

  const response = await privateAxios.get(
    `/data-asset/operational-financial-performances/charts${serializedQuery}`
  );

  return z
    .array(OperationalFinancialPerformanceChartSchema)
    .parse(response.data);
};

export interface GetPortfolioOperationalStatementFilters
  extends GenericFilterPayload {
  fund_name: string;
}
export const getPortfolioOperationalStatement = async (
  filters: GetPortfolioOperationalStatementFilters
) => {
  const serializedQuery = querySerializer({
    type: "operational_statement",
    ...filters,
  });

  const response = await privateAxios.get(
    `/data-asset/operational-financial-performances/charts${serializedQuery}`
  );

  return z.array(FundOperationalStatementSchema).parse(response.data);
};

export interface GetLoanExpirationFilters extends GenericFilterPayload {
  fund?: string;
  property?: string;
}
export const getLoanExpiration = async (filters: GetLoanExpirationFilters) => {
  const serializedQuery = querySerializer({
    ...filters,
  });

  const response = await privateAxios.get(
    `/data-debt/loan-summary/charts/expiration/${serializedQuery}`
  );

  return z.array(LoanExpirationSchema).parse(response.data);
};
