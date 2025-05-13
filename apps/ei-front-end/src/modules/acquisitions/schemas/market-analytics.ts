import { GenericAddressLatLongSchema } from "@/commons/schemas/addresses";
import { GenericXYDateChartSchema } from "@/commons/schemas/charts";
import { GeoFeatureSchema, LineStringSchema } from "@/commons/schemas/geojson";
import { dateRegex } from "@/commons/utils/dates";
import { AnyZodObject, z } from "zod";
import {
  COMPSTACK_COMP_TYPES,
  COMPSTACK_COMP_TYPES_WITH_ALL_KEY,
  COMP_TYPES,
  INDUSTRIAL_GEOGRAPHIES_TYPES,
} from "../utils";
import {
  compstackLeaseCompsTrendChartXAxisValues,
  compstackLeaseCompsTrendChartYAxisValues,
  financialMarketForwardCurvesChartsTypes,
  financialMarketForwardCurvesSOFRChartLabels,
  historicalHistoricalMacroEconomicIndicatorsChartTypes,
  historicalMarketOrSubMarketStatisticsChartTypes,
  historicalMarketStatisticsChartTypes,
  marketRentGrowthAndForecastChartLabels,
  marketRentGrowthAndForecastChartTypes,
} from "../utils/charts";

export const CompTypeSchema = z.enum(COMP_TYPES);

export const CompSharedInformationSchema = z
  .object({
    id: z.string(),
    type: CompTypeSchema.nullish(),
    date: z.string().nullish(),
    submarket: z.string().nullish(),
    created: z.string().nullish(),
    notes: z.string().nullish(),
    modified: z.string().nullish(),
  })
  .merge(GenericAddressLatLongSchema);

export const LeaseCompSchema = CompSharedInformationSchema.extend({
  tenant: z.string().nullish(),
  sf: z.number().nullish(),
  rent_sf_month: z.number().nullish(),
  recoveries: z.string().nullish(),
  type: z.literal(CompTypeSchema.Values.lease).nullish(),
});

export const TransitionalPropertySchema = CompSharedInformationSchema.extend({
  price: z.number().nullish(),
  sf: z.number().nullish(),
  price_sf: z.number().nullish(),
  cap_rate: z.number().nullish(),
  buyer: z.string().nullish(),
  seller: z.string().nullish(),
  type: z.literal(CompTypeSchema.Values.transitional_property).nullish(),
});

export const StabilizedPropertySchema = CompSharedInformationSchema.extend({
  price: z.number().nullish(),
  sf: z.number().nullish(),
  price_sf: z.number().nullish(),
  cap_rate: z.number().nullish(),
  buyer: z.string().nullish(),
  seller: z.string().nullish(),
  type: z.literal(CompTypeSchema.Values.stabilized_property).nullish(),
});

export const LandCompSchema = CompSharedInformationSchema.extend({
  price: z.number().nullish(),
  acres: z.number().nullish(),
  price_acre: z.number().nullish(),
  buildable_sf: z.number().nullish(),
  price_buildable_sf: z.number().nullish(),
  buyer: z.string().nullish(),
  seller: z.string().nullish(),
  type: z.literal(CompTypeSchema.Values.land).nullish(),
});

export const MarketRentCompSchema = CompSharedInformationSchema.extend({
  date: z.string().nullish(),
  address: z.string().nullish(),
  tenant: z.string().nullish(),
  sf: z.number().nullish(),
  price_sf: z.number().nullish(),
  cap_rate: z.number().nullish(),
  market_rent: z.number().nullish(),
});

export const CompSchema = z.union([
  LeaseCompSchema,
  TransitionalPropertySchema,
  StabilizedPropertySchema,
  LandCompSchema,
]);

export const LeaseCompTotalsSchema = z.object({
  rent_sf_month__wavg: z.number().nullish(),
});

export const TransitionalPropertyTotalsSchema = z.object({
  cap_rate__wavg: z.number().nullish(),
  price_sf__wavg: z.number().nullish(),
  sf__sum: z.number().nullish(),
  price__sum: z.number().nullish(),
});

