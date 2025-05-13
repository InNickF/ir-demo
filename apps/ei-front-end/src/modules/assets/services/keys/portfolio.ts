import { GenericFilterPayload } from "@/commons/typings";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  getARChart,
  GetARChartFilters,
  legacyGetGavPortfolioFilter,
  legacyGetLeasePortfolioFilter,
  legacyGetLoanPortfolioFilter,
  getPortfolioKpi,
  getPortfolioOFPHistoricalMetrics,
  GetPortfolioOFPHistoricalMetricsFilters,
  getPortfolioOFPMetrics,
  GetPortfolioOFPMetricsFilters,
  getPortfolioOperationalStatement,
  GetPortfolioOperationalStatementFilters,
  getPortfolioQuarterly,
  GetLoanExpirationFilters,
  getLoanExpiration,
} from "../api/portfolio";

export const portfolioQueries = createQueryKeys("portfolio", {
  legacyGavPortfolio: (filters: GenericFilterPayload = {}, by?: string) => ({
    queryKey: [{ filters, by }],
    queryFn: () => legacyGetGavPortfolioFilter(filters, by),
  }),
  legacyLoanPortfolio: (filters: GenericFilterPayload = {}, by?: string) => ({
    queryKey: [{ filters, by }],
    queryFn: () => legacyGetLoanPortfolioFilter(filters, by),
  }),
  legacyLeasePortfolio: (filters: GenericFilterPayload = {}, by?: string) => ({
    queryKey: [{ filters, by }],
    queryFn: () => legacyGetLeasePortfolioFilter(filters, by),
  }),
  quarterlyPortfolio: (filters: GenericFilterPayload = {}, by?: string) => ({
    queryKey: [{ filters, by }],
    queryFn: () => getPortfolioQuarterly(filters, by),
  }),
  kpiPortfolio: (filters: GenericFilterPayload = {}, by?: string) => ({
    queryKey: [{ filters, by }],
    queryFn: () => getPortfolioKpi(filters, by),
  }),
  arChart: (filters: GetARChartFilters) => ({
    queryKey: [filters],
    queryFn: () => getARChart(filters),
  }),
  operationalFinancialPerformanceMetrics: (
    filters: GetPortfolioOFPMetricsFilters
  ) => ({
    queryKey: [filters],
    queryFn: () => getPortfolioOFPMetrics(filters),
  }),
  operationalFinancialPerformanceHistorical: (
    filters: GetPortfolioOFPHistoricalMetricsFilters
  ) => ({
    queryKey: [filters],
    queryFn: () => getPortfolioOFPHistoricalMetrics(filters),
  }),
  operationalStatement: (filters: GetPortfolioOperationalStatementFilters) => ({
    queryKey: [filters],
    queryFn: () => getPortfolioOperationalStatement(filters),
  }),
  loanExpiration: (filters: GetLoanExpirationFilters) => ({
    queryKey: [filters],
    queryFn: () => getLoanExpiration(filters),
  }),
});
