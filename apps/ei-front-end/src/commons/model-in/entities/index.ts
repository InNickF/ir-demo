import { z } from "zod";
import { Module } from "../registries/types";
import { addOrReplaceInRegistry } from "../registries/utils";
import { Resource } from "../resources/types";
import {
  DataResolverSchema,
  FilterSchema,
  IdAndLabels,
  ModelSchema,
  SharedFilterSchema,
} from "../types";
import { AddEntityFormatterStep, Entity } from "./types";

export interface BuildEntitiesRegistryParams<
  TSchema extends ModelSchema,
  TResource extends Resource<
    DataResolverSchema,
    SharedFilterSchema,
    FilterSchema
  >
> extends Partial<IdAndLabels> {
  module?: Module;
  idKey: keyof z.infer<TSchema>;
  labelKey: keyof z.infer<TSchema>;
  schema: TSchema;
  resource: TResource;
}
export const buildEntity = <
  TSchema extends ModelSchema,
  TResource extends Resource<
    DataResolverSchema,
    SharedFilterSchema,
    FilterSchema
  >
>({
  idKey,
  labelKey,
  schema,
  resource,
  module: m, // Avoid Next.js conflict with module keyword
  ...params
}: BuildEntitiesRegistryParams<TSchema, TResource>): AddEntityFormatterStep<
  TSchema,
  TResource
> => {
  const id = params.id || resource.id;
  const label = params.label || resource.label;
  const pluralLabel = params.pluralLabel || resource.pluralLabel;

  const addFormatterCallback: AddEntityFormatterStep<
    TSchema,
    TResource
  >["addFormatters"] = (cb) => {
    const { formatter } = cb({ schema });
    const entity: Entity<TSchema, TResource> = {
      id,
      label,
      pluralLabel,
      idKey,
      labelKey,
      schema,
      formatter,
      app: {
        id: m.app.id,
        label: m.app.label,
      },
      module: {
        id: m.id,
        label: m.label,
      },
      resource,
      filters: [],
      registerFilter({ filter }) {
        addOrReplaceInRegistry(entity.filters, filter);
      },
      models: [],
      registerModel({ model }) {
        addOrReplaceInRegistry(entity.models, model);
      },
    };
    return {
      build: () => {
        m?.registerEntity({ entity: entity as unknown as Entity });
        return entity;
      },
    };
  };

  return {
    addFormatters: addFormatterCallback,
  };
};
