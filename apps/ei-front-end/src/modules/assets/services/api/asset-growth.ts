import {
  AssetLocationTenantByPropertySchema,
  AssetManagementOpportunitySchema,
  LegacyAssetLocationTenantByPropertyAndFilterSchema,
  LegacyTenantBreakdownSchema,
  TenantBreakdownSchema,
} from "@/assets/schemas/asset-growth";
import { stepBarChartDataModifier } from "@/commons/model-in/modifiers/utils/charts";
import { privateAxios } from "@/commons/services/clients";
import { GenericFilterPayload } from "@/commons/typings";
import { querySerializer } from "@/commons/utils/query-serializer";
import { z } from "zod";
import {
  tenantBreakdownGroupBy,
  tenantBreakdownMetrics,
} from "../../utils/asset-growth";

export const legacyGetTenantBreakdowns = async (
  filters: GenericFilterPayload
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/asset/tenant/tenant-breakdown${serializedQuery}`
  );

  return z.array(LegacyTenantBreakdownSchema).parse(response.data);
};

export const getManagementOpportunities = async (
  filters: GenericFilterPayload
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data-asset/projected-net-operating-incomes/charts${serializedQuery}`
  );

  return stepBarChartDataModifier({
    data: z.array(AssetManagementOpportunitySchema).parse(response.data),
  });
};

export const legacyGetAssetLocationTenantsByProperty = async (
  filters: GenericFilterPayload
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/asset/tenant/asset-growth-location${serializedQuery}`
  );

  return z
    .array(LegacyAssetLocationTenantByPropertyAndFilterSchema)
    .parse(response.data);
};

export interface GetTenantsBreakdownFilters extends GenericFilterPayload {
  metric: typeof tenantBreakdownMetrics[number];
  group_by: typeof tenantBreakdownGroupBy[number];
  status?: string;
  fund?: string;
}
export const getTenantBreakdowns = async (
  filters: GetTenantsBreakdownFilters
) => {
  const serializedQuery = querySerializer({
    ...filters,
    type: "tenant-breakdown",
  });
  const response = await privateAxios.get(
    `/data-asset/current-rent-rolls/charts${serializedQuery}`
  );
  return z.array(TenantBreakdownSchema).parse(response.data);
};

export interface GetAssetLocationTenantsByPropertyFilters
  extends GenericFilterPayload {
  group_by: typeof tenantBreakdownGroupBy[number];
  metric: typeof tenantBreakdownMetrics[number];
  status?: string;
  fund?: string;
}
export const getAssetLocationTenantsByProperty = async (
  filters: GetAssetLocationTenantsByPropertyFilters
) => {
  const serializedQuery = querySerializer({
    ...filters,
    type: "asset-growth-location",
  });
  const response = await privateAxios.get(
    `/data-asset/current-rent-rolls/charts${serializedQuery}`
  );
  return z.array(AssetLocationTenantByPropertySchema).parse(response.data);
};
