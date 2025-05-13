import { z } from "zod";
import { ConfigurationsTableSchema } from "./tables";
interface DBConfigSchemaParams<TConfigSchema extends z.AnyZodObject> {
  configSchema: TConfigSchema;
}

export const ConfigurationsSchema = <T extends z.AnyZodObject>({
  configSchema,
}: DBConfigSchemaParams<T>) => {
  return ConfigurationsTableSchema.extend({
    config: configSchema,
  });
};
