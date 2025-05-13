import { GenericChoicesSchema } from "@/commons/schemas/filters";
import { GenericFilterPayload } from "@/commons/typings";
import { FilterType } from "in-ui-react";
import { z } from "zod";
import { FilterSchema, IdAndLabel, SharedFilterSchema } from "../../types";
import { ResourceQueryKey, ResourceResolver } from "../types";

export interface ResourceFiltersRegistry {
  readonly filters: Filter<SharedFilterSchema>[];
  readonly registerFilter: (params: {
    filter: Filter<SharedFilterSchema>;
  }) => void;
}

export interface ResourceFiltersQueryKey extends ResourceQueryKey {
  filters: GenericFilterPayload;
}

export type AddFilterResolverCallback<TFilterSchema extends FilterSchema> =
  (params: {
    schema: TFilterSchema;
    map: Record<keyof z.infer<TFilterSchema>, FilterType>;
  }) => {
    resolver: ResourceResolver<ReturnType<typeof GenericChoicesSchema>>;
  };

export interface Filter<TSchema extends SharedFilterSchema> extends IdAndLabel {
  readonly schema: TSchema;
  readonly map: Record<keyof z.infer<TSchema>, FilterType>;
  readonly resolver: ResourceResolver<ReturnType<typeof GenericChoicesSchema>>;
}
