import { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";
import { ConfigSettingsSchema, SetSettings } from "../configs/types";
import { ConfigurationsTableSchema } from "./tables";

/**
 *  Raw tables types
 */

export interface MetaDBTable<Schema extends z.AnyZodObject = z.AnyZodObject> {
  name: string;
  schema: Schema;
}

export type Configuration<
  TConfigSchema extends ConfigSettingsSchema = ConfigSettingsSchema
> = Omit<z.infer<typeof ConfigurationsTableSchema>, "settings"> & {
  settings: z.infer<TConfigSchema>;
};
/**
 * END Raw tables types
 */

export interface ConfigQueryReturn<
  T extends ConfigSettingsSchema = ConfigSettingsSchema
> {
  query: UseQueryResult<Configuration<T> | null, unknown>;
  queryKey: unknown[];
  setSettings: SetSettings<T>;
}

export interface ConfigsQueryReturn<> {
  query: UseQueryResult<Configuration[] | null, unknown>;
  queryKey: unknown[];
}
