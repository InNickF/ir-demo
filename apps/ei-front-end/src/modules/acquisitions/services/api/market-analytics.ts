import {
  CapRatesSchema,
  CompSchema,
  CompTotalsSchema,
  CompstackCompSchema,
  CompstackLandCompPayloadSchema,
  CompstackLandCompsTotalsSchema,
  CompstackLandCompsTrendChartSchema,
  CompstackLeaseCompPayloadSchema,
  CompstackLeaseCompsTotalsSchema,
  CompstackLeaseCompsTrendChartSchema,
  CompstackLeaseCompsTrendChartXAxisSchema,
  CompstackLeaseCompsTrendChartYAxisSchema,
  CompstackSaleCompsTotalsSchema,
  CompstackSalesCompPayloadSchema,
  CompstackSalesCompsTrendChartSchema,
  DealCustomerAccessSchema,
  DrivingRouteFeatureSchema,
  FinancialMarketForwardCurvesChartsTypesSchema,
  FinancialMarketForwardCurvesSOFRChartsSchema,
  HistoricalMacroEconomicIndicatorsChartTypesSchema,
  HistoricalMarketOrSubMarketStatisticsChartTypesSchema,
  HistoricalMarketStatisticsChartSupplyVSDemandSchema,
  HistoricalMarketStatisticsChartTypesSchema,
  IndustrialGeographiesSchema,
  IndustrialGeographiesWithMetricsSchema,
  LandCompSchema,
  LandCompTotalsSchema,
  LeaseCompSchema,
  LeaseCompTotalsSchema,
  MarketAnalyticsKPIsSchema,
  MarketRentGrowthAndForecastChartsSchema,
  PropertyWarehouseSchema,
  StabilizedPropertySchema,
  StabilizedPropertyTotalsSchema,
  TransitionalPropertySchema,
  TransitionalPropertyTotalsSchema,
} from "@/acquisitions/schemas/market-analytics";
import { Deal } from "@/acquisitions/typings/deals";
import {
  CapRates,
  Comp,
  CompTotals,
  CompstackComp,
  CompstackCompKeysByType,
  CompstackCompType,
  DrivingRouteFeature,
  FiltersByDistancePayload,
  FiltersByMarket,
  FiltersBySubMarket,
  IndustrialGeographiesProperties,
  LandCompPayload,
  LeaseCompPayload,
  MarketRentGrowthAndForecastChartType,
  SaleCompPayload,
} from "@/acquisitions/typings/market-analytics";
import { GenericXYDateChartSchema } from "@/commons/schemas/charts";
import { PaginatedResponseSchema } from "@/commons/schemas/filters";
import { privateAxios } from "@/commons/services/clients";
import {
  GenericFilterPayload,
  IPaginatedResponse,
  PaginatedResponse,
} from "@/commons/typings";
import { setNullEmptyStrings } from "@/commons/utils";
import { querySerializer } from "@/commons/utils/query-serializer";
import { FiltersPayloadType } from "in-ui-react";
import { z } from "zod";

export const getComps = async (filters: GenericFilterPayload) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/acquisitions/comps/${serializedQuery}`
  );

  return PaginatedResponseSchema(CompSchema).parse(response.data);
};

export const getCompsByType = async <T extends Comp>(
  filters: GenericFilterPayload & { type: Comp["type"] }
) => {
  if (!filters?.type) {
    throw new Error("Comp type is required.");
  }
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/acquisitions/comps/${serializedQuery}`
  );

  if (filters.type === "lease") {
    return PaginatedResponseSchema(LeaseCompSchema).parse(
      response.data
    ) as IPaginatedResponse<T>;
  }

  if (filters.type === "transitional_property") {
    return PaginatedResponseSchema(TransitionalPropertySchema).parse(
      response.data
    ) as IPaginatedResponse<T>;
  }

  if (filters.type === "land") {
    return PaginatedResponseSchema(LandCompSchema).parse(
      response.data
    ) as IPaginatedResponse<T>;
  }

  if (filters.type === "stabilized_property") {
    return PaginatedResponseSchema(StabilizedPropertySchema).parse(
      response.data
    ) as IPaginatedResponse<T>;
  }

  return PaginatedResponseSchema(CompSchema).parse(
    response.data
  ) as IPaginatedResponse<T>;
};