export const StabilizedPropertyTotalsSchema = z.object({
  cap_rate__wavg: z.number().nullish(),
  price_sf__wavg: z.number().nullish(),
  sf__sum: z.number().nullish(),
  price__sum: z.number().nullish(),
});

export const LandCompTotalsSchema = z.object({
  price__sum: z.number().nullish(),
  acres__sum: z.number().nullish(),
  price_acre__wavg: z.number().nullish(),
  buildable_sf__sum: z.number().nullish(),
  price_buildable_sf__wavg: z.number().nullish(),
});

export const CompTotalsSchema = z.union([
  LeaseCompTotalsSchema,
  TransitionalPropertyTotalsSchema,
  StabilizedPropertyTotalsSchema,
  LandCompTotalsSchema,
]);

export const MarketAnalyticsKPIsSchema = z.object({
  market_size: z.number().nullish(),
  current_vacancy: z.number().nullish(),
  construction_size: z.number().nullish(),
  current_market_rent: z.number().nullish(),
});

export const CompstackCompsBaseTrendChartSchema = (
  properties: AnyZodObject
) => {
  return z.object({
    id: z.string(),
    x: z.string().regex(dateRegex),
    y: z.number(),
    lrx: z.string().regex(dateRegex),
    lry: z.number(),
    address: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    size: z.number().nullable(),
    properties: properties,
  });
};

export const CompstackLeaseCompsTrendChartSchema =
  CompstackCompsBaseTrendChartSchema(
    z.object({
      execution_date: z.string().regex(dateRegex).nullable(),
      transaction_sqft: z.number().nullable(),
      annual_starting_rent: z.number().nullable(),
      year_built: z.number().nullable(),
    })
  );

export const CompstackSalesCompsTrendChartSchema =
  CompstackCompsBaseTrendChartSchema(
    z.object({
      sale_price: z.number().nullable(),
      price_per_sf: z.number().nullable(),
      sales_date: z.string().regex(dateRegex).nullable(),
      sale_status: z.string().nullable(),
    })
  );

export const CompstackLandCompsTrendChartSchema =
  CompstackSalesCompsTrendChartSchema;

export const CompstackLeaseCompsTrendChartXAxisSchema = z.enum(
  compstackLeaseCompsTrendChartXAxisValues
);
export const CompstackLeaseCompsTrendChartYAxisSchema = z.enum(
  compstackLeaseCompsTrendChartYAxisValues
);
export const HistoricalMarketOrSubMarketStatisticsChartTypesSchema = z.enum(
  historicalMarketOrSubMarketStatisticsChartTypes
);
export const HistoricalMarketStatisticsChartTypesSchema = z.enum(
  historicalMarketStatisticsChartTypes
);
export const HistoricalMacroEconomicIndicatorsChartTypesSchema = z.enum(
  historicalHistoricalMacroEconomicIndicatorsChartTypes
);

export const FinancialMarketForwardCurvesChartsTypesSchema = z.enum(
  financialMarketForwardCurvesChartsTypes
);

export const FinancialMarketForwardCurvesSOFRChartSchema = z.object({
  label: z.enum(financialMarketForwardCurvesSOFRChartLabels),
  value: z.array(GenericXYDateChartSchema),
});

export const FinancialMarketForwardCurvesSOFRChartsSchema = z.array(
  FinancialMarketForwardCurvesSOFRChartSchema
);

export const HistoricalMarketStatisticsChartSupplyVSDemandSchema = z.object({
  x: z.number(),
  y: z.number(),
  period: z.string(),
  geography_name: z.string(),
  supply_constrained_score: z.number(),
  demand_resiliency_score: z.number(),
});

export const CompstackCompTypeSchema = z.enum(COMPSTACK_COMP_TYPES);
export const CompstackCompTypeWithAllKeySchema = z.enum(
  COMPSTACK_COMP_TYPES_WITH_ALL_KEY
);

export const CompstackCompsCommonFieldsSchema = z.object({
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  street_address: z.string().nullish(),
  zip_code: z.string().nullish(),
});

