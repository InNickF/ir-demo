import { z } from "zod";
import { ModelSchema } from "../types";
import { MetaDBTable } from "./types";

/**
 * @interface DexieTablesGeneratorParams
 *
 * Parameters for generating Dexie table definitions and related typing information.
 *
 * @template T An array of MetaDBTable objects. Each MetaDBTable describes a database table's schema.
 *
 * @property tableSchemas The array of MetaDBTable objects that define the database tables' schemas.
 * @property idKey (Optional) The name of the primary key column. Defaults to "id".
 * @property idType (Optional) Defines how the primary key is generated:
 *  - "uuid": Each new record gets a UUID as its primary key.
 *  - "increment": Each new record gets an auto-incremented primary key.
 * Defaults to "uuid".
 */
export interface DexieTablesGeneratorParams<T extends readonly MetaDBTable[]> {
  tableSchemas: T;
  idKey?: string;
  idType?: "uuid" | "increment";
}

/**
 * @function dexieTablesGenerator
 *
 * Generates an object containing:
 * 1. `tablesDef`: A Record mapping each table name to a Dexie key definition string.
 *    This string defines how primary keys and indexes are defined for that table.
 * 2. `tableSchemas`: Simply returns the original array of tableSchemas passed in.
 * 3. `tablesDexieTypes`: A Record mapping each table name to its Zod schema, preserving type information.
 *
 * Dexie is a wrapper around IndexedDB, and it requires a definition string for each table that specifies
 * which key is the primary key (marked with `&` for UUID or `++` for increment), and which fields are indexed.
 *
 * @template T Extends MetaDBTable[], the array of table definitions.
 *
 * @param params.tableSchemas An array of MetaDBTable objects describing each table’s schema.
 * @param params.idKey (Optional) The primary key field name. Default: "id".
 * @param params.idType (Optional) The type of the primary key: "uuid" or "increment". Default: "uuid".
 *
 * @returns An object containing:
 *  - `tablesDef`: An object with keys as table names and values as Dexie definition strings.
 *  - `tableSchemas`: The original array of tableSchemas.
 *  - `tablesDexieTypes`: An object mapping table names to their respective Zod schemas.
 */
export function dexieTablesGenerator<T extends readonly MetaDBTable[]>({
  tableSchemas,
  idKey = "id",
  idType = "uuid",
}: DexieTablesGeneratorParams<T>): {
  tablesDef: Record<T[number]["name"], string>;
  tableSchemas: T;
  tablesDexieTypes: {
    [K in T[number]["name"]]: T[number]["schema"];
  };
} {
  type Keys = string[];
  const restOfColumns = (keys: Keys) =>
    keys.filter((key) => key !== idKey).join(", ");

  const columnsModMap: Record<
    DexieTablesGeneratorParams<T>["idType"],
    (keys: Keys) => string
  > = {
    uuid: (keys) => `&${idKey}, ${restOfColumns(keys)}`,
    increment: (keys) => `++${idKey}, ${restOfColumns(keys)}`,
  };

  return {
    tableSchemas,
    tablesDef: tableSchemas.reduce((acc, { name, schema }) => {
      const keys = Object.keys(schema.shape);
      const columns = columnsModMap[idType](keys);
      return {
        ...acc,
        [name]: columns,
      };
    }, {} as Record<T[number]["name"], string>),
    tablesDexieTypes: tableSchemas.reduce((acc, { name, schema }) => {
      return {
        ...acc,
        [name]: schema,
      };
    }, {} as { [K in T[number]["name"]]: T[number]["schema"] }),
  };
}

export const parseStringSettingsToObject = <T extends { settings: unknown }>(
  config: T
): T => ({
  ...config,
  settings: config ? JSON.parse(config?.settings as string) : null,
});
export type TableVisibilityState<TSchema extends ModelSchema> = {
  [K in keyof z.infer<TSchema>]?: boolean;
};
export type TableOrderingState<TSchema extends ModelSchema> = Array<
  keyof z.infer<TSchema>
>;

export interface GetTableVisibilityInitialStateParams<
  TSchema extends ModelSchema
> {
  schema: TSchema;
  initialVisibility?: Array<keyof z.infer<TSchema>>;
  keysToIgnore?: Array<keyof z.infer<TSchema>>;
}
export const getTableVisibilityInitialState = <TSchema extends ModelSchema>({
  schema,
  initialVisibility = [],
  keysToIgnore = [],
}: GetTableVisibilityInitialStateParams<TSchema>): TableVisibilityState<
  typeof schema
> => {
  return {
    ...Object.keys(schema.shape).reduce((acc, key) => {
      if (keysToIgnore.includes(key as keyof z.infer<TSchema>)) {
        return acc;
      }
      if (!initialVisibility.length) {
        acc[key as keyof z.infer<TSchema>] = true;
        return acc;
      }
      acc[key as keyof z.infer<TSchema>] = initialVisibility.includes(
        key as keyof z.infer<TSchema>
      );
      return acc;
    }, {} as TableVisibilityState<typeof schema>),
  };
};
export interface GetTableOrderInitialStateParams<TSchema extends ModelSchema> {
  schema: TSchema;
  initialOrder?: Array<keyof z.infer<TSchema>>;
  keysToIgnore?: Array<keyof z.infer<TSchema>>;
}
export const getTableOrderInitialState = <TSchema extends ModelSchema>({
  schema,
  initialOrder = [],
  keysToIgnore = [],
}: GetTableOrderInitialStateParams<TSchema>): TableOrderingState<
  typeof schema
> => {
  const restOfKeys = Object.keys(schema.shape).filter(
    (key) =>
      !initialOrder.includes(key as keyof z.infer<TSchema>) &&
      !keysToIgnore.includes(key as keyof z.infer<TSchema>)
  ) as Array<keyof z.infer<TSchema>>;

  return [...initialOrder, ...restOfKeys];
};
