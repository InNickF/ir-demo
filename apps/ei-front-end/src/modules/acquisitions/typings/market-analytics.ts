import { z } from "zod";
import {
  CapRateSchema,
  CapRatesSchema,
  CompSchema,
  CompSharedInformationSchema,
  CompTotalsSchema,
  CompTypeSchema,
  CompstackCompIdSchema,
  CompstackCompTypeSchema,
  CompstackCompTypeWithAllKeySchema,
  CompstackLeaseCompsTotalsSchema,
  CompstackLeaseCompsTrendChartSchema,
  CompstackSalesCompsTrendChartSchema,
  DealCustomerAccessSchema,
  DrivingRouteFeatureSchema,
  DrivingRoutePropertiesSchema,
  FinancialMarketForwardCurvesSOFRChartsSchema,
  HistoricalMarketStatisticsChartSupplyVSDemandSchema,
  IndustrialGeographiesPropertiesSchema,
  IndustrialGeographiesPropertiesWithMetricsSchema,
  IndustrialGeographiesSchema,
  IndustrialGeographiesWithMetricsSchema,
  LandCompPayloadSchema,
  LandCompSchema,
  LandCompTotalsSchema,
  LeaseCompPayloadSchema,
  LeaseCompSchema,
  LeaseCompTotalsSchema,
  MarketAnalyticsKPIsSchema,
  MarketRentCompSchema,
  MarketRentGrowthAndForecastChartsSchema,
  MarketRentGrowthAndForecastChartTypeSchema,
  PropertyWarehouseSchema,
  SaleCompPayloadSchema,
  StabilizedPropertySchema,
  StabilizedPropertyTotalsSchema,
  TransitionalPropertySchema,
  TransitionalPropertyTotalsSchema,
  CompstackSalesCompSchema,
  CompstackLandCompSchema,
  CompstackLeaseCompSchema,
  CompstackCompSchema,
  CompstackCompsCommonFieldsSchema,
  CompstackSaleAndLandCompsCommonSchema,
  CompstackLeaseCompPayloadSchema,
  CompstackSalesCompPayloadSchema,
  CompstackLandCompPayloadSchema,
  CompstackSaleAndLandCompsCommonPayloadSchema,
} from "../schemas/market-analytics";

export type CompType = z.infer<typeof CompTypeSchema>;

export type CompSharedInformation = z.infer<typeof CompSharedInformationSchema>;

export type LeaseComp = z.infer<typeof LeaseCompSchema>;

export type TransitionalProperty = z.infer<typeof TransitionalPropertySchema>;

export type StabilizedProperty = z.infer<typeof StabilizedPropertySchema>;

export type LandComp = z.infer<typeof LandCompSchema>;

export type MarketRentCompSchema = z.infer<typeof MarketRentCompSchema>;

export type Comp = z.infer<typeof CompSchema>;

export type LeaseCompTotals = z.infer<typeof LeaseCompTotalsSchema>;

export type TransitionalPropertyTotals = z.infer<
  typeof TransitionalPropertyTotalsSchema
>;

export type StabilizedPropertyTotals = z.infer<
  typeof StabilizedPropertyTotalsSchema
>;

export type LandCompTotals = z.infer<typeof LandCompTotalsSchema>;

export type CompTotals = z.infer<typeof CompTotalsSchema>;

export type MarketAnalyticsKPIs = z.infer<typeof MarketAnalyticsKPIsSchema>;

export type CompstackLeaseCompsTrendChart = z.infer<
  typeof CompstackLeaseCompsTrendChartSchema
>;

export type CompstackSalesCompsTrendChart = z.infer<
  typeof CompstackSalesCompsTrendChartSchema
>;

export type CompstackLandCompsTrendChart = z.infer<
  typeof CompstackSalesCompsTrendChartSchema
>;

export type GenericCompstackCompTrendChartElement =
  | CompstackLeaseCompsTrendChart
  | CompstackSalesCompsTrendChart
  | CompstackLandCompsTrendChart;

export type HistoricalMarketStatisticsChartSupplyVSDemand = z.infer<
  typeof HistoricalMarketStatisticsChartSupplyVSDemandSchema
>;

export interface FiltersByDistance {
  distance: number;
  longitude: number;
  latitude: number;
}

