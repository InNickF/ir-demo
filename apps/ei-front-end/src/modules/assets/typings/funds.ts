import { z } from "zod";
import {
  FundAssetsTableMetricsSchema,
  FundCommentsSchema,
  FundCriticalDatesSchema,
  FundGavBySchema,
  FundIRRSchema,
  FundLeaseExpirationSchema,
  FundStrategyPayloadSchema,
  FundStrategySchema,
  FundStrategyTypesSchema,
  FundTimelineSchema,
} from "../schemas/funds";
import { FundSchema } from "../entities/fund/schemas";

export type Fund = z.infer<typeof FundSchema>;

export type FundComments = z.infer<typeof FundCommentsSchema>;

export type FundStrategy = z.infer<typeof FundStrategySchema>;

export type FundTimeline = z.infer<typeof FundTimelineSchema>;

export type FundAssetsTableMetrics = z.infer<
  typeof FundAssetsTableMetricsSchema
>;

export type FundCriticalDates = z.infer<typeof FundCriticalDatesSchema>;

export type FundGavBy = z.infer<typeof FundGavBySchema>;

export type FundLeaseExpiration = z.infer<typeof FundLeaseExpirationSchema>;

export type FundStrategyTypes = z.infer<typeof FundStrategyTypesSchema>;
export type FundStrategyPayload = z.infer<typeof FundStrategyPayloadSchema>;

export type FundIRR = z.infer<typeof FundIRRSchema>;
