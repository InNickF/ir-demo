import { KpiCashflowSchema } from "@/assets/schemas/kpis";
import {
  OperationalFinancialPerformanceChartSchema,
  OperationalFinancialPerformanceTableMetricsSchema,
} from "@/assets/schemas/operational-financial-performance";
import {
  AssetLeaseExpirationPortraitSchema,
  AssetRentRollSchema,
  AssetStakingPlanSchema,
  AssetTotalDistributionsByTypeSchema,
  AssetTotalDistributionsByTypeTotalsSchema,
  PropertyGeographySchema,
  ValuationsByAssetSchema,
  ValuationsByAssetTotalsSchema,
} from "@/assets/schemas/properties";
import { PropertySchema } from "../../entities/asset/schema";
import {
  ARPropertyTableSchema,
  LegacyPropertySchema,
  OperationalStatementSchema,
  PropertyAttachmentsSchema,
  PropertyCommentsSchema,
  PropertyDebtMetricsSchema,
  PropertyImagesSchema,
  PropertyProjectedExitMetricsSchema,
  PropertyStrategySchema,
  PropertyTimelineSchema,
} from "@/assets/schemas/property";
import {
  OperationalFinancialPerformanceHistoricalMetricsAPIFilters,
  OperationalFinancialPerformanceMetricsAPIFilters,
} from "@/assets/typings/operational-financial-performance";
import { Property, PropertyStrategyPayload } from "@/assets/typings/properties";
import {
  LegacyProperty,
  PropertyAttachments,
  propertyComments,
  PropertyKpi,
  PropertyPhotoPayload,
  propertyStrategy,
  PropertyTimeline,
} from "@/assets/typings/property";
import { ARTenantType } from "@/assets/typings/tenants";
import { PaginatedResponseSchema } from "@/commons/schemas/filters";
import { uploadFile } from "@/commons/services/api/processFileToS3";
import { privateAxios } from "@/commons/services/clients";
import { GenericFilterPayload } from "@/commons/typings";
import { querySerializer } from "@/commons/utils/query-serializer";
import { z } from "zod";
import { PROPERTY_ATTACHMENT_TYPES } from "../../utils";

export const legacyGetAllProperties = async () => {
  const response = await privateAxios.get("/properties/properties/");
  return z.array(LegacyPropertySchema).parse(response.data);
};