export const postComp = async <T extends Comp>(comp: T) => {
  if (!comp?.type) {
    throw new Error("Comp type is required.");
  }

  const payload = setNullEmptyStrings(comp);
  const response = await privateAxios.post("/acquisitions/comps/", payload);

  if (comp.type === "lease") {
    return LeaseCompSchema.parse(response.data) as T;
  }

  if (comp.type === "transitional_property") {
    return TransitionalPropertySchema.parse(response.data) as T;
  }

  if (comp.type === "land") {
    return LandCompSchema.parse(response.data) as T;
  }

  if (comp.type === "stabilized_property") {
    return StabilizedPropertySchema.parse(response.data) as T;
  }

  return CompSchema.parse(response.data) as T;
};

export const patchComp = async <T extends Comp>(comp: T) => {
  const { id, ...rest } = comp;

  const payload = setNullEmptyStrings(rest);
  const response = await privateAxios.patch(
    `/acquisitions/comps/${id}`,
    payload
  );

  return CompSchema.parse(response.data) as T;
};

export const deleteComp = async (comp: string | Comp) => {
  const compId = typeof comp === "string" ? comp : comp.id;
  const response = await privateAxios.delete(`/acquisitions/comps/${compId}`);
  return response.data as string;
};

export const getCompTotals = async (filters: GenericFilterPayload) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/acquisitions/comps/summary/${serializedQuery}`
  );
  return z.array(CompTotalsSchema).parse(response.data);
};

export const getCompTotalsByType = async <T extends CompTotals>(
  filters: GenericFilterPayload & { type: Comp["type"] }
) => {
  if (!filters?.type) {
    throw new Error("Comp type is required.");
  }
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/acquisitions/comps/summary/${serializedQuery}`
  );

  if (filters.type === "lease") {
    return LeaseCompTotalsSchema.parse(response.data) as T;
  }

  if (filters.type === "transitional_property") {
    return TransitionalPropertyTotalsSchema.parse(response.data) as T;
  }

  if (filters.type === "land") {
    return LandCompTotalsSchema.parse(response.data) as T;
  }

  if (filters.type === "stabilized_property") {
    return StabilizedPropertyTotalsSchema.parse(response.data) as T;
  }

  return CompTotalsSchema.parse(response.data) as T;
};

export type GetMarketAnalyticsKPIsFilters =
  | (GenericFilterPayload & FiltersByMarket)
  | (GenericFilterPayload & FiltersBySubMarket);
export const getMarketAnalyticsKPIs = async (
  filters: GetMarketAnalyticsKPIsFilters
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data/historical-market-statistics/overview-kpis/${serializedQuery}`
  );
  return MarketAnalyticsKPIsSchema.parse(response.data);
};

export interface GetCompstackCompsFiltersBase extends FiltersPayloadType {
  price?: {
    from_price?: string;
    to_price?: string;
  };
  age?: {
    from_age?: string;
    to_age?: string;
  };
  sf?: {
    from_sf?: string;
    to_sf?: string;
  };
  date?: {
    from_date?: string;
    to_date?: string;
  };
}
interface GetCompstackCompsFiltersByMarket
  extends GetCompstackCompsFiltersBase,
    FiltersByMarket {}
interface GetCompstackCompsFiltersBySubmarket
  extends GetCompstackCompsFiltersBase,
    FiltersBySubMarket {}

export type GetCompstackCompsFilters =
  | GetCompstackCompsFiltersByMarket
  | GetCompstackCompsFiltersBySubmarket;

export const getCompstackLeaseComps = async (
  filters: GetCompstackCompsFilters,
  signal: AbortSignal
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data/lease-comps/${serializedQuery}`,
    { signal }
  );
  return PaginatedResponseSchema(CompstackLeaseCompPayloadSchema).parse(
    response.data
  );
};

