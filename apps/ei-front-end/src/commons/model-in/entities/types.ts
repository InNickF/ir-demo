import { z } from "zod";
import { Formatter } from "../formatters/types";
import { ResourceFiltersRegistry } from "../resources/filters/types";
import { Resource } from "../resources/types";
import {
  BuildStep,
  DataResolverSchema,
  FilterSchema,
  IdAndLabel,
  IdAndLabels,
  ModelSchema,
  SharedFilterSchema,
} from "../types";
import { ModelRegistry } from "./models/types";

export interface EntitiesRegistry {
  readonly entities: Entity[];
  readonly registerEntity: (params: { entity: Entity }) => void;
}
export interface Entity<
  TSchema extends ModelSchema = ModelSchema,
  TResource extends Resource<
    DataResolverSchema,
    SharedFilterSchema,
    FilterSchema
  > = Resource<DataResolverSchema, SharedFilterSchema, FilterSchema>
> extends ModelRegistry,
    ResourceFiltersRegistry,
    IdAndLabels {
  readonly app: IdAndLabel;
  readonly module: IdAndLabel;
  readonly resource: TResource;
  readonly schema: TSchema;
  readonly formatter: Formatter<z.infer<TSchema>>;
  readonly idKey: keyof z.infer<TSchema>;
  readonly labelKey: keyof z.infer<TSchema>;
}

export type AddFormatterStepCallback<TSchema extends ModelSchema> = (params: {
  schema: TSchema;
}) => {
  formatter: Formatter<z.infer<TSchema>>;
};

export type AddEntityFormatterStep<
  TSchema extends ModelSchema,
  TResource extends Resource<
    DataResolverSchema,
    SharedFilterSchema,
    FilterSchema
  >
> = {
  addFormatters: (
    cb: AddFormatterStepCallback<TSchema>
  ) => BuildStep<Entity<TSchema, TResource>>;
};