export const legacyGetAllPropertiesByGavFilter = async (
  filters: GenericFilterPayload
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/properties/properties/filter-gav/${serializedQuery}`
  );
  return z.array(LegacyPropertySchema).parse(response.data);
};

export const legacyGetProperty = async (
  id: LegacyProperty["property_code"]
) => {
  const response = await privateAxios.get(`/properties/properties/${id}`);
  return LegacyPropertySchema.parse(response.data.data);
};

export const getPropertyImage = async (id: LegacyProperty["property_code"]) => {
  const response = await privateAxios.get(
    `/properties/properties/${id}/images/`
  );
  const images = response?.data?.map((item) => `${item?.images}`);
  return PropertyImagesSchema.parse(images);
};

export const getKpiByProperty = async (data: PropertyKpi) => {
  const response = await privateAxios.get(
    `/asset/cashflow/?property=${data.id}&source=${data.source}`
  );
  return KpiCashflowSchema.parse(response.data?.[0]);
};

export const legacyGetDebtMetricsByProperty = async (
  id: LegacyProperty["property_code"]
) => {
  const response = await privateAxios.get(`/asset/tenant/${id}/debt-metrics/`);
  return PropertyDebtMetricsSchema.parse(response.data);
};

export const getPropertyProjectedExitMetrics = async (
  id: LegacyProperty["property_code"]
) => {
  const response = await privateAxios.get(
    `asset/cashflow/${id}/property-metrics/`
  );
  return PropertyProjectedExitMetricsSchema.parse(response.data);
};

export interface GetPropertyOFPMetricsFilters
  extends OperationalFinancialPerformanceMetricsAPIFilters {
  yardi_property_code: Property["yardi_property_code"];
}
export const getPropertyOFPMetrics = async (
  filters: GetPropertyOFPMetricsFilters
) => {
  const serializedQuery = querySerializer({
    type: "property_performance_table",
    ...filters,
  });

  const response = await privateAxios.get(
    `/data-asset/operational-financial-performances/charts${serializedQuery}`
  );

  return z
    .array(OperationalFinancialPerformanceTableMetricsSchema)
    .parse(response.data);
};

export interface GetPropertyOFPHistoricalMetricsFilters
  extends OperationalFinancialPerformanceHistoricalMetricsAPIFilters {
  yardi_property_code: Property["yardi_property_code"];
}

export const getPropertyOFPHistoricalMetrics = async (
  filters: GetPropertyOFPHistoricalMetricsFilters
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

export interface GetARPropertyTableFilters extends GenericFilterPayload {
  yardi_entity_code?: string;
  tenant_type?: ARTenantType;
}
export const getARPropertyTable = async (
  filters: GetARPropertyTableFilters
) => {
  const finalFilters = {
    ...filters,
    type: "tenants_detail",
  };
  const serializedQuery = querySerializer(finalFilters);
  const response = await privateAxios.get(
    `/data-asset/accounts-receivable-and-current-month-charges/charts${serializedQuery}`
  );

  return ARPropertyTableSchema.parse(response?.data || null);
};

export const getOperationalStatementTable = async (
  filters: GenericFilterPayload
) => {
  const finalFilters = {
    ...filters,
    type: "operational_statement",
  };

  const serializedQuery = querySerializer(finalFilters);

  const response = await privateAxios.get(
    `/data-asset/operational-financial-performances/charts${serializedQuery}`
  );

  return OperationalStatementSchema.parse(response?.data);
};

export type GetAllPropertiesFilters = GenericFilterPayload;
export const getAllProperties = async (filters: GetAllPropertiesFilters) => {
  const serializedQuery = querySerializer({
    ...filters,
  });
  const response = await privateAxios.get(
    `/data-asset/properties-under-management/${serializedQuery}`
  );

  return PaginatedResponseSchema(PropertySchema).parse(response.data);
};

export interface GetPropertyFilters extends GenericFilterPayload {
  propertyId: Property["yardi_property_code"];
}
export const getProperty = async ({
  propertyId,
  ...otherFilters
}: GetPropertyFilters) => {
  const serializedQuery = querySerializer(otherFilters);
  const response = await privateAxios.get(
    `/data-asset/properties-under-management/${propertyId}/${serializedQuery}`
  );

  return PropertySchema.parse(response?.data);
};

export interface GetPropertyStrategy extends GenericFilterPayload {
  property_under_management_code: Property["yardi_property_code"];
}

export const getPropertyStrategy = async ({
  ...filters
}: GetPropertyStrategy) => {
  const serializedQuery = querySerializer({ ...filters, latest: "true" });
  const response = await privateAxios.get(
    `/asset/asset-strategies/${serializedQuery}`
  );
  return PaginatedResponseSchema(PropertyStrategySchema).parse(response.data);
};

export interface GetPropertyComments extends GenericFilterPayload {
  property_under_management_code: Property["yardi_property_code"];
}

export const getPropertyComments = async ({
  ...filters
}: GetPropertyStrategy) => {
  const serializedQuery = querySerializer({ ...filters, page_size: "-1" });
  const response = await privateAxios.get(
    `/data-asset/properties-under-management-comments/${serializedQuery}`
  );
  const results = response?.data?.results;
  const lastItem = results[results.length - 1];

  return PropertyCommentsSchema.parse(
    lastItem || {
      id: null,
      property_name: null,
      property_under_management_code: null,
      note: null,
    }
  );
};

export interface GetPropertyTimeline extends GenericFilterPayload {
  property_under_management_code: Property["yardi_property_code"];
}

export const getPropertyTimeline = async ({
  ...filters
}: GetPropertyTimeline) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data-asset/properties-under-management-timeline-items/${serializedQuery}`
  );

  return PaginatedResponseSchema(PropertyTimelineSchema).parse(response?.data);
};