export const getCompstackSalesComps = async (
  filters: GetCompstackCompsFilters,
  signal: AbortSignal
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data/sale-comps/${serializedQuery}`,
    { signal }
  );
  return PaginatedResponseSchema(CompstackSalesCompPayloadSchema).parse(
    response.data
  );
};

export const getCompstackLandComps = async (
  filters: GetCompstackCompsFilters,
  signal: AbortSignal
) => {
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/data/land-comps/${serializedQuery}`,
    { signal }
  );

  return PaginatedResponseSchema(CompstackLandCompPayloadSchema).parse(
    response.data
  );
};

export interface GetAllCompstackCompsFiltersBase
  extends GetCompstackCompsFiltersBase {
  type: CompstackCompType | "all";
}

export type GetAllCompstackCompsFilters =
  | (GetCompstackCompsFiltersByMarket & GetAllCompstackCompsFiltersBase)
  | (GetCompstackCompsFiltersBySubmarket & GetAllCompstackCompsFiltersBase);

export const getAllCompstackComps = async (
  filters: GetAllCompstackCompsFilters,
  signal: AbortSignal
): Promise<CompstackComp[]> => {
  const calls: Record<
    GetAllCompstackCompsFiltersBase["type"],
    (filters: GetCompstackCompsFilters) => Promise<CompstackComp[]>
  > = {
    all: async (filters) => {
      const [leaseComps, salesComps, landComps] = await Promise.all([
        getCompstackLeaseComps(filters, signal),
        getCompstackSalesComps(filters, signal),
        getCompstackLandComps(filters, signal),
      ]);
      return z
        .array(CompstackCompSchema)
        .parse([
          ...leaseComps.results,
          ...salesComps.results,
          ...landComps.results,
        ]);
    },
    lease: async (filters) => {
      const leaseComps = await getCompstackLeaseComps(filters, signal);
      return leaseComps.results;
    },
    sale: async (filters) => {
      const salesComps = await getCompstackSalesComps(filters, signal);
      return salesComps.results;
    },
    land: async (filters) => {
      const landComps = await getCompstackLandComps(filters, signal);
      return landComps.results;
    },
  };
  const finalType: GetAllCompstackCompsFiltersBase["type"] =
    filters?.type || "all";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { type, ...restFilters } = filters;
  return calls[finalType]({ ...restFilters, page_size: "-1" });
};

export interface GetCompstackCompTotalsFilters extends GenericFilterPayload {
  deal?: Deal["id"];
}
export const getCompstackLeaseCompTotals = async (
  filters: GetCompstackCompTotalsFilters,
  signal: AbortSignal
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data/lease-comps/summary/${serializedQuery}`,
    { signal }
  );
  return CompstackLeaseCompsTotalsSchema.parse(response.data);
};

export const getCompstackSaleCompTotals = async (
  filters: GetCompstackCompTotalsFilters,
  signal: AbortSignal
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data/sale-comps/summary/${serializedQuery}`,
    { signal }
  );
  return CompstackSaleCompsTotalsSchema.parse(response.data);
};

