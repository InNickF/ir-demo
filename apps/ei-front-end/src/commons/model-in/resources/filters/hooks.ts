import { GenericChoices, GenericFilterPayload } from "@/commons/typings";
import { cleanEmptyObjectValues } from "@/commons/utils";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { FiltersPayloadType, FilterType, useFilters } from "in-ui-react";
import { useMemo } from "react";
import { z } from "zod";
import { ResourceQueryKey } from "../types";
import { Filter } from "./types";
import { createResourceFiltersQueryKey } from "./utils";
import { FilterSchema, SharedFilterSchema } from "../../types";

interface UseResourceFiltersParams<
  TResourceFilter extends Filter<SharedFilterSchema>
> extends ResourceQueryKey {
  resourceFilters?: TResourceFilter;
  filters?: GenericFilterPayload;
}
export interface UseResourceFiltersReturn<
  TFilters extends FilterSchema = FilterSchema
> extends ReturnType<typeof useFilters<z.infer<TFilters>>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: FilterType<any>[];
  query: UseQueryResult<GenericChoices>;
  queryKey: unknown[];
}

export const useResourceFilters = <
  TResourceFilter extends Filter<SharedFilterSchema>
>({
  resourceFilters,
  appId,
  moduleId,
  resourceId,
  filters = {},
}: UseResourceFiltersParams<TResourceFilter>): UseResourceFiltersReturn => {
  const cleanFilters = useMemo(
    () => cleanEmptyObjectValues(filters),
    [filters]
  );

  const queryKey = useMemo(() => {
    return createResourceFiltersQueryKey({
      appId,
      moduleId,
      resourceId,
      filters: cleanFilters,
    });
  }, [appId, moduleId, resourceId, cleanFilters]);

  const query = useQuery({
    queryKey,
    queryFn: () => resourceFilters?.resolver?.(cleanFilters),
    keepPreviousData: true,
    enabled: !!resourceFilters,
  });

  const options = useMemo(() => {
    const baseOptions = Object.values(resourceFilters?.map || {})?.filter(
      Boolean
    );
    const choices = query?.data || [];

    return baseOptions.map((option) => {
      const found = choices.find((choice) => choice?.key === option?.key);

      return { ...option, options: found?.options };
    });
  }, [query?.data, resourceFilters?.map]);

  const filtersState = useFilters<FiltersPayloadType>();
  return {
    deleteAllFilters: filtersState.deleteAllFilters,
    filteredOptions: filtersState.filteredOptions,
    onApply: filtersState.onApply,
    query,
    options,
    queryKey,
  };
};

interface UseRequiredFilterKeysParams<
  TSharedFilterSchema extends SharedFilterSchema
> {
  schemas?: TSharedFilterSchema[];
}
const _stableReference = [];
export const useRequiredFilterKeys = <
  TSharedFilterSchema extends SharedFilterSchema
>({
  schemas = _stableReference,
}: UseRequiredFilterKeysParams<TSharedFilterSchema>): string[] => {
  return useMemo(() => {
    const filterKeys = schemas.filter(Boolean).reduce((acc, schema) => {
      return [
        ...acc,
        ...Object.entries(schema?.shape || {})
          .filter(([, value]) => {
            const zType = value as z.ZodType;
            return !zType.isNullable() && !zType.isOptional();
          })
          .map(([key]) => key),
      ];
    }, []);
    return [...filterKeys];
  }, [schemas]);
};

interface UseIsQueryEnabledParams {
  requiredFilterKeys: string[];
  mergedFilters: GenericFilterPayload;
}
export const useIsQueryEnabled = ({
  mergedFilters,
  requiredFilterKeys,
}: UseIsQueryEnabledParams) => {
  return useMemo(() => {
    if (!requiredFilterKeys.length) return true;
    return requiredFilterKeys.every((key) => !!mergedFilters[key]);
  }, [requiredFilterKeys, mergedFilters]);
};