export const CompstackLeaseCompSchema = z
  .object({
    amps: z.string().nullish(),
    volts: z.string().nullish(),
    annual_starting_rent: z.number().nullish(),
    break_option_dates: z.string().nullish(),
    building_floors: z.number().nullish(),
    building_size: z.number().nullish(),
    clear_height: z.string().nullish(),
    commencement_date: z.string().nullish(),
    comments: z.string().nullish(),
    concessions_notes: z.string().nullish(),
    coverage_ratio: z.number().nullish(),
    current_landlord: z.string().nullish(),
    doors: z.number().nullish(),
    execution_date: z.string().nullish(),
    expiration_date: z.string().nullish(),
    free_rent_years: z.number().nullish(),
    free_rent_months: z.number().nullish(),
    landlord_brokerage_firms: z.string().nullish(),
    landlord_brokers: z.string().nullish(),
    lease_comp_id: z.string(),
    lease_term_years: z.number().nullish(),
    lease_term_months: z.number().nullish(),
    lease_type: z.string().nullish(),
    loading_docks: z.number().nullish(),
    lot_size: z.number().nullish(),
    office_portion: z.number().nullish(),
    parking_notes: z.string().nullish(),
    parking_ratio: z.string().nullish(),
    rail: z.string().nullish(),
    renewal_options: z.string().nullish(),
    rent_escalation: z.string().nullish(),
    rent_escalation_type: z.string().nullish(),
    sprinkler: z.string().nullish(),
    suite: z.string().nullish(),
    tenant_brokerage_firms: z.string().nullish(),
    tenant_brokers: z.string().nullish(),
    tenant_industry: z.string().nullish(),
    tenant_name: z.string().nullish(),
    tenant_websites: z.string().nullish(),
    transaction_sqft: z.number().nullish(),
    transaction_type: z.string().nullish(),
    type: z.literal(CompstackCompTypeSchema.Values.lease),
    updated_at: z.string().nullish(),
    work_value: z.number().nullish(),
    year_built: z.number().nullish(),
    year_renovated: z.number().nullish(),
    monthly_rent: z.number().nullish(),
  })
  .merge(CompstackCompsCommonFieldsSchema);

export const CompstackSaleAndLandCompsCommonSchema = z
  .object({
    in_place_cap_rate: z.number().nullish(),
    age: z.number().nullish(),
    amenities: z.string().nullish(),
    asking_price: z.number().nullish(),
    building_condition: z.string().nullish(),
    building_operating_expenses: z.string().nullish(),
    building_tax_expenses: z.string().nullish(),
    buyer_contact: z.string().nullish(),
    buyer_true_company: z.string().nullish(),
    buyer_true_contact: z.string().nullish(),
    buyer_true_origin: z.string().nullish(),
    buyers_broker_agent_first_name: z.string().nullish(),
    buyers_broker_agent_last_name: z.string().nullish(),
    buyers_broker_company: z.string().nullish(),
    comp_sk: z.string().nullish(),
    down_payment: z.number().nullish(),
    hold_period_months: z.number().nullish(),
    hold_period_years: z.number().nullish(),
    id: z.string(),
    listing_broker_agent_first_name: z.string().nullish(),
    listing_broker_agent_last_name: z.string().nullish(),
    listing_broker_company: z.string().nullish(),
    location_type: z.string().nullish(),
    market_time: z.number().nullish(),
    multi_sale_name: z.string().nullish(),
    net_income: z.number().nullish(),
    non_arms_length_reasons: z.string().nullish(),
    number_of_floors: z.number().nullish(),
    percent_leased: z.number().nullish(),
    portfolio_name: z.string().nullish(),
    price_per_ac_land: z.number().nullish(),
    price_per_sf: z.number().nullable(),
    price_per_sf_land: z.number().nullish(),
    price_per_sf_net: z.number().nullish(),
    imputed_cap_rate: z.number().nullish(),
    property_id: z.string().nullish(),
    recording_date: z.string().nullish(),
    sale_condition: z.string().nullish(),
    sale_price: z.number().nullable(),
    sale_price_comment: z.string().nullish(),
    sale_status: z.string().nullish(),
    sales_date: z.string().nullable(),
    secondary_type: z.string().nullish(),
    seller_company: z.string().nullish(),
    seller_contact: z.string().nullish(),
    seller_true_company: z.string().nullish(),
    seller_true_contact: z.string().nullish(),
    seller_true_origin: z.string().nullish(),
    size: z.number().nullable(),
    star_rating: z.string().nullish(),
    total_expense_amount: z.number().nullish(),
    transaction_notes: z.string().nullish(),
    typical_floor_sf: z.number().nullish(),
    year_built: z.number().nullish(),
    is_part_of_multi_property: z.boolean().nullish(),
    is_part_of_portfolio: z.boolean().nullish(),
  })
  .merge(CompstackCompsCommonFieldsSchema);

