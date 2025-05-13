import { z } from "zod";
import { IdAndLabel } from "../types";
import { Preset } from "./presets/types";

export interface AppContext {
  module: string;
  view: string;
}

export type ConfigSettingsSchema = z.ZodObject<{
  [key: string]: z.ZodDefault<z.ZodType>;
}>;

export interface Config<
  TConfigSettingsSchema extends ConfigSettingsSchema,
  TPresets extends Preset<TConfigSettingsSchema>[] = Preset<TConfigSettingsSchema>[]
> extends IdAndLabel {
  schema: TConfigSettingsSchema;
  presets: TPresets;
  Component: ConfigComponent<TConfigSettingsSchema>;
}

export type ConfigComponent<TSchema extends ConfigSettingsSchema> =
  React.ComponentType<ConfigComponentProps<TSchema>>;

export type SetSettingsAction<S> = S | ((prevState: S) => S);
export type Dispatch<S> = (value: SetSettingsAction<S>) => void;
export type SetSettings<T extends ConfigSettingsSchema = ConfigSettingsSchema> =
  Dispatch<z.infer<T>>;

export interface ConfigComponentProps<
  TConfigSchema extends ConfigSettingsSchema
> {
  isLoading?: boolean;
  isRefetching?: boolean;
  schema: TConfigSchema;
  presets: Preset<TConfigSchema>[];
  settings: z.infer<TConfigSchema>;
  setSettings: SetSettings<TConfigSchema>;
}

export interface HandlerVisibleConfigComponentProps {
  active: string;
  setActive: (id: string) => void;
  configs: IdAndLabel[];
}
export type HandlerVisibleConfigComponent =
  React.FC<HandlerVisibleConfigComponentProps>;

export interface CreateConfigGroupParams<
  TConfigs extends Config<
    ConfigSettingsSchema,
    Preset<ConfigSettingsSchema>[]
  >[]
> {
  readonly configs: TConfigs;
  HandlerVisibleConfigComponent?: HandlerVisibleConfigComponent;
}
