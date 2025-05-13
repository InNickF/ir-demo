import { z } from "zod";
import { BuildStep, FilterSchema } from "../../types";
import {
  AddFilterResolverCallback,
  Filter,
  ResourceFiltersRegistry,
} from "./types";

interface BuildFiltersParams<
  TSchema extends FilterSchema,
  TRegistry extends ResourceFiltersRegistry
> extends Omit<Filter<TSchema>, "resolver"> {
  registry?: TRegistry;
}
export type AddFilterResolverStep<TSchema extends FilterSchema> = {
  addResolver: (
    callback: AddFilterResolverCallback<TSchema>
  ) => BuildStep<Filter<TSchema>>;
};

export const buildFilters = <
  TSchema extends z.AnyZodObject,
  TRegistry extends ResourceFiltersRegistry
>({
  registry,
  ...restFilter
}: BuildFiltersParams<TSchema, TRegistry>): AddFilterResolverStep<TSchema> => {
  const addResolverStep: AddFilterResolverStep<TSchema>["addResolver"] = (
    callback
  ) => {
    const { resolver } = callback({ ...restFilter });
    const filter: Filter<TSchema> = {
      ...restFilter,
      resolver,
    };
    return {
      build: () => {
        registry?.registerFilter({ filter });
        return filter;
      },
    };
  };

  return { addResolver: addResolverStep };
};
