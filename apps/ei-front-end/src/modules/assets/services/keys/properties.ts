import { LegacyProperty, PropertyKpi } from "@/assets/typings/property";
import { GenericFilterPayload } from "@/commons/typings";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  getAllProperties,
  GetAllPropertiesFilters,
  getARPropertyTable,
  GetARPropertyTableFilters,
  getAssetTotalDistributionByTypeTotals,
  GetAssetTotalDistributionsByTypeTotalsFilters,
  getAssetTotalDistributionsByType,
  GetAssetTotalDistributionsByTypeFilters,
  getKpiByProperty,
  getOperationalStatementTable,
  getPropertiesGeography,
  GetPropertiesGeographyFilters,
  getProperty,
  getPropertyAttachments,
  GetPropertyAttachments,
  getPropertyComments,
  GetPropertyComments,
  GetPropertyFilters,
  getPropertyImage,
  getPropertyOFPHistoricalMetrics,
  GetPropertyOFPHistoricalMetricsFilters,
  getPropertyOFPMetrics,
  GetPropertyOFPMetricsFilters,
  getPropertyProjectedExitMetrics,
  GetPropertyStrategy,
  getPropertyStrategy,
  getPropertyTimeline,
  GetPropertyTimeline,
  getValuationsByAsset,
  GetValuationsByAssetFilters,
  getValuationsByAssetTotals,
  GetValuationsByAssetTotalsFilters,
  legacyGetAllPropertiesByGavFilter,
  legacyGetDebtMetricsByProperty,
  legacyGetProperty,
  GetPropertyDebtMetricsFilters,
  getPropertyDebtMetrics,
  getAssetLeaseExpirationPortrait,
  GetAssetLeaseExpirationPortraitFilters,
  GetAssetStakingPlanFilters,
  getAssetStakingPlan,
  GetAssetRentRollFilters,
  getAssetRentRoll,
} from "../api/properties";

export const propertiesQueries = createQueryKeys("properties", {
  legacyAllProperties: null,
  legacyAllPropertiesByGavFilter: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => legacyGetAllPropertiesByGavFilter(filters),
  }),
  legacyProperty: (id: LegacyProperty["property_code"]) => ({
    queryKey: [id],
    queryFn: () => legacyGetProperty(id),
  }),
  imagesByProperty: (id: LegacyProperty["property_code"]) => ({
    queryKey: [id],
    queryFn: () => getPropertyImage(id),
  }),
  kpiByProperty: (data: PropertyKpi) => ({
    queryKey: [{ data }],
    queryFn: () => getKpiByProperty(data),
  }),
  legacyDebtMetrics: (id: LegacyProperty["property_code"]) => ({
    queryKey: [id],
    queryFn: () => legacyGetDebtMetricsByProperty(id),
  }),
  propertyProjectedExitMetrics: (id: LegacyProperty["property_code"]) => ({
    queryKey: [id],
    queryFn: () => getPropertyProjectedExitMetrics(id),
  }),
  operationalFinancialPerformanceMetrics: (
    filters: GetPropertyOFPMetricsFilters
  ) => ({
    queryKey: [filters],
    queryFn: () => getPropertyOFPMetrics(filters),
  }),
  operationalFinancialPerformanceHistorical: (
    filters: GetPropertyOFPHistoricalMetricsFilters
  ) => ({
    queryKey: [filters],
    queryFn: () => getPropertyOFPHistoricalMetrics(filters),
  }),
  arPropertyTable: (filters: GetARPropertyTableFilters) => ({
    queryKey: [{ filters }],
    queryFn: () => getARPropertyTable(filters),
  }),
  operationalStatement: (filters: GenericFilterPayload) => ({
    queryKey: [{ filters }],
    queryFn: () => getOperationalStatementTable(filters),
  }),
  allProperties: (filters: GetAllPropertiesFilters) => ({
    queryKey: [filters],
    queryFn: () => getAllProperties(filters),
  }),
  property: (filters: GetPropertyFilters) => ({
    queryKey: [filters],
    queryFn: () => getProperty(filters),
  }),
  propertyStrategy: (filters: GetPropertyStrategy) => ({
    queryKey: [filters],
    queryFn: () => getPropertyStrategy(filters),
  }),
  propertyComments: (filters: GetPropertyComments) => ({
    queryKey: [filters],
    queryFn: () => getPropertyComments(filters),
  }),
  propertyTimeline: (filters: GetPropertyTimeline) => ({
    queryKey: [filters],
    queryFn: () => getPropertyTimeline(filters),
  }),
  propertyAttachments: (filters: GetPropertyAttachments) => ({
    queryKey: [filters],
    queryFn: () => getPropertyAttachments(filters),
  }),
  propertiesGeography: (filters: GetPropertiesGeographyFilters) => ({
    queryKey: [filters],
    queryFn: () => getPropertiesGeography(filters),
  }),
  totalDistributionByType: (
    filters: GetAssetTotalDistributionsByTypeFilters
  ) => ({
    queryKey: [filters],
    queryFn: () => getAssetTotalDistributionsByType(filters),
  }),
  totalDistributionByTypeTotals: (
    filters: GetAssetTotalDistributionsByTypeTotalsFilters
  ) => ({
    queryKey: [filters],
    queryFn: () => getAssetTotalDistributionByTypeTotals(filters),
  }),
  valuationsByAsset: (filters: GetValuationsByAssetFilters) => ({
    queryKey: [filters],
    queryFn: () => getValuationsByAsset(filters),
  }),
  valuationsByAssetTotals: (filters: GetValuationsByAssetTotalsFilters) => ({
    queryKey: [filters],
    queryFn: () => getValuationsByAssetTotals(filters),
  }),
  propertyDebtMetrics: (filters: GetPropertyDebtMetricsFilters) => ({
    queryKey: [filters],
    queryFn: () => getPropertyDebtMetrics(filters),
  }),
  leaseExpirationPortrait: (
    filters: GetAssetLeaseExpirationPortraitFilters
  ) => ({
    queryKey: [filters],
    queryFn: () => getAssetLeaseExpirationPortrait(filters),
  }),
  stakingPlan: (filters: GetAssetStakingPlanFilters) => ({
    queryKey: [filters],
    queryFn: () => getAssetStakingPlan(filters),
  }),
  rentRoll: (filters: GetAssetRentRollFilters) => ({
    queryKey: [filters],
    queryFn: () => getAssetRentRoll(filters),
  }),
});
