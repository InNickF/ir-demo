import { GenericFilterPayload } from "@/commons/typings";
import { z } from "zod";
import {
  BuildStep,
  DataResolverSchema,
  FilterSchema,
  IdAndLabels,
  SharedFilterSchema,
} from "../types";
import { Filter } from "./filters/types";

export interface ResourceQueryKey {
  appId?: string;
  moduleId?: string;
  entityId?: string;
  resourceId: string;
}

export interface ResourceResolverParams<TFilters extends GenericFilterPayload> {
  filters?: TFilters;
}
export type ResourceResolver<
  TData extends DataResolverSchema,
  TFilters extends GenericFilterPayload = GenericFilterPayload
> = (params: ResourceResolverParams<TFilters>) => Promise<z.infer<TData>>;

export interface BaseResource<
  TSchema extends DataResolverSchema,
  TSharedFilterSchema extends SharedFilterSchema,
  TFilterSchema extends FilterSchema
> extends IdAndLabels {
  readonly schema: TSchema;
  readonly sharedFilters?: Filter<TSharedFilterSchema>;
  readonly filters?: Filter<TFilterSchema>;
  readonly staticFilters?: Partial<z.infer<TSharedFilterSchema>> &
    Partial<z.infer<TFilterSchema>> &
    GenericFilterPayload;
}

export interface Resource<
  TSchema extends DataResolverSchema,
  TSharedFilterSchema extends SharedFilterSchema,
  TFilterSchema extends FilterSchema
> extends BaseResource<TSchema, TSharedFilterSchema, TFilterSchema> {
  resolver: ResourceResolver<
    z.infer<TSchema>,
    z.infer<TSharedFilterSchema> & z.infer<TFilterSchema>
  >;
}

export type BuildResourceParams<
  TSchema extends DataResolverSchema,
  TSharedFilterSchema extends SharedFilterSchema,
  TFilterSchema extends FilterSchema
> = BaseResource<TSchema, TSharedFilterSchema, TFilterSchema>;

export type AddResolverCallback<
  TSchema extends DataResolverSchema,
  TSharedFilterSchema extends SharedFilterSchema,
  TFilterSchema extends FilterSchema
> = (
  baseResource: BaseResource<TSchema, TSharedFilterSchema, TFilterSchema>
) => {
  resolver: ResourceResolver<
    z.infer<TSchema>,
    z.infer<TSharedFilterSchema> & z.infer<TFilterSchema>
  >;
};

export type AddResolverModCallback<
  TSchema extends DataResolverSchema,
  TSharedFilterSchema extends SharedFilterSchema,
  TFilterSchema extends FilterSchema
> = (params: {
  data: unknown;
  schema: TSchema;
  filters: z.infer<TSharedFilterSchema>;
  sharedFiltersSchema: TSharedFilterSchema;
  filtersSchema: TFilterSchema;
}) => z.infer<TSchema>;

export type AddResourceResolverStep<
  TSchema extends DataResolverSchema,
  TSharedFilterSchema extends SharedFilterSchema,
  TFilterSchema extends FilterSchema
> = {
  addResolver: (
    callback: AddResolverCallback<TSchema, TSharedFilterSchema, TFilterSchema>
  ) => BuildStep<Resource<TSchema, TSharedFilterSchema, TFilterSchema>>;
};
