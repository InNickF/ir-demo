import { GenericFilterPayload } from "@/commons/typings";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  legacyGetAssetLocationTenantsByProperty,
  getManagementOpportunities,
  getTenantBreakdowns,
  GetTenantsBreakdownFilters,
  legacyGetTenantBreakdowns,
  getAssetLocationTenantsByProperty,
  GetAssetLocationTenantsByPropertyFilters,
} from "../api/asset-growth";

export const assetGrowthQueries = createQueryKeys("assetGrowth", {
  legacyTenantBreakdowns: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => legacyGetTenantBreakdowns(filters),
  }),
  managementOpportunities: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getManagementOpportunities(filters),
  }),

  legacyAssetLocationTenants: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => legacyGetAssetLocationTenantsByProperty(filters),
  }),
  tenantBreakdown: (filters: GetTenantsBreakdownFilters) => ({
    queryKey: [filters],
    queryFn: () => getTenantBreakdowns(filters),
  }),
  assetLocationTenants: (
    filters: GetAssetLocationTenantsByPropertyFilters
  ) => ({
    queryKey: [filters],
    queryFn: () => getAssetLocationTenantsByProperty(filters),
  }),
});
