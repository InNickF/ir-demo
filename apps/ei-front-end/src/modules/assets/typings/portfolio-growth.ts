import { z } from "zod";
import {
  GeographicConcentrationSchema,
  AssetLocationPointSchema,
  ProjectedNoiGrowthSchema,
} from "../schemas/portfolio-growth";

export type GeographicConcentration = z.infer<
  typeof GeographicConcentrationSchema
>;

export type ProjectedNoiGrowth = z.infer<typeof ProjectedNoiGrowthSchema>;

export type AssetLocationPoints = z.infer<typeof AssetLocationPointSchema>;