export const getCompstackLandCompTotals = async (
  filters: GetCompstackCompTotalsFilters,
  signal: AbortSignal
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data/land-comps/summary/${serializedQuery}`,
    { signal }
  );
  return CompstackLandCompsTotalsSchema.parse(response.data);
};

export interface CompstackLeaseCompsTrendChartAxisFilters
  extends GetCompstackCompsFiltersBase {
  x_axis: z.infer<typeof CompstackLeaseCompsTrendChartXAxisSchema>;
  y_axis: z.infer<typeof CompstackLeaseCompsTrendChartYAxisSchema>;
}
interface CompstackLeaseCompsTrendChartFiltersByMarket
  extends CompstackLeaseCompsTrendChartAxisFilters,
    FiltersByMarket {}
interface CompstackLeaseCompsTrendChartFiltersBySubmarket
  extends CompstackLeaseCompsTrendChartAxisFilters,
    FiltersBySubMarket {}

export type CompstackLeaseCompsTrendChartFilters =
  | CompstackLeaseCompsTrendChartFiltersByMarket
  | CompstackLeaseCompsTrendChartFiltersBySubmarket;

export const getCompstackLeaseCompsTrendChart = async (
  filters: CompstackLeaseCompsTrendChartFilters,
  signal: AbortSignal
) => {
  const serializedQuery = querySerializer({
    type: "market-rent",
    ...filters,
  });

  const response = await privateAxios.get(
    `/data/lease-comps/charts/${serializedQuery}`,
    {
      signal,
    }
  );
  return z.array(CompstackLeaseCompsTrendChartSchema).parse(response.data);
};

interface GetCompstackSaleCompsTrendFiltersByMarket
  extends FiltersByMarket,
    GetCompstackCompsFiltersBase {}

interface GetCompstackSaleCompsTrendFiltersBySubmarket
  extends FiltersBySubMarket,
    GetCompstackCompsFiltersBase {}

export type GetCompstackSaleCompsTrendFilters =
  | GetCompstackSaleCompsTrendFiltersByMarket
  | GetCompstackSaleCompsTrendFiltersBySubmarket;

export const getCompstackSaleCompsTrend = async (
  filters: GetCompstackSaleCompsTrendFilters,
  signal: AbortSignal
) => {
  const serializedQuery = querySerializer({ type: "trends", ...filters });

  const response = await privateAxios.get(
    `/data/sale-comps/charts/${serializedQuery}`,
    {
      signal,
    }
  );
  return z.array(CompstackSalesCompsTrendChartSchema).parse(response.data);
};

interface GetCompstackLandCompsTrendFiltersByMarket
  extends FiltersByMarket,
    GetCompstackCompsFiltersBase {}
interface GetCompstackLandCompsTrendFiltersBySubmarket
  extends FiltersBySubMarket,
    GetCompstackCompsFiltersBase {}

export type GetCompstackLandCompsTrendFilters =
  | GetCompstackLandCompsTrendFiltersByMarket
  | GetCompstackLandCompsTrendFiltersBySubmarket;

export const getCompstackLandCompsTrend = async (
  filters: GetCompstackLandCompsTrendFilters,
  signal: AbortSignal
) => {
  const serializedQuery = querySerializer({ type: "trends", ...filters });
  const response = await privateAxios.get(
    `/data/land-comps/charts/${serializedQuery}`,
    { signal }
  );
  return z.array(CompstackLandCompsTrendChartSchema).parse(response.data);
};

export interface GetHistoricalMarketOrSubMarketStatisticsChartFilters
  extends GenericFilterPayload,
    Partial<FiltersByMarket>,
    Partial<FiltersBySubMarket> {
  type: z.infer<typeof HistoricalMarketOrSubMarketStatisticsChartTypesSchema>;
}
export const getHistoricalMarketOrSubMarketStatisticsChart = async (
  filters: GetHistoricalMarketOrSubMarketStatisticsChartFilters,
  signal: AbortSignal
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data/historical-market-statistics/charts/${serializedQuery}`,
    { signal }
  );
  return z.array(GenericXYDateChartSchema).parse(response.data);
};

