import { GenericFilterPayload } from "@/commons/typings";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  CompstackLeaseCompsTrendChartFilters,
  GetAllCompstackCompsFilters,
  GetHistoricalCapRatesFilters,
  GetCompstackCompTotalsFilters,
  GetCompstackCompsFilters,
  GetCompstackLandCompsTrendFilters,
  GetCompstackSaleCompsTrendFilters,
  GetDealCustomerAccessFilters,
  GetDealDrivingRoutesFilters,
  GetFinancialMarketForwardCurvesFilters,
  GetHistoricalMacroEconomicIndicatorsChartFilters,
  GetHistoricalMarketOrSubMarketStatisticsChartFilters,
  GetHistoricalMarketStatisticsChartFilters,
  GetHistoricalMarketStatisticsChartSupplyVSDemandFilters,
  GetIndustrialGeographiesByLatitudeAndLongitudeFilters,
  GetIndustrialGeographiesFilters,
  GetMarketAnalyticsKPIsFilters,
  GetMarketRentGrowthAndForecastChartFilters,
  GetPropertiesWarehousesFilters,
  getAllCompstackComps,
  getHistoricalCapRates,
  getCompTotals,
  getComps,
  getCompstackLandCompTotals,
  getCompstackLandComps,
  getCompstackLandCompsTrend,
  getCompstackLeaseCompTotals,
  getCompstackLeaseComps,
  getCompstackLeaseCompsTrendChart,
  getCompstackSaleCompTotals,
  getCompstackSaleCompsTrend,
  getCompstackSalesComps,
  getDealCustomerAccess,
  getDealDrivingRoutes,
  getFinancialMarketForwardCurves,
  getHistoricalMacroEconomicIndicatorsChart,
  getHistoricalMarketOrSubMarketStatisticsChart,
  getHistoricalMarketStatisticsChart,
  getHistoricalMarketStatisticsChartSupplyVSDemand,
  getIndustrialGeographies,
  getIndustrialGeographiesByLatitudeAndLongitude,
  getMarketAnalyticsKPIs,
  getMarketRentGrowthAndForecastChart,
  getPropertiesWarehouses,
} from "../api/market-analytics";

