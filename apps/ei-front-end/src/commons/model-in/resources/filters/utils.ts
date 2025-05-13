import { GenericChoicesSchema } from "@/commons/schemas/filters";
import { privateAxios } from "@/commons/services/clients";
import { GenericChoices } from "@/commons/typings";
import { cleanEmptyObjectValues } from "@/commons/utils";
import { FilterType } from "in-ui-react";
import { z } from "zod";
import { buildFilters } from ".";
import { ResourceQueryKey, ResourceResolver } from "../types";
import {
  Filter,
  ResourceFiltersQueryKey,
  ResourceFiltersRegistry,
} from "./types";

interface CreateResourceFiltersResolverParams {
  path: string;
  extraChoices?: GenericChoices;
}
export const createResourceFiltersResolver = ({
  path,
  extraChoices = [],
}: CreateResourceFiltersResolverParams): ResourceResolver<
  ReturnType<typeof GenericChoicesSchema>
> => {
  return async () => {
    const response = await privateAxios.get(path);
    const data = Array.isArray(response?.data)
      ? response.data
      : [response?.data].filter(Boolean);
    return GenericChoicesSchema().parse([...data, ...extraChoices]);
  };
};

interface CreateStaticResourceFiltersResolverParams {
  choices: GenericChoices;
}
export const createStaticResourceFiltersResolver = ({
  choices,
}: CreateStaticResourceFiltersResolverParams): ResourceResolver<
  ReturnType<typeof GenericChoicesSchema>
> => {
  return async () => {
    return GenericChoicesSchema().parse([...choices]);
  };
};

interface MergeResourceFiltersParams<
  TRegistry extends ResourceFiltersRegistry
> {
  label: string;
  /**
   * Use to replace the id of the Resource filters when there are no ids to automatically generate it.
   */
  idReplacer?: string;
  registry: TRegistry;
  resourceFiltersList: Filter<z.AnyZodObject>[];
}
export const mergeResourceFilters = <
  TRegistry extends ResourceFiltersRegistry
>({
  resourceFiltersList = [],
  label,
  idReplacer = "warning-no-id",
  registry,
}: MergeResourceFiltersParams<TRegistry>): Filter<z.AnyZodObject> => {
  const schema = resourceFiltersList.reduce(
    (acc, curr) => acc.extend(curr.schema.shape),
    z.object({})
  );

  const map = resourceFiltersList.reduce(
    (acc, curr) => ({ ...acc, ...curr.map }),
    {}
  );

  const resolver: Filter<z.AnyZodObject>["resolver"] = async (params) => {
    const choices = await Promise.all(
      resourceFiltersList.map((resourceFilter) =>
        resourceFilter.resolver(params)
      )
    );

    const choicesWithoutDuplicates = choices.reduce((acc, curr) => {
      const ids = acc.map((item) => item.key);
      return [...acc, ...curr.filter((item) => !ids.includes(item.key))];
    }, []);

    return GenericChoicesSchema().parse(choicesWithoutDuplicates);
  };
  const ids =
    resourceFiltersList
      .map((resourceFilter) => resourceFilter.id)
      ?.sort()
      ?.join("__") || idReplacer;

  return buildFilters({
    id: ids,
    label,
    schema,
    map,
    registry,
  })
    .addResolver(() => ({
      resolver,
    }))
    .build();
};

export const createResourceFiltersQueryKey = ({
  appId,
  moduleId,
  resourceId,
  filters,
}: ResourceFiltersQueryKey) => {
  const keys: ResourceQueryKey = { appId, moduleId, resourceId };
  return ["choices", keys, cleanEmptyObjectValues(filters)];
};

export interface ResourceFiltersPickerParams<
  TResourceFilters extends Filter<z.AnyZodObject>,
  TFilters extends Array<keyof z.infer<TResourceFilters["schema"]>>
> {
  resourceFilter: TResourceFilters;
  filters: TFilters;
}

export const resourceFiltersPicker = <
  TResourceFilters extends Filter<z.AnyZodObject>,
  TFilters extends Array<keyof z.infer<TResourceFilters["schema"]>>
>(
  params: ResourceFiltersPickerParams<TResourceFilters, TFilters>
): Filter<
  z.ZodObject<Pick<TResourceFilters["schema"]["shape"], TFilters[number]>>
> => {
  const schemaShape: Pick<
    TResourceFilters["schema"]["shape"],
    TFilters[number]
  > = params.filters.reduce((acc, filter) => {
    acc[filter] = params.resourceFilter.schema.shape[filter];
    return acc;
  }, {} as Pick<TResourceFilters["schema"]["shape"], TFilters[number]>);

  return {
    id: params.resourceFilter.id,
    label: params.resourceFilter.label,
    schema: z.object(schemaShape),
    map: params.filters.reduce((acc, filter) => {
      acc[filter] = params.resourceFilter.map[filter];
      return acc;
    }, {} as Record<TFilters[number], FilterType>),
    resolver: params.resourceFilter.resolver,
  };
};
