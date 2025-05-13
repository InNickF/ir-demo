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
import { PropertySchema } from "../entities/asset/schema";
import {
  PropertyDebtMetricsSchema,
  PropertyStrategyPayloadSchema,
  PropertyStrategyTypesSchema,
} from "@/assets/schemas/property";
import { z } from "zod";

export type Property = z.infer<typeof PropertySchema>;

export type PropertyGeography = z.infer<typeof PropertyGeographySchema>;

export type AssetTotalDistributionsByType = z.infer<
  typeof AssetTotalDistributionsByTypeSchema
>;
export type AssetTotalDistributionsByTypeTotals = z.infer<
  typeof AssetTotalDistributionsByTypeTotalsSchema
>;

export type ValuationsByAsset = z.infer<typeof ValuationsByAssetSchema>;
export type ValuationsByAssetTotals = z.infer<
  typeof ValuationsByAssetTotalsSchema
>;

export type AssetLeaseExpirationPortrait = z.infer<
  typeof AssetLeaseExpirationPortraitSchema
>;

export type AssetStakingPlan = z.infer<typeof AssetStakingPlanSchema>;

export type AssetRentRoll = z.infer<typeof AssetRentRollSchema>;

export type PropertyDebtMetrics = z.infer<typeof PropertyDebtMetricsSchema>;

export type PropertyStrategyTypes = z.infer<typeof PropertyStrategyTypesSchema>;

export type PropertyStrategyPayload = z.infer<
  typeof PropertyStrategyPayloadSchema
>;
