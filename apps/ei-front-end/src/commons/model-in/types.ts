import { z } from "zod";
import { Preset } from "./configs/presets/types";
import { Config, ConfigSettingsSchema } from "./configs/types";

export interface IdObject {
  id: string;
}

export interface Labels {
  readonly label: string;
  readonly pluralLabel?: string;
}

export interface IdAndLabel extends IdObject, Pick<Labels, "label"> {}

export interface IdAndLabels extends IdObject, Labels {}

export interface BuildStep<T> {
  build: () => T;
}

export type ModelSchema = z.AnyZodObject;
export type DataResolverSchema = z.ZodType;
export type FilterSchema = z.AnyZodObject | null;
export type SharedFilterSchema = FilterSchema;
export type WidgetConfig<
  TConfigSettingsSchema extends ConfigSettingsSchema = ConfigSettingsSchema,
  TPresets extends Preset<TConfigSettingsSchema> = Preset<TConfigSettingsSchema>
> = Config<ConfigSettingsSchema, TPresets[]>;
