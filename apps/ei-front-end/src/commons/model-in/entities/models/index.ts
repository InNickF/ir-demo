import { addOrReplaceInRegistry } from "../../registries/utils";
import { Resource } from "../../resources/types";
import {
  DataResolverSchema,
  FilterSchema,
  IdAndLabels,
  ModelSchema,
  SharedFilterSchema,
} from "../../types";
import { Entity } from "../types";
import { AddFormatterStep, Model, ModelInformationOptions } from "./types";

interface BuildModelParams<
  TSchema extends ModelSchema,
  TResource extends Resource<
    DataResolverSchema,
    SharedFilterSchema,
    FilterSchema
  >
> extends Omit<
      ModelInformationOptions<TSchema>,
      "module" | "app" | "id" | "label" | "pluralLabel"
    >,
    Partial<IdAndLabels> {
  entity: Entity;
  resource: TResource;
}
export const buildModel = <
  TSchema extends ModelSchema,
  TResource extends Resource<
    DataResolverSchema,
    SharedFilterSchema,
    FilterSchema
  >
>({
  entity,
  schema,
  resource,
  ...params
}: BuildModelParams<TSchema, TResource>): AddFormatterStep<
  TSchema,
  TResource
> => {
  const addFormatterStep: AddFormatterStep<
    TSchema,
    TResource
  >["addFormatters"] = (callback) => {
    const { formatter } = callback({
      schema,
    });

    const id = params.id || resource.id;
    const label = params.label || resource.label;
    const pluralLabel = params.pluralLabel || resource.pluralLabel;

    return {
      build: () => {
        const model: Model<TSchema, typeof resource> = {
          id,
          label,
          pluralLabel,
          schema,
          app: {
            id: entity.app.id,
            label: entity.app.label,
          },
          module: {
            id: entity.module.id,
            label: entity.module.label,
          },
          entity: {
            id: entity.id,
            label: entity.label,
            pluralLabel: entity.pluralLabel,
          },
          formatter,
          resource,
          widgets: [],
          registerWidget({ widget }) {
            addOrReplaceInRegistry(model.widgets, widget);
          },
        };
        entity.registerModel({ model });
        return model;
      },
    };
  };
  return {
    addFormatters: addFormatterStep,
  };
};
