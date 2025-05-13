import { z } from "zod";
import {
  OverviewDebtInformationSchema,
  OverviewTimelineSchema,
} from "../schemas/overview";

export type OverviewDebtInformation = z.infer<
  typeof OverviewDebtInformationSchema
>;

export type OverviewTimeline = z.infer<typeof OverviewTimelineSchema>;