export const CompstackSalesCompSchema = z
  .object({
    type: z.literal(CompstackCompTypeSchema.Values.sale),
    year_built: z.number().nullish(),
  })
  .merge(CompstackSaleAndLandCompsCommonSchema);

export const CompstackLandCompSchema = z
  .object({
    type: z.literal(CompstackCompTypeSchema.Values.land),
  })
  .merge(CompstackSaleAndLandCompsCommonSchema);

export const CompstackLeaseCompPayloadSchema = CompstackLeaseCompSchema;

export const CompstackSalesCompPayloadSchema = CompstackSalesCompSchema.omit({
  age: true,
  amenities: true,
  building_condition: true,
  hold_period_months: true,
  hold_period_years: true,
  location_type: true,
  market_time: true,
  multi_sale_name: true,
  non_arms_length_reasons: true,
  number_of_floors: true,
  price_per_ac_land: true,
  price_per_sf_land: true,
  sale_status: true,
  secondary_type: true,
  star_rating: true,
  typical_floor_sf: true,
});

export const CompstackLandCompPayloadSchema = CompstackLandCompSchema.omit({
  age: true,
  amenities: true,
  building_condition: true,
  hold_period_months: true,
  hold_period_years: true,
  location_type: true,
  market_time: true,
  multi_sale_name: true,
  non_arms_length_reasons: true,
  number_of_floors: true,
  price_per_ac_land: true,
  price_per_sf_land: true,
  sale_status: true,
  secondary_type: true,
  star_rating: true,
  typical_floor_sf: true,
});

export const CompstackSaleAndLandCompsCommonPayloadSchema =
  CompstackSaleAndLandCompsCommonSchema.omit({
    age: true,
    amenities: true,
    building_condition: true,
    hold_period_months: true,
    hold_period_years: true,
    location_type: true,
    market_time: true,
    multi_sale_name: true,
    non_arms_length_reasons: true,
    number_of_floors: true,
    price_per_ac_land: true,
    price_per_sf_land: true,
    sale_status: true,
    secondary_type: true,
    star_rating: true,
    typical_floor_sf: true,
  });

export const CompstackCompSchema = z.union([
  CompstackLeaseCompSchema,
  CompstackSalesCompSchema,
  CompstackLandCompSchema,
]);

export const CompstackCompIdSchema = z.union([
  CompstackLeaseCompSchema.shape.lease_comp_id,
  CompstackSalesCompSchema.shape.id,
  CompstackLandCompSchema.shape.id,
]);

export const PropertyWarehouseSchema = z.object({
  amps: z.string().nullish(),
  building_floors: z.number().nullish(),
  building_size: z.number().nullish(),
  city: z.string().nullish(),
  clear_height: z.string().nullish(),
  coverage_ratio: z.number().nullish(),
  current_landlord: z.string().nullish(),
  doors: z.number().nullish(),
  latitude: z.string().nullish(),
  loading_docks: z.number().nullish(),
  longitude: z.string().nullish(),
  lot_size: z.string().nullish(),
  office_portion: z.number().nullish(),
  parking_notes: z.string().nullish(),
  parking_ratio: z.string().nullish(),
  property_id: z.string().nullish(),
  rail: z.string().nullish(),
  sprinkler: z.string().nullish(),
  state: z.string().nullish(),
  street_address: z.string().nullish(),
  updated_at: z.string().nullish(),
  volts: z.string().nullish(),
  year_built: z.number().nullish(),
  year_renovated: z.number().nullish(),
  zip_code: z.string().nullish(),
});