export interface FiltersBySubMarket {
  submarket: string;
}
export interface FiltersByMarket {
  market: string;
}
export interface FiltersByDistancePayload {
  distance: string;
  longitude: string;
  latitude: string;
}

export type CompstackCompType = z.infer<typeof CompstackCompTypeSchema>;

export type CompstackCompsCommonFields = z.infer<
  typeof CompstackCompsCommonFieldsSchema
>;

export type CompstackCompTypeWithAllKey = z.infer<
  typeof CompstackCompTypeWithAllKeySchema
>;

export type CompstackComp = z.infer<typeof CompstackCompSchema>;

export type CompstackLeaseComp = z.infer<typeof CompstackLeaseCompSchema>;

export type CompstackSalesComp = z.infer<typeof CompstackSalesCompSchema>;

export type CompstackLandComp = z.infer<typeof CompstackLandCompSchema>;

export type CompstackSaleAndLandCompsCommon = z.infer<
  typeof CompstackSaleAndLandCompsCommonSchema
>;

export type CompstackCompId = z.infer<typeof CompstackCompIdSchema>;

export type CompstackLeaseCompPayload = z.infer<
  typeof CompstackLeaseCompPayloadSchema
>;

export type CompstackSalesCompPayload = z.infer<
  typeof CompstackSalesCompPayloadSchema
>;

export type CompstackLandCompPayload = z.infer<
  typeof CompstackLandCompPayloadSchema
>;

export type CompstackSaleAndLandCompsCommonPayload = z.infer<
  typeof CompstackSaleAndLandCompsCommonPayloadSchema
>;

export type PropertyWarehouse = z.infer<typeof PropertyWarehouseSchema>;

export type CompstackLeaseCompsTotals = z.infer<
  typeof CompstackLeaseCompsTotalsSchema
>;

export type CompstackCompKeysByType = {
  lease: CompstackLeaseComp;
  sale: CompstackSalesComp;
  land: CompstackLandComp;
};

export type CompstackCompKeysArrayByType = {
  lease: Array<keyof CompstackLeaseComp>;
  sale: Array<keyof CompstackSalesComp>;
  land: Array<keyof CompstackLandComp>;
};

export type CompstackCompKeysPayloadByType = {
  lease: CompstackLeaseCompPayload;
  sale: CompstackSalesCompPayload;
  land: CompstackLandCompPayload;
};

export type CompstackCompKeysPayloadArrayByType = {
  lease: Array<keyof CompstackLeaseCompPayload>;
  sale: Array<keyof CompstackSalesCompPayload>;
  land: Array<keyof CompstackLandCompPayload>;
};

export type FinancialMarketForwardCurvesSOFRCharts = z.infer<
  typeof FinancialMarketForwardCurvesSOFRChartsSchema
>;

export type IndustrialGeographiesProperties = z.infer<
  typeof IndustrialGeographiesPropertiesSchema
>;

export type IndustrialGeographiesMetrics = z.infer<
  typeof IndustrialGeographiesPropertiesSchema
>;

export type IndustrialGeographiesPropertiesWithMetrics = z.infer<
  typeof IndustrialGeographiesPropertiesWithMetricsSchema
>;

export type IndustrialGeographies = z.infer<typeof IndustrialGeographiesSchema>;

export type IndustrialGeographiesWithMetrics = z.infer<
  typeof IndustrialGeographiesWithMetricsSchema
>;

export type MarketRentGrowthAndForecastChartType = z.infer<
  typeof MarketRentGrowthAndForecastChartTypeSchema
>;

export type MarketRentGrowthAndForecastCharts = z.infer<
  typeof MarketRentGrowthAndForecastChartsSchema
>;

export type LeaseCompPayload = z.infer<typeof LeaseCompPayloadSchema>;

export type LandCompPayload = z.infer<typeof LandCompPayloadSchema>;

export type SaleCompPayload = z.infer<typeof SaleCompPayloadSchema>;

export type DrivingRouteProperties = z.infer<
  typeof DrivingRoutePropertiesSchema
>;
export type DrivingRouteFeature = z.infer<typeof DrivingRouteFeatureSchema>;

export type DealCustomerAccess = z.infer<typeof DealCustomerAccessSchema>;

export type CapRate = z.infer<typeof CapRateSchema>;

export type CapRates = z.infer<typeof CapRatesSchema>;
