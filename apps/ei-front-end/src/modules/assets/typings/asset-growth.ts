import { z } from "zod";
import {
  AssetLocationTenantByPropertySchema,
  AssetManagementOpportunitySchema,
  LegacyAssetLocationTenantByPropertyAndFilterSchema,
  LegacyTenantBreakdownSchema,
  TenantBreakdownSchema,
} from "../schemas/asset-growth";

export type LegacyTenantBreakdown = z.infer<typeof LegacyTenantBreakdownSchema>;

export type LegacyAssetLocationTenantByProperty = z.infer<
  typeof LegacyAssetLocationTenantByPropertyAndFilterSchema
>;

export type AssetManagementOpportunity = z.infer<
  typeof AssetManagementOpportunitySchema
>;

export type TenantBreakdown = z.infer<typeof TenantBreakdownSchema>;

export type AssetLocationTenantByProperty = z.infer<
  typeof AssetLocationTenantByPropertySchema
>;