export const CompstackLeaseCompsTotalsSchema = z.object({
  annual_starting_rent__avg: z.number().nullable(),
});

export const CompstackSaleCompsTotalsSchema = z.object({
  in_place_cap_rate__avg: z.number().nullable(),
  price_per_sf__avg: z.number().nullable(),
});

export const CompstackLandCompsTotalsSchema = z.object({
  in_place_cap_rate__avg: z.number().nullable(),
  price_per_sf__avg: z.number().nullable(),
});

export const IndustrialGeographiesType = z.enum(INDUSTRIAL_GEOGRAPHIES_TYPES);

export const IndustrialGeographiesPropertiesSchema = z.object({
  geography_name: z.string(),
  geography_type: IndustrialGeographiesType,
  centroid: z.array(z.number()).length(2),
});

export const IndustrialGeographiesMetricsSchema = z.object({
  vacancy_rate: z.number().nullable(),
  leasing_activity: z.number().nullable(),
  construction_size: z.number().nullable(),
  supply_growth: z.number().nullable(),
  parcel_vacancy_rate: z.number().nullable(),
  land_vacancy_rate: z.number().nullable(),
});

export const IndustrialGeographiesMetricsKeysSchema = z.enum(
  Object.keys(IndustrialGeographiesMetricsSchema.shape) as [
    keyof typeof IndustrialGeographiesMetricsSchema.shape
  ]
);

export const IndustrialGeographiesPropertiesWithMetricsSchema =
  IndustrialGeographiesPropertiesSchema.merge(
    IndustrialGeographiesMetricsSchema
  );

export const IndustrialGeographiesSchema = GeoFeatureSchema({
  properties: IndustrialGeographiesPropertiesSchema,
});

export const IndustrialGeographiesWithMetricsSchema = GeoFeatureSchema({
  properties: IndustrialGeographiesPropertiesWithMetricsSchema,
});

export const MarketRentGrowthAndForecastChartTypeSchema = z.enum(
  marketRentGrowthAndForecastChartTypes
);

export const MarketRentGrowthAndForecastChartSchema = z.object({
  label: z.enum(marketRentGrowthAndForecastChartLabels),
  value: z.array(z.object({ x: z.string().regex(dateRegex), y: z.number() })),
});

export const MarketRentGrowthAndForecastChartsSchema = z.array(
  MarketRentGrowthAndForecastChartSchema
);

export const CapRateSchema = z.object({
  label: z.string(),
  value: z.array(z.object({ x: z.string().regex(dateRegex), y: z.number() })),
});

export const CapRatesSchema = z.array(CapRateSchema);

export const LeaseCompPayloadSchema = CompstackLeaseCompSchema.omit({
  type: true,
  lease_comp_id: true,
  latitude: true,
  longitude: true,
});

export const LandCompPayloadSchema = CompstackLandCompSchema.omit({
  type: true,
  lease_comp_id: true,
  latitude: true,
  longitude: true,
});

export const SaleCompPayloadSchema = CompstackSalesCompSchema.omit({
  type: true,
  lease_comp_id: true,
  latitude: true,
  longitude: true,
});

export const DrivingRoutePropertiesSchema = z.object({
  name: z.string(),
  result_duration: z.string().nullish(),
  result_miles_length: z.number().nullish(),
});

export const DrivingRouteFeatureSchema = GeoFeatureSchema({
  properties: DrivingRoutePropertiesSchema,
  geometry: LineStringSchema,
});

export const DealCustomerAccessSchema = z.object({
  median_age: z.number().nullish(),
  total_population: z.number().nullish(),
  total_businesses: z.number().nullish(),
  median_disposable_income: z.number().nullish(),
  median_household_income: z.number().nullish(),
  retail_sales: z.number().nullish(),
  median_net_worth: z.number().nullish(),
  population_density: z.number().nullish(),
  to_break: z.number().nullish(),
});
