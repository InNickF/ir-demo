import { Formatter } from "@/commons/model-in/formatters/types";
import { z } from "zod";
import {
  AddResolverCallback,
  BuildResourceParams,
  Resource,
} from "../../resources/types";
import {
  BuildStep,
  DataResolverSchema,
  FilterSchema,
  IdAndLabel,
  IdAndLabels,
  ModelSchema,
  SharedFilterSchema,
} from "../../types";
import { WidgetRegistry } from "../../widgets/types";

export interface ModelRegistry {
  readonly models: Model<
    ModelSchema,
    Resource<DataResolverSchema, SharedFilterSchema, FilterSchema>
  >[];
  readonly registerModel: (params: {
    model: Model<
      ModelSchema,
      Resource<DataResolverSchema, SharedFilterSchema, FilterSchema>
    >;
  }) => void;
}

export interface Model<
  TSchema extends ModelSchema,
  TResource extends Resource<
    DataResolverSchema,
    SharedFilterSchema,
    FilterSchema
  >
> extends ModelInformationOptions<TSchema>,
    WidgetRegistry<TResource["sharedFilters"]["schema"]> {
  formatter: Formatter<z.infer<TSchema>>;
  readonly resource: TResource;
}
export interface ModelInformationOptions<TSchema extends ModelSchema>
  extends IdAndLabels {
  readonly app: IdAndLabel;
  readonly module: IdAndLabel;
  readonly entity: IdAndLabels;
  readonly schema: TSchema;
}
export type AddResourceStepParams<
  TSchema extends DataResolverSchema,
  TSharedFilterSchema extends SharedFilterSchema,
  TFilterSchema extends FilterSchema = null
> = Omit<
  BuildResourceParams<TSchema, TSharedFilterSchema, TFilterSchema>,
  "id" | "label" | "pluralLabel" | "resolverSchema"
> & {
  resolver: AddResolverCallback<TSchema, TSharedFilterSchema, TFilterSchema>;
};

export type AddFormatterStepCallback<TSchema extends ModelSchema> = (params: {
  schema: TSchema;
}) => {
  formatter: Formatter<z.infer<TSchema>>;
};

export type AddFormatterStep<
  TSchema extends ModelSchema,
  TResource extends Resource<
    DataResolverSchema,
    SharedFilterSchema,
    FilterSchema
  >
> = {
  addFormatters: (
    cb: AddFormatterStepCallback<TSchema>
  ) => BuildStep<Model<TSchema, TResource>>;
};
