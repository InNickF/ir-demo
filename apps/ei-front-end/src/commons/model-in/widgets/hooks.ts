import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { GenericFilterPayload } from "@/commons/typings";
import { cleanEmptyObjectValues } from "@/commons/utils";
import { subjectErrorCRUD } from "@/commons/utils/notification-messages";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { FiltersPayloadType } from "in-ui-react";
import { useAtom } from "jotai";
import { useContext, useEffect, useMemo } from "react";
import { z } from "zod";
import { ConfigSettingsSchema } from "../configs/types";
import { Filter } from "../resources/filters/types";
import { ResourceResolver } from "../resources/types";
import { createResourceQueryKey } from "../resources/utils";
import {
  DataResolverSchema,
  FilterSchema,
  ModelSchema,
  SharedFilterSchema,
} from "../types";
import { ConfigContext, UseConfigContextValue } from "./contexts/ConfigContext";
import {
  FiltersContext,
  UseFiltersContextValue,
} from "./contexts/FilterContext";
import { ModelContext, UseModelContextValue } from "./contexts/ModelContext";
import {
  ResourceContext,
  UseResourceContextValue,
} from "./contexts/ResourceContext";
import { WidgetMetadataContext } from "./contexts/WidgetMetadataContext";
import { WidgetConnectFn, WidgetDisconnectFn, WidgetMetadata } from "./types";

interface UseWidgetConnectOnMountParams {
  onConnect: WidgetConnectFn;
  onDisconnect: WidgetDisconnectFn;
  widgetMetadata: WidgetMetadata;
  resourceFilters: Filter<SharedFilterSchema>;
}
export const useWidgetConnectOnMount = ({
  onConnect,
  onDisconnect,
  widgetMetadata,
  resourceFilters,
}: UseWidgetConnectOnMountParams) => {
  useEffect(() => {
    onConnect?.({ widgetMetadata, resourceFilters });
    return () => {
      onDisconnect?.({ widgetMetadata });
    };
  }, [onConnect, onDisconnect, widgetMetadata, resourceFilters]);
};

interface UseMergeWidgeTSharedFilterSchemasParams<
  TSharedFilterSchemas extends SharedFilterSchema
> {
  schemas: TSharedFilterSchemas[];
}
export const useMergeWidgeTSharedFilterSchemas = <
  TSharedFilterSchemas extends SharedFilterSchema
>({
  schemas,
}: UseMergeWidgeTSharedFilterSchemasParams<TSharedFilterSchemas>): z.AnyZodObject => {
  const mergeSchemas = useMemo(() => {
    return schemas.filter(Boolean).reduce((acc, curr) => {
      if (!curr) {
        return acc;
      }
      return acc.merge(curr);
    }, z.object({}));
  }, [schemas]);

  return mergeSchemas;
};

interface UseMergeAppliedWidgetFiltersParams<
  TFilters extends GenericFilterPayload,
  TFilterSchema extends FiltersPayloadType
> {
  general: TFilters;
  local: TFilterSchema;
  schema?: z.AnyZodObject;
}
export const useMergeAppliedWidgetFilters = <
  TFilters extends GenericFilterPayload,
  TFilterSchema extends FiltersPayloadType
>({
  schema,
  ...params
}: UseMergeAppliedWidgetFiltersParams<
  TFilters,
  TFilterSchema
>): GenericFilterPayload => {
  if (!schema) {
    return cleanEmptyObjectValues({ ...params?.general, ...params?.local });
  }

  const safeParsedFilters = schema?.safeParse(
    cleanEmptyObjectValues({ ...params?.general, ...params?.local })
  );

  return safeParsedFilters?.success
    ? cleanEmptyObjectValues(safeParsedFilters.data)
    : {};
};

interface UseModelQueryParams<TDataSchema extends DataResolverSchema> {
  schema: TDataSchema;
  appId?: string;
  moduleId?: string;
  entityId?: string;
  resourceId?: string;
  filters?: GenericFilterPayload;
  resourceLabel: string;
  resourceResolver: ResourceResolver<TDataSchema>;
  isQueryEnabled: boolean;
}
interface UseModelQueryReturn<TDataSchema extends DataResolverSchema> {
  query: UseQueryResult<z.infer<TDataSchema>>;
  queryKey: unknown[];
}
export const useModelResourceQuery = <TDataSchema extends DataResolverSchema>({
  filters = {},
  appId,
  moduleId,
  entityId,
  resourceId,
  resourceLabel,
  resourceResolver,
  isQueryEnabled = true,
}: UseModelQueryParams<TDataSchema>): UseModelQueryReturn<TDataSchema> => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const cleanFilters = useMemo(
    () => cleanEmptyObjectValues(filters),
    [filters]
  );

  const queryKey = useMemo(
    () =>
      createResourceQueryKey({
        filters: cleanFilters,
        appId,
        moduleId,
        entityId,
        resourceId,
      }),
    [cleanFilters, appId, moduleId, entityId, resourceId]
  );

  const query = useQuery<unknown, unknown, z.infer<TDataSchema>>({
    queryKey,
    queryFn: async () =>
      resourceResolver({
        filters: cleanFilters,
      }),
    keepPreviousData: true,
    enabled: isQueryEnabled,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({ verb: "GET", resource: resourceLabel }),
        message: parseError(error),
      });
    },
  });

  return {
    queryKey,
    query,
  };
};

/**
 * Raw component custom hooks
 */
export const useConfig = <TSchema extends ConfigSettingsSchema>() => {
  const ctx = useContext(ConfigContext);
  if (!ctx) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return ctx as UseConfigContextValue<TSchema>;
};

export const useResource = <
  TData extends DataResolverSchema,
  TSharedFilterSchema extends SharedFilterSchema
>() => {
  const ctx = useContext(ResourceContext);
  if (!ctx) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return ctx as UseResourceContextValue<TData, TSharedFilterSchema>;
};

export const useFilters = <
  TFilterSchema extends FilterSchema
>(): UseFiltersContextValue<TFilterSchema> => {
  const ctx = useContext(FiltersContext);
  if (!ctx) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return ctx as UseFiltersContextValue<TFilterSchema>;
};

export const useWidgetMetadata = (): WidgetMetadata => {
  const ctx = useContext(WidgetMetadataContext);
  if (!ctx) {
    throw new Error(
      "useWidgetMetadata must be used within a WidgetMetadataProvider"
    );
  }
  return ctx;
};

export const useModel = <TData extends ModelSchema>() => {
  const ctx = useContext(ModelContext);
  if (!ctx) {
    throw new Error("useModel must be used within a ModelProvider");
  }
  return ctx as UseModelContextValue<TData>;
};
