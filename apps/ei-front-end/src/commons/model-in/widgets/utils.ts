import { z } from "zod";
import { Resource } from "../resources/types";
import { DataResolverSchema, FilterSchema, SharedFilterSchema } from "../types";
import { WidgetConnectedData } from "./types";

export const isWidgetMetadataEqual = ({
  prevWidget,
  nextWidget,
}: {
  prevWidget: WidgetConnectedData;
  nextWidget: WidgetConnectedData;
}) => {
  return (
    prevWidget.widgetMetadata.id === nextWidget.widgetMetadata.id &&
    prevWidget.widgetMetadata.entity.id ===
      nextWidget.widgetMetadata.entity.id &&
    prevWidget.widgetMetadata.module.id ===
      nextWidget.widgetMetadata.module.id &&
    prevWidget.widgetMetadata.model.id === nextWidget.widgetMetadata.model.id
  );
};

export const needsEntityId = ({
  resource,
}: {
  resource: Resource<DataResolverSchema, SharedFilterSchema, FilterSchema>;
}): boolean => {
  const idSchema: z.ZodType = resource?.sharedFilters?.schema?.shape?.id;
  if (!idSchema) {
    return false;
  }

  const isIdRequired = !idSchema.isNullable() && !idSchema.isOptional();
  const hasUIFilterToHandleIt = !!resource?.sharedFilters?.map?.id;

  return isIdRequired && !hasUIFilterToHandleIt;
};
