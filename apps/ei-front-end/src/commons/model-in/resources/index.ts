import { DataResolverSchema, FilterSchema, SharedFilterSchema } from "../types";
import {
  AddResourceResolverStep,
  BuildResourceParams,
  Resource,
} from "./types";

export const buildResource = <
  TSchema extends DataResolverSchema,
  TSharedFilterSchema extends SharedFilterSchema,
  TFilterSchema extends FilterSchema = null
>(
  params: BuildResourceParams<TSchema, TSharedFilterSchema, TFilterSchema>
): AddResourceResolverStep<TSchema, TSharedFilterSchema, TFilterSchema> => {
  const addResolverStep: AddResourceResolverStep<
    TSchema,
    TSharedFilterSchema,
    TFilterSchema
  >["addResolver"] = (callback) => {
    const { resolver } = callback({
      ...params,
    });
    const resource: Resource<TSchema, TSharedFilterSchema, TFilterSchema> = {
      ...params,
      resolver,
    };
    return {
      build: () => resource,
    };
  };
  return { addResolver: addResolverStep };
};
