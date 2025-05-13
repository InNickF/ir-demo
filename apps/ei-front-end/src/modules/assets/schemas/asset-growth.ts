import {
  GenericLabelValueObjectSchema,
  LegacyGenericLabelValueObjectSchema,
} from "@/commons/schemas/filters";
import { z } from "zod";

export const LegacyTenantBreakdownSchema = z.object({
  value: z.number(),
  category: z.string(),
  percentage: z.number().nullish(),
});

export const TenantBreakdownSchema = z.object({
  value: z.number(),
  category: z.string(),
  percentage: z.number().nullish(),
});

export const AssetManagementOpportunitySchema =
  LegacyGenericLabelValueObjectSchema(z.number());

export const LegacyAssetLocationTenantByFilterSchema = z.record(
  z.string(),
  z.string().or(z.number())
);

export const LegacyAssetLocationTenantByPropertySchema = z.object({
  scode: z.string(),
  saddr1: z.string(),
  sf: z.number(),
  noi: z.number(),
  latitude: z.number(),
  longitude: z.number(),
});

export const LegacyAssetLocationTenantByPropertyAndFilterSchema =
  z.intersection(
    LegacyAssetLocationTenantByFilterSchema,
    LegacyAssetLocationTenantByPropertySchema
  );

export const AssetLocationTenantByPropertySchema = z.object({
  yardi_property_code: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  rentable_area: z.number(),
  annual_rent: z.number(),
  values: z.array(
    GenericLabelValueObjectSchema(
      z.number().nullable().or(z.string().nullable()),
      z.string().nullable()
    )
  ),
});