export const postPropertyStrategy = async ({
  ...payload
}: PropertyStrategyPayload) => {
  const response = await privateAxios.post(`/asset/asset-strategies/`, payload);

  return PropertyStrategySchema.parse(response.data);
};

export const postPropertyComments = async ({
  ...payload
}: propertyComments) => {
  const response = await privateAxios.post(
    `/data-asset/properties-under-management-comments/`,
    payload
  );

  return PropertyCommentsSchema.parse(response.data);
};

export const patchPropertyStrategy = async ({
  id,
  ...payload
}: propertyStrategy) => {
  const response = await privateAxios.patch(
    `/data-asset/properties-under-management-strategy-notes/${id}/`,
    payload
  );

  return PropertyStrategySchema.parse(response.data);
};

export const patchPropertyComments = async ({
  id,
  ...payload
}: propertyComments) => {
  const response = await privateAxios.patch(
    `/data-asset/properties-under-management-comments/${id}/`,
    payload
  );

  return PropertyCommentsSchema.parse(response.data);
};

export const postPropertyTimeline = async ({
  ...payload
}: Pick<
  PropertyTimeline,
  "comment" | "notable_date" | "property_under_management_code" | "type"
>) => {
  const response = await privateAxios.post(
    `/data-asset/properties-under-management-timeline-items/`,
    payload
  );

  return response?.data as string;
};

export const deletePropertyTimeline = async ({
  ...payload
}: PropertyTimeline) => {
  const response = await privateAxios.delete(
    `/data-asset/properties-under-management-timeline-items/${payload?.id}`
  );

  return response?.data as string;
};

export const patchPropertyTimeline = async ({
  ...payload
}: PropertyTimeline) => {
  const response = await privateAxios.patch(
    `/data-asset/properties-under-management-timeline-items/${payload.id}/`,
    payload
  );

  return response?.data as string;
};

export interface GetPropertyAttachments extends GenericFilterPayload {
  property_under_management_code: Property["yardi_property_code"];
}

export const getPropertyAttachments = async ({
  ...filters
}: GetPropertyAttachments) => {
  const serializedQuery = querySerializer({
    ...filters,
    page_size: "-1",
  });

  const response = await privateAxios.get(
    `/data-asset/properties-under-management-attachments/${serializedQuery}`
  );

  return PaginatedResponseSchema(PropertyAttachmentsSchema).parse(
    response?.data
  );
};

export const postPropertyAttachments = async ({
  ...payload
}: PropertyAttachments) => {
  const response = await privateAxios.post(
    `/data-asset/properties-under-management-attachments/`,
    payload
  );

  return PropertyAttachmentsSchema.parse(response.data);
};

interface UploadPropertyPhotoToS3 {
  property_under_management_code: string;
  photo: File;
}

export const uploadPropertyPhotoToS3 = async ({
  property_under_management_code,
  photo,
}: UploadPropertyPhotoToS3) => {
  const url = `private/data-asset/properties-under-management/${property_under_management_code}`;
  const documentURL = `${url}/${photo.name}`;

  const result = await uploadFile({
    url: documentURL,
    file: photo,
    module: "debt",
    args: {
      property_under_management_code,
      name: photo.name,
      type: PROPERTY_ATTACHMENT_TYPES.PROPERTY_PICTURE,
    } as Omit<PropertyPhotoPayload, "key">,
  });

  return result;
};

export const deletePropertyAttachment = async (photo: PropertyAttachments) => {
  const response = await privateAxios.delete(
    `/data-asset/properties-under-management-attachments/${photo?.id}`
  );

  return response?.data as string;
};