export interface GetHistoricalMarketStatisticsChartFilters
  extends GenericFilterPayload,
    FiltersByMarket {
  type: z.infer<typeof HistoricalMarketStatisticsChartTypesSchema>;
}
export const getHistoricalMarketStatisticsChart = async (
  filters: GetHistoricalMarketStatisticsChartFilters,
  signal: AbortSignal
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data/historical-market-statistics/charts/${serializedQuery}`,
    { signal }
  );
  return z.array(GenericXYDateChartSchema).parse(response.data);
};

export interface GetHistoricalMarketStatisticsChartSupplyVSDemandFilters
  extends GenericFilterPayload {
  submarket?: string;
  last_period?: "true" | "false";
}
export const getHistoricalMarketStatisticsChartSupplyVSDemand = async (
  {
    last_period = "true",
    ...filters
  }: GetHistoricalMarketStatisticsChartSupplyVSDemandFilters,
  signal: AbortSignal
) => {
  const serializedQuery = querySerializer({
    type: "supply-vs-demand",
    last_period,
    ...filters,
  });
  const response = await privateAxios.get(
    `/data/historical-market-statistics/charts/${serializedQuery}`,
    { signal }
  );
  return z
    .array(HistoricalMarketStatisticsChartSupplyVSDemandSchema)
    .parse(response.data);
};

export interface GetHistoricalMacroEconomicIndicatorsChartFilters
  extends GenericFilterPayload,
    Partial<FiltersByMarket>,
    Partial<FiltersBySubMarket> {
  type: z.infer<typeof HistoricalMacroEconomicIndicatorsChartTypesSchema>;
}
export const getHistoricalMacroEconomicIndicatorsChart = async (
  filters: GetHistoricalMacroEconomicIndicatorsChartFilters,
  signal: AbortSignal
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data/historical-macroeconomic-indicators/charts/${serializedQuery}`,
    { signal }
  );
  return z.array(GenericXYDateChartSchema).parse(response.data);
};

export type GetPropertiesWarehousesFilters =
  | (GenericFilterPayload & FiltersBySubMarket)
  | (GenericFilterPayload & FiltersByDistancePayload)
  | (GenericFilterPayload & FiltersByMarket);

export const getPropertiesWarehouses = async (
  filters: GetPropertiesWarehousesFilters
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data/properties/${serializedQuery}`
  );
  return PaginatedResponseSchema(PropertyWarehouseSchema).parse(response.data);
};

export interface GetFinancialMarketForwardCurvesFilters
  extends GenericFilterPayload {
  type: z.infer<typeof FinancialMarketForwardCurvesChartsTypesSchema>;
}
export const getFinancialMarketForwardCurves = async (
  filters: GetFinancialMarketForwardCurvesFilters
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data/financial-market-forward-curves/charts/${serializedQuery}`
  );

  if (filters.type === "sofr") {
    return FinancialMarketForwardCurvesSOFRChartsSchema.parse(response.data);
  }

  return z.array(GenericXYDateChartSchema).parse(response.data);
};

export interface GetIndustrialGeographiesBaseFilters<T extends boolean = false>
  extends GenericFilterPayload {
  include_neighbors?: boolean;
  include_metrics?: T;
  search?: string;
  page_size?: string;
}

export interface GetIndustrialGeographiesFilters<T extends boolean = false>
  extends GetIndustrialGeographiesBaseFilters<T> {
  submarket?: string;
  market?: string;
}
export const getIndustrialGeographies = async <T extends boolean = false>(
  filters: GetIndustrialGeographiesFilters<T>
): Promise<
  T extends true
    ? PaginatedResponse<typeof IndustrialGeographiesWithMetricsSchema>
    : PaginatedResponse<typeof IndustrialGeographiesSchema>
> => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data/industrial-geographies/${serializedQuery}`
  );

  if (filters.include_metrics) {
    return PaginatedResponseSchema(
      IndustrialGeographiesWithMetricsSchema
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ).parse(response.data) as any;
  } else {
    return PaginatedResponseSchema(IndustrialGeographiesSchema).parse(
      response.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any;
  }
};

export interface GetIndustrialGeographiesByLatitudeAndLongitudeFilters<
  T extends boolean = false
> extends GetIndustrialGeographiesBaseFilters<T> {
  latitude: string;
  longitude: string;
  type: IndustrialGeographiesProperties["geography_type"];
}
export const getIndustrialGeographiesByLatitudeAndLongitude = async <
  T extends boolean = false
>(
  filters: GetIndustrialGeographiesByLatitudeAndLongitudeFilters<T>
): Promise<
  T extends true
    ? PaginatedResponse<typeof IndustrialGeographiesWithMetricsSchema>
    : PaginatedResponse<typeof IndustrialGeographiesSchema>
> => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data/industrial-geographies/${serializedQuery}`
  );

  if (filters.include_metrics) {
    return PaginatedResponseSchema(
      IndustrialGeographiesWithMetricsSchema
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ).parse(response.data) as any;
  }

  return PaginatedResponseSchema(IndustrialGeographiesSchema).parse(
    response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as any;
};

