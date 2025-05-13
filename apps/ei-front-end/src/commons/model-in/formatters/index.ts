import {
  Formatter,
  FormatterReturnType,
  HeaderFormatter,
  HeaderFormatterMap,
  MapFormatter,
  ValueFormatter,
} from "@/commons/model-in/formatters/types";
import { z } from "zod";
import { ModelSchema } from "../types";
import { createSorterMap, SorterMap } from "./sorters";
import {
  convertToTitleCase,
  genericGetValue,
  humanizeSnakeCase,
} from "./utils";

export interface GenericFormatterParseFnParams<TEntity> {
  key: keyof TEntity;
  value: TEntity[keyof TEntity];
  original?: TEntity;
  map: MapFormatter<TEntity>;
}
export const genericFormatterParseFn = <TEntity>({
  key,
  value,
  original,
  map,
}: GenericFormatterParseFnParams<TEntity>): FormatterReturnType => {
  const formatter = map?.[key];
  const trimmedValue = typeof value === "string" ? value?.trim() : value;
  return formatter
    ? formatter({ value: trimmedValue as TEntity[keyof TEntity], original })
    : { value: String(genericGetValue(value)) };
};

export const createValueFormatter = <TEntity extends ModelSchema>({
  map,
}: {
  schema: TEntity;
  map: MapFormatter<z.infer<TEntity>>;
}): ValueFormatter<z.infer<TEntity>> => ({
  map,
  format({ key, value, original }) {
    return genericFormatterParseFn({ key, value, original, map: this.map });
  },
});

export const createHeaderFormatter = <TSchema extends ModelSchema>({
  schema: TSchema,
  map = {} as Partial<Record<keyof TSchema, FormatterReturnType>>,
}: {
  schema: TSchema;
  map?: Partial<Record<keyof z.infer<TSchema>, FormatterReturnType>>;
}): HeaderFormatter<z.infer<typeof TSchema>> => {
  const mapping: Record<keyof TSchema, FormatterReturnType> = Object.keys(
    TSchema.shape
  ).reduce(
    (acc, key) => ({
      ...acc,
      [key]: { value: convertToTitleCase(humanizeSnakeCase(String(key))) },
    }),
    {} as Record<keyof TSchema, FormatterReturnType>
  );
  const finalMap = {
    ...mapping,
    ...map,
  };
  const format = ({ key }: { key: keyof TSchema }) => finalMap[key];
  return {
    map: finalMap,
    format,
  };
};

interface CreateFormatterParams<TSchema extends ModelSchema> {
  schema: TSchema;
  valueMap: MapFormatter<z.infer<TSchema>>;
  headerMap?: HeaderFormatterMap<z.infer<TSchema>>;
  sorterMap?: SorterMap<z.infer<TSchema>>;
}
export const createFormatter = <TSchema extends ModelSchema>({
  schema,
  valueMap,
  headerMap,
  sorterMap,
}: CreateFormatterParams<TSchema>): Formatter<z.infer<TSchema>> => {
  const value = createValueFormatter({ schema, map: valueMap });
  const header = createHeaderFormatter({ schema, map: headerMap });
  const sorter = createSorterMap({ schema, map: sorterMap });
  return {
    value,
    header,
    sorter,
  };
};
