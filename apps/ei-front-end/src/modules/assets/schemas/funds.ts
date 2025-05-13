import {
  GenericLabelValueMetadataSchema,
  GenericLabelValueObjectSchema,
} from "@/commons/schemas/filters";
import { z } from "zod";
import { assetStrategyTypes } from "../utils";

export const FundCommonKeysSchema = z.object({
  id: z.string().nullish(),
  fund_name: z.string().nullish(),
  fund_id: z.string().nullish(),
});

export const FundStrategySchema = FundCommonKeysSchema.omit({
  fund_id: true,
}).extend({
  note: z.string().nullish(),
  type: z.enum(assetStrategyTypes).nullish(),
  created_by: z.number().nullish(),
});

export const FundCommentsSchema = FundCommonKeysSchema.extend({
  comment: z.string().nullish(),
});

export const FundTimelineSchema = FundCommonKeysSchema.extend({
  comment: z.string().nullish(),
  notable_date: z.string().nullish(),
});

export const FundAssetsTableMetricsSchema = z.object({
  property_name: z.string().nullish(),
  sf: z.number().nullish(),
  noi: z.number().nullish(),
  dscr: z.number().nullish(),
  ar: z.number().nullish(),
  cash_at_hand: z.number().nullish(),
  occupancy: z.number().nullish(),
  ap: z.number().nullish(),
});

export const FundCriticalDatesSchema = z.object({
  activity: z.string().nullish(),
  critical_date: z.string().nullish(),
  remaining_days: z.number().nullish(),
});

export const FundGavBySchema = z.object({
  gav: z.number().nullable(),
  filter_value: z.string().nullable(),
});

export const FundLeaseExpirationSchema = GenericLabelValueObjectSchema(
  z
    .array(
      GenericLabelValueMetadataSchema({
        valueSchema: z.number().nullable(),
        metadataSchema: z
          .object({
            property_address: z.string().nullable(),
            tenant_code: z.string().nullable(),
          })
          .nullable(),
      }).nullable()
    )
    .nullable(),
  z.number().nullable()
);

export const FundStrategyTypesSchema = z.enum(assetStrategyTypes);

export const FundStrategyPayloadSchema = z.object({
  fund_name: z.string(),
  type: FundStrategyTypesSchema,
  note: z.string(),
});

export const FundIRRSchema = z.object({
  fund_name: z.string().nullish(),
  source: z.literal("LIQ").or(z.literal("PROJ")).nullish(),
  irr: z.number().nullish(),
});