interface GetMarketRentGrowthAndForecastChartBaseFilters
  extends GenericFilterPayload {
  type: MarketRentGrowthAndForecastChartType;
  date?: {
    from_date?: string;
    to_date?: string;
  };
}

export type GetMarketRentGrowthAndForecastChartFilters =
  | (FiltersBySubMarket & GetMarketRentGrowthAndForecastChartBaseFilters)
  | (FiltersByMarket & GetMarketRentGrowthAndForecastChartBaseFilters);

export const getMarketRentGrowthAndForecastChart = async (
  filters: GetMarketRentGrowthAndForecastChartFilters
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data/market-rent-and-forecasted-growth/charts/${serializedQuery}`
  );
  return MarketRentGrowthAndForecastChartsSchema.parse(response.data);
};

export const createManualCompstackComp = async <T extends CompstackCompType>({
  comp,
  compType,
}: {
  comp: CompstackCompKeysByType[T];
  compType: T;
}) => {
  const payload = { ...comp, type: compType };
  const response = await privateAxios.post(`/acquisitions/comps/`, payload);
  return response.data as string;
};

export const postLeaseComp = async (comp: LeaseCompPayload) => {
  const response = await privateAxios.post(
    `/data/lease-comps/manual-comp-files/`,
    comp
  );
  return response.data as string;
};

export const postLandComp = async (comp: LandCompPayload) => {
  const response = await privateAxios.post(
    `/data/land-comps/manual-comp-files/`,
    comp
  );
  return response.data as string;
};

export const postSaleComp = async (comp: SaleCompPayload) => {
  const response = await privateAxios.post(
    `/data/sale-comps/manual-comp-files/`,
    comp
  );
  return response.data as string;
};

export interface GetDealDrivingRoutesFilters extends GenericFilterPayload {
  dealId: Deal["id"];
}
export interface GetDealDrivingRoutesParams {
  filters: GetDealDrivingRoutesFilters;
  signal: AbortSignal;
}
export const getDealDrivingRoutes = async ({
  filters: { dealId, ...filters },
  signal,
}: GetDealDrivingRoutesParams): Promise<
  IPaginatedResponse<DrivingRouteFeature>
> => {
  const renamedFilters: GenericFilterPayload = {
    deal: dealId,
    ...filters,
  };
  const serializedQuery = querySerializer(renamedFilters);
  const response = await privateAxios.get(
    `/data/logistic-routes/${serializedQuery}`,
    { signal }
  );

  return PaginatedResponseSchema(DrivingRouteFeatureSchema).parse(
    response?.data
  );
};
export interface GetDealCustomerAccessFilters extends GenericFilterPayload {
  dealId?: Deal["id"];
}
export const getDealCustomerAccess = async ({
  dealId: deal,
  ...filters
}: GetDealCustomerAccessFilters) => {
  const finalFilters = {
    ...filters,
    deal,
    as: "customer-access",
  };
  const serializedQuery = querySerializer(finalFilters);
  const response = await privateAxios.get(
    `/data/property-service-areas/${serializedQuery}`
  );
  return PaginatedResponseSchema(DealCustomerAccessSchema).parse(response.data);
};

export interface GetHistoricalCapRatesFilters
  extends GenericFilterPayload,
    Partial<FiltersByMarket>,
    Partial<FiltersBySubMarket> {}

export const getHistoricalCapRates = async (
  filters: GetHistoricalCapRatesFilters
): Promise<CapRates> => {
  const serializedQuery = querySerializer({
    ...filters,
    type: "historical-rates",
  });
  const response = await privateAxios.get(
    `/data/historical-market-cap-rates/charts/${serializedQuery}`
  );

  return CapRatesSchema.parse(response?.data);
};
