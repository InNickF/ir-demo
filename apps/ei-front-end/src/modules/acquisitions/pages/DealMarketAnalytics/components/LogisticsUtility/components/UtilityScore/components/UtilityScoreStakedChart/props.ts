import { GenericLabelValueObject } from "@/commons/typings";
import { z } from "zod";

export interface UtilityScoreStakedChartProps {
  id: string;
  data: GenericLabelValueObject<z.ZodType<number>>[];
}