export const marketAnalyticsQueries = createQueryKeys("marketAnalytics", {
  all: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getComps(filters),
  }),
  byType: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
  }),
  totals: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getCompTotals(filters),
  }),
  totalsByType: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
  }),
  marketAnalyticsKPIs: (filters: GetMarketAnalyticsKPIsFilters) => ({
    queryKey: [filters],
    queryFn: () => getMarketAnalyticsKPIs(filters),
  }),
  compstackLeaseCompsTrendChart: (
    filters: CompstackLeaseCompsTrendChartFilters
  ) => ({
    queryKey: [filters],
    queryFn: ({ signal }) => getCompstackLeaseCompsTrendChart(filters, signal),
  }),
  compstackSaleCompsTrendChart: (
    filters: GetCompstackSaleCompsTrendFilters
  ) => ({
    queryKey: [filters],
    queryFn: ({ signal }) => getCompstackSaleCompsTrend(filters, signal),
  }),
  compstackLandCompsTrendChart: (
    filters: GetCompstackLandCompsTrendFilters
  ) => ({
    queryKey: [filters],
    queryFn: ({ signal }) => getCompstackLandCompsTrend(filters, signal),
  }),
  historicalMarketOrSubMarketStatisticsChart: (
    filters: GetHistoricalMarketOrSubMarketStatisticsChartFilters
  ) => ({
    queryKey: [filters],
    queryFn: ({ signal }) =>
      getHistoricalMarketOrSubMarketStatisticsChart(filters, signal),
  }),
  historicalMarketStatisticsChart: (
    filters: GetHistoricalMarketStatisticsChartFilters
  ) => ({
    queryKey: [filters],
    queryFn: ({ signal }) =>
      getHistoricalMarketStatisticsChart(filters, signal),
  }),
  historicalMarketStatisticsChartSupplyVSDemand: (
    filters: GetHistoricalMarketStatisticsChartSupplyVSDemandFilters
  ) => ({
    queryKey: [filters],
    queryFn: ({ signal }) =>
      getHistoricalMarketStatisticsChartSupplyVSDemand(filters, signal),
  }),
  compstackLeaseComps: (filters: GetCompstackCompsFilters) => ({
    queryKey: [filters],
    queryFn: ({ signal }) => getCompstackLeaseComps(filters, signal),
  }),
  compstackSalesComps: (filters: GetCompstackCompsFilters) => ({
    queryKey: [filters],
    queryFn: ({ signal }) => getCompstackSalesComps(filters, signal),
  }),
  compstackLandComps: (filters: GetCompstackCompsFilters) => ({
    queryKey: [filters],
    queryFn: ({ signal }) => getCompstackLandComps(filters, signal),
  }),
  allCompstackComps: (filters: GetAllCompstackCompsFilters) => ({
    queryKey: [filters],
    queryFn: ({ signal }) => getAllCompstackComps(filters, signal),
  }),
  compstackLeaseCompTotals: (filters: GetCompstackCompTotalsFilters) => ({
    queryKey: [filters],
    queryFn: ({ signal }) => getCompstackLeaseCompTotals(filters, signal),
  }),
  compstackSaleCompTotals: (filters: GetCompstackCompTotalsFilters) => ({
    queryKey: [filters],
    queryFn: ({ signal }) => getCompstackSaleCompTotals(filters, signal),
  }),
  compstackLandCompTotals: (filters: GetCompstackCompTotalsFilters) => ({
    queryKey: [filters],
    queryFn: ({ signal }) => getCompstackLandCompTotals(filters, signal),
  }),
  historicalMacroEconomicIndicatorsChart: (
    filters: GetHistoricalMacroEconomicIndicatorsChartFilters
  ) => ({
    queryKey: [filters],
    queryFn: ({ signal }) =>
      getHistoricalMacroEconomicIndicatorsChart(filters, signal),
  }),
  propertiesWarehouses: (filters: GetPropertiesWarehousesFilters) => ({
    queryKey: [filters],
    queryFn: () => getPropertiesWarehouses(filters),
  }),
  financialMarketForwardCurves: (
    filters: GetFinancialMarketForwardCurvesFilters
  ) => ({
    queryKey: [filters],
    queryFn: () => getFinancialMarketForwardCurves(filters),
  }),
  industrialGeographies: <T extends boolean = false>(
    filters: GetIndustrialGeographiesFilters<T>
  ) => ({
    queryKey: [filters],
    queryFn: () => getIndustrialGeographies<T>(filters),
  }),
  industrialGeographiesByLatitudeAndLongitude: <T extends boolean = false>(
    filters: GetIndustrialGeographiesByLatitudeAndLongitudeFilters<T>
  ) => ({
    queryKey: [filters],
    queryFn: () => getIndustrialGeographiesByLatitudeAndLongitude<T>(filters),
  }),
  marketRentGrowthAndForecastChart: (
    filters: GetMarketRentGrowthAndForecastChartFilters
  ) => ({
    queryKey: [filters],
    queryFn: () => getMarketRentGrowthAndForecastChart(filters),
  }),
  dealDrivingRoutes: (filters: GetDealDrivingRoutesFilters) => ({
    queryKey: [filters],
    queryFn: ({ signal }) => getDealDrivingRoutes({ filters, signal }),
  }),
  dealCustomerAccess: (filters: GetDealCustomerAccessFilters) => ({
    queryKey: [filters],
    queryFn: () => getDealCustomerAccess(filters),
  }),
  capHistoricalRates: (filters: GetHistoricalCapRatesFilters) => ({
    queryKey: [filters],
    queryFn: () => getHistoricalCapRates(filters),
  }),
});
