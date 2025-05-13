import { LegacyGenericLabelValueObjectSchema } from "@/commons/schemas/filters";
import { z } from "zod";

export const ProjectedNoiGrowthSchema = LegacyGenericLabelValueObjectSchema(
  z.number()
);

export const GeographicConcentrationSchema = z.object({
  value: z.number().nullish(),
  category: z.string().nullish(),
});

export const AssetLocationPointSchema = z.object({
  latitude: z.number().nullish(),
  longitude: z.number().nullish(),
  market: z.string().nullish(),
  area: z.number().nullish(),
  address: z.string().nullish(),
});
