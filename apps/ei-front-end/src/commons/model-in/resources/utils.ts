import { privateAxios } from "@/commons/services/clients";
import { GenericFilterPayload } from "@/commons/typings";
import { cleanEmptyObjectValues } from "@/commons/utils";
import { querySerializer } from "@/commons/utils/query-serializer";
import { z } from "zod";
import { DataResolverSchema, FilterSchema, SharedFilterSchema } from "../types";
import {
  AddResolverCallback,
  AddResolverModCallback,
  ResourceQueryKey,
} from "./types";

interface CreateResourceResolverCallbackParams<
  TSchema extends DataResolverSchema,
  TSharedFilterSchema extends SharedFilterSchema,
  TFilterSchema extends FilterSchema
> {
  path: string;
  mod?: AddResolverModCallback<TSchema, TSharedFilterSchema, TFilterSchema>;
  modFilters?: (params: {
    filters: z.infer<TSharedFilterSchema> & z.infer<TFilterSchema>;
  }) => GenericFilterPayload;
}
export const createResourceResolverCallback =
  <
    TSchema extends DataResolverSchema,
    TSharedFilterSchema extends SharedFilterSchema,
    TFilterSchema extends FilterSchema
  >(
    params: CreateResourceResolverCallbackParams<
      TSchema,
      TSharedFilterSchema,
      TFilterSchema
    >
  ): AddResolverCallback<TSchema, TSharedFilterSchema, TFilterSchema> =>
  (resource) => ({
    resolver: async ({ filters }) => {
      let mergedFiltersSchemas: z.AnyZodObject =
        resource?.sharedFilters?.schema;

      if (resource?.filters?.schema) {
        mergedFiltersSchemas = mergedFiltersSchemas
          ? mergedFiltersSchemas.extend(resource.filters.schema.shape)
          : resource.filters.schema;
      }

      let parsedFilters = filters;
      if (mergedFiltersSchemas && parsedFilters) {
        parsedFilters = mergedFiltersSchemas?.parse(filters) ?? parsedFilters;
      }

      const modFilters =
        params?.modFilters?.({ filters: parsedFilters }) || parsedFilters;

      const serializedQuery = querySerializer({
        ...(modFilters || {}),
        ...(resource?.staticFilters || {}),
      });
      const response = await privateAxios.get(
        `${params.path}${serializedQuery}`
      );

      const moddedData =
        params?.mod?.({
          data: response?.data,
          schema: resource.schema,
          filters: parsedFilters,
          sharedFiltersSchema: resource.sharedFilters.schema,
          filtersSchema: resource.filters?.schema,
        }) || response?.data;

      return resource.schema.parse(moddedData);
    },
  });

interface CreateResourceQueryKeyParams extends ResourceQueryKey {
  filters: GenericFilterPayload;
}
export const createResourceQueryKey = ({
  filters = {},
  appId = null,
  moduleId = null,
  entityId = null,
  resourceId = null,
}: CreateResourceQueryKeyParams) => {
  const keys: ResourceQueryKey = { appId, moduleId, entityId, resourceId };
  return [keys, cleanEmptyObjectValues(filters)];
};
