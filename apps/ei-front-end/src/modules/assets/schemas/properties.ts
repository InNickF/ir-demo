import {
  GenericLabelValueMetadataSchema,
  GenericLabelValueObjectSchema,
} from "@/commons/schemas/filters";
import { z } from "zod";

export const PropertyGeographySchema = z.object({
  yardi_property_code: z.string().nullable(),
  fund_name: z.string().nullable(),
  address: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  region: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  rentable_building_area: z.number().nullable(),
});

export const AssetTotalDistributionsByTypeSchema = z.object({
  property: z.string().nullable(),
  yardi_property_code: z.string().nullable(),
  distributions: z.number().nullish(),
  actual_sales_distributions: z.number().nullish(),
  actual_refi_distributions: z.number().nullish(),
  actual_operations_distributions: z.number().nullish(),
  budget_total_distributions: z.number().nullish(),
  variance_distributions: z.number().nullish(),
  actual_contributions: z.number().nullish(),
  budget_contributions: z.number().nullish(),
  variance_contributions: z.number().nullish(),
});

export const AssetTotalDistributionsByTypeTotalsSchema =
  AssetTotalDistributionsByTypeSchema.omit({
    property: true,
    yardi_property_code: true,
  });

export const ValuationsByAssetSchema = z.object({
  property: z.string().nullable(),
  yardi_property_code: z.string().nullable(),
  current_irr: z.number().nullish(),
  current_moc: z.number().nullish(),
  projected_irr: z.number().nullish(),
  projected_moc: z.number().nullish(),
  total_gav: z.number().nullish(),
  total_nav: z.number().nullish(),
});

export const ValuationsByAssetTotalsSchema = ValuationsByAssetSchema.omit({
  property: true,
  yardi_property_code: true,
});

export const AssetLeaseExpirationPortraitSchema = GenericLabelValueObjectSchema(
  z
    .array(
      GenericLabelValueMetadataSchema({
        valueSchema: z.number(),
        metadataSchema: z.object({
          lxd: z.string().nullable(),
          remaining_term: z.number().nullable(),
          lcd: z.string().nullable(),
          gross_net: z.string().nullable(),
          monthly_rent: z.number().nullable(),
          tenant_code: z.string().nullable(),
        }),
      })?.nullable()
    )
    ?.nullable(),
  z.number()
);

export const AssetStakingPlanSchema = z.object({
  tenant: z.string().nullable(),
  sf: z.number().nullable(),
  lxd: z.string().nullable(),
  remaining_term: z.number().nullable(),
  market_rent: z.number().nullable(),
  annual_rent_psf: z.number().nullable(),
  market_percentage: z.number().nullable(),
  tenant_code: z.string().nullable(),
  last_updated_market_prices: z.string().nullish(),
  unit_codes: z.string().nullish(),
});

export const AssetRentRollSchema = z.object({
  tenant: z.string().nullable(),
  unit_codes: z.string().nullable(),
  tenant_code: z.string().nullable(),
  remaining_term: z.number().nullable(),
  lxd: z.string().nullable(),
  annual_rent_psf: z.number().nullable(),
  market_rent: z.number().nullable(),
  market_percentage: z.number().nullable(),
  sf: z.number().nullable(),
  gross_net: z.string().nullable(),
});