export interface GetPropertiesGeographyFilters extends GenericFilterPayload {
  fund?: string;
}
export const getPropertiesGeography = async (
  filters: GetPropertiesGeographyFilters
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data-asset/properties-under-management/geographies/${serializedQuery}`
  );

  return PaginatedResponseSchema(PropertyGeographySchema).parse(response.data);
};

export interface GetAssetTotalDistributionsByTypeFilters
  extends GenericFilterPayload {
  investment_fund_name: string;
  from_date?: string;
  to_date?: string;
}
export const getAssetTotalDistributionsByType = async (
  filters: GetAssetTotalDistributionsByTypeFilters
) => {
  const serializedQuery = querySerializer({
    type: "total-distributions-by-type",
    ...filters,
  });
  const response = await privateAxios.get(
    `/data-asset/fund-transactions/charts${serializedQuery}`
  );
  return z.array(AssetTotalDistributionsByTypeSchema).parse(response?.data);
};

export type GetAssetTotalDistributionsByTypeTotalsFilters =
  GetAssetTotalDistributionsByTypeFilters;

export const getAssetTotalDistributionByTypeTotals = async (
  filters: GetAssetTotalDistributionsByTypeTotalsFilters
) => {
  const serializedQuery = querySerializer({
    type: "total-distributions-by-type-total",
    ...filters,
  });
  const response = await privateAxios.get(
    `/data-asset/fund-transactions/charts${serializedQuery}`
  );
  return AssetTotalDistributionsByTypeTotalsSchema.parse(response?.data);
};

export interface GetValuationsByAssetFilters extends GenericFilterPayload {
  fund_name: string;
  from_date?: string;
  to_date?: string;
}
export const getValuationsByAsset = async (
  filters: GetValuationsByAssetFilters
) => {
  const serializedQuery = querySerializer({
    type: "valuations-by-asset",
    ...filters,
  });
  const response = await privateAxios.get(
    `/data-asset/properties-under-management/charts${serializedQuery}`
  );

  return z.array(ValuationsByAssetSchema).parse(response?.data);
};

export type GetValuationsByAssetTotalsFilters = GetValuationsByAssetFilters;
export const getValuationsByAssetTotals = async (
  filters: GetValuationsByAssetTotalsFilters
) => {
  const serializedQuery = querySerializer({
    type: "valuations-by-asset-total",
    ...filters,
  });
  const response = await privateAxios.get(
    `/data-asset/properties-under-management/charts${serializedQuery}`
  );

  return ValuationsByAssetTotalsSchema.parse(response?.data);
};

export interface GetPropertyDebtMetricsFilters extends GenericFilterPayload {
  yardi_property_code: string;
}

export const getPropertyDebtMetrics = async (
  filters: GetPropertyDebtMetricsFilters
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data-debt/loan-summary/${serializedQuery}`
  );

  return PaginatedResponseSchema(PropertyDebtMetricsSchema).parse(
    response?.data
  );
};

export interface GetAssetLeaseExpirationPortraitFilters
  extends GenericFilterPayload {
  yardi_property_code: string;
}
export const getAssetLeaseExpirationPortrait = async (
  filters: GetAssetLeaseExpirationPortraitFilters
) => {
  const serializedQuery = querySerializer({
    ...filters,
    type: "lease-expiration-portrait",
  });
  const response = await privateAxios.get(
    `/data-asset/current-rent-rolls/charts${serializedQuery}`
  );
  return z.array(AssetLeaseExpirationPortraitSchema).parse(response?.data);
};

export interface GetAssetStakingPlanFilters extends GenericFilterPayload {
  yardi_property_code: string;
}
export const getAssetStakingPlan = async (
  filters: GetAssetStakingPlanFilters
) => {
  const serializedQuery = querySerializer({
    ...filters,
    type: "stacking-plan",
  });
  const response = await privateAxios.get(
    `/data-asset/current-rent-rolls/charts${serializedQuery}`
  );
  return z.array(AssetStakingPlanSchema).parse(response?.data);
};

export interface GetAssetRentRollFilters extends GenericFilterPayload {
  yardi_property_code: string;
}
export const getAssetRentRoll = async (filters: GetAssetRentRollFilters) => {
  const serializedQuery = querySerializer({
    ...filters,
    type: "rent-roll",
  });
  const response = await privateAxios.get(
    `/data-asset/current-rent-rolls/charts${serializedQuery}`
  );
  return z.array(AssetRentRollSchema).parse(response?.data);
};
