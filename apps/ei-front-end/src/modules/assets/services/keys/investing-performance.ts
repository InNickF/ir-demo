import {
  DistributionsContributionsKPIsFilters,
  getDistributionsContributionsKPIs,
  getNetContributionDistributionChart,
  getTotalDistributionActualLineChart,
  getTotalDistributionBudgetLineChart,
  getPropertyTotalDistributionByTypeDoughnut,
  NetContributionDistributionChartFilters,
  TotalDistributionActualLineChartFilters,
  TotalDistributionBudgetLineChartFilters,
  PropertyTotalDistributionByTypeDoughnutFilters,
} from "@/assets/services/api/investing-performance";
import { createQueryKeys } from "@lukemorales/query-key-factory";

export const investingPerformanceQueries = createQueryKeys(
  "investingPerformance",
  {
    distributionsContributionsKPIs: (
      filters: DistributionsContributionsKPIsFilters
    ) => ({
      queryKey: [filters],
      queryFn: () => getDistributionsContributionsKPIs(filters),
    }),
    netContributionDistributionChart: (
      filters: NetContributionDistributionChartFilters
    ) => ({
      queryKey: [filters],
      queryFn: () => getNetContributionDistributionChart(filters),
    }),
    propertyTotalDistributionByTypeDoughnut: (
      filters: PropertyTotalDistributionByTypeDoughnutFilters
    ) => ({
      queryKey: [filters],
      queryFn: () => getPropertyTotalDistributionByTypeDoughnut(filters),
    }),
    totalDistributionActualLineChart: (
      filters: TotalDistributionActualLineChartFilters
    ) => ({
      queryKey: [filters],
      queryFn: () => getTotalDistributionActualLineChart(filters),
    }),
    totalDistributionBudgetLineChart: (
      filters: TotalDistributionBudgetLineChartFilters
    ) => ({
      queryKey: [filters],
      queryFn: () => getTotalDistributionBudgetLineChart(filters),
    }),
  }
);
