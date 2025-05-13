import { z } from "zod";
import {
  BaseOperationalStatementTableMetricsSchema,
  LegacyPropertySchema,
  OperationalStatementTableMetricsSchema,
  PropertyAttachmentsSchema,
  PropertyCommentsSchema,
  PropertyImagesSchema,
  PropertyPhotoPayloadSchema,
  PropertyProjectedExitMetricsSchema,
  PropertyStrategySchema,
  PropertyTimelineSchema,
} from "../schemas/property";

export type LegacyProperty = z.infer<typeof LegacyPropertySchema>;

export type PropertyImage = z.infer<typeof PropertyImagesSchema>;

export interface PropertyKpi {
  id: LegacyProperty["property_code"];
  source: string | string[];
}
export type PropertyProjectedExitMetrics = z.infer<
  typeof PropertyProjectedExitMetricsSchema
>;

export type OperationalStatementTableMetrics = z.infer<
  typeof OperationalStatementTableMetricsSchema
>;

// Define the type for the schema
export type OperationalStatementTableMetricsType = z.infer<
  typeof BaseOperationalStatementTableMetricsSchema
> & {
  drill_down?: OperationalStatementTableMetricsType[] | null;
};

export type PropertyTimeline = z.infer<typeof PropertyTimelineSchema>;

export type propertyStrategy = z.infer<typeof PropertyStrategySchema>;

export type propertyComments = z.infer<typeof PropertyCommentsSchema>;

export type PropertyAttachments = z.infer<typeof PropertyAttachmentsSchema>;

export type PropertyPhotoPayload = z.infer<typeof PropertyPhotoPayloadSchema>;
