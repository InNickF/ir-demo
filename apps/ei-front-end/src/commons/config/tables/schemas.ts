import { z } from "zod";
import {
  getTableOrderInitialState,
  getTableVisibilityInitialState,
  TableOrderingState,
  TableVisibilityState,
} from "../../model-in/db/utils";
import { ModelSchema } from "../../model-in/types";
import { Size } from "in-ui-react";
import { inUISizes } from "@/commons/utils";

export interface CreateTableColumnsVisAndOrderWidgetConfigSchemaParams<
  TModelSchema extends ModelSchema
> {
  schema: TModelSchema;
  /**
   * The key to be displayed first on the table
   */
  entityLabelKey: keyof z.infer<TModelSchema>;
  /**
   * The key that represents the entity id
   */
  entityIdKey: keyof z.infer<TModelSchema>;
  /**
   * URL Page, a string that represents the URL to redirect when clicking on a row
   * if the string contains some text wrapped in curly braces, it will be replaced by the value of the key
   */
  urlRedirect?: string;
  keysToIgnore?: Array<keyof z.infer<TModelSchema>>;
  defaultOrdering?: TableOrderingState<TModelSchema>;
  defaultVisibility?: TableVisibilityState<TModelSchema>;
}
export const createTableColumnsVisAndOrderWidgetConfigSchema = <
  TModelSchema extends ModelSchema
>({
  schema,
  entityLabelKey,
  entityIdKey,
  keysToIgnore = [],
  defaultOrdering,
  defaultVisibility,
  urlRedirect = null,
}: CreateTableColumnsVisAndOrderWidgetConfigSchemaParams<TModelSchema>) => {
  const ignoredKeys = keysToIgnore;
  const allKeys = [
    entityLabelKey,
    ...Object.keys(schema.shape)
      .filter(
        (key) =>
          !ignoredKeys.includes(key as keyof z.infer<TModelSchema>) &&
          key !== entityLabelKey
      )
      .sort((a, b) => a.localeCompare(b)),
  ] as Array<keyof z.infer<TModelSchema>>;

  const visibility =
    defaultVisibility ||
    getTableVisibilityInitialState({
      schema,
      initialVisibility: allKeys,
      keysToIgnore: ignoredKeys,
    });

  const ordering =
    defaultOrdering ||
    getTableOrderInitialState({
      schema,
      initialOrder: allKeys,
      keysToIgnore: ignoredKeys,
    });

  return z.object({
    entityIdKey: z
      .string()
      .refine((key) => allKeys.includes(key as keyof z.infer<TModelSchema>))
      .default(entityIdKey as string),
    entityLabelKey: z
      .string()
      .refine((key) => allKeys.includes(key as keyof z.infer<TModelSchema>))
      .default(entityLabelKey as string),
    urlRedirect: z.string().nullable().default(urlRedirect),
    keysToIgnore: z
      .array(z.string())
      .refine((keys) => {
        return keys.every((key) => Object.keys(schema.shape).includes(key));
      })
      .default(() => keysToIgnore as string[]),
    columnOrdering: z
      .array(z.string())
      .nonempty()
      .refine((ordering) => {
        // Check if there are not invalid keys
        return ordering.every((key) => allKeys.includes(key));
      })
      .default(() => ordering as [string, ...string[]]),
    columnVisibility: z
      .record(z.boolean())
      .refine((vis) => {
        // Check if there are not invalid keys
        return Object.keys(vis).every((key) => allKeys.includes(key));
      })
      .default(() => visibility),
  });
};

export interface CreateLocalOrderingWidgetConfigSchemaParams<
  TModelSchema extends ModelSchema
> {
  schema: TModelSchema;
  initialKey: keyof z.infer<TModelSchema>;
}
export const createLocalOrderingWidgetConfigSchema = <
  TModelSchema extends ModelSchema
>(
  params: CreateLocalOrderingWidgetConfigSchemaParams<TModelSchema>
) => {
  return z.object({
    ordering: z.string().default(params.initialKey as string),
  });
};

export interface CreateLocalTablePaginationWidgetConfigSchemaParams {
  defaultItemsPerPage?: number;
}
export const createLocalTablePaginationWidgetConfigSchema = ({
  defaultItemsPerPage = 20,
}: CreateLocalTablePaginationWidgetConfigSchemaParams) =>
  z.object({
    itemsPerPage: z.number().default(defaultItemsPerPage),
  });

export interface CreateTableStylesWidgetConfigSchemaParams {
  spreadsheet?: boolean;
  size?: Size;
}
export const createArrayTableStylesWidgetConfigSchema = ({
  spreadsheet = true,
  size = "normal",
}: CreateTableStylesWidgetConfigSchemaParams) =>
  z.object({
    spreadsheet: z.boolean().default(spreadsheet),
    size: z.enum(inUISizes).default(size),
    showPresets: z.boolean().default(true),
  });

export const createTableWidgetConfigSchema = <TModelSchema extends ModelSchema>(
  params: CreateTableColumnsVisAndOrderWidgetConfigSchemaParams<TModelSchema>
) => {
  return createLocalTablePaginationWidgetConfigSchema({
    defaultItemsPerPage: 20,
  })
    .merge(
      createArrayTableStylesWidgetConfigSchema({
        size: "normal",
        spreadsheet: true,
      })
    )
    .merge(createTableColumnsVisAndOrderWidgetConfigSchema(params))
    .merge(
      createLocalOrderingWidgetConfigSchema({
        schema: params.schema,
        initialKey: params.entityLabelKey,
      })
    );
};
