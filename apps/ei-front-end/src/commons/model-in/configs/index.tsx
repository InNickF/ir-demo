import { useState } from "react";
import { z } from "zod";
import { Profile } from "../profiles/types";
import { ConfigsGrid } from "./components/ConfigsGrid";
import { buildPreset } from "./presets";
import { Preset } from "./presets/types";
import {
  Config,
  ConfigComponent,
  ConfigComponentProps,
  ConfigSettingsSchema,
  CreateConfigGroupParams,
} from "./types";
import { mergePresetsByProfile } from "./utils";

class ConfigBuilder<
  TConfigSchema extends ConfigSettingsSchema,
  TPresets extends Preset<TConfigSchema>[]
> {
  private actual: Config<TConfigSchema, TPresets>;
  constructor(actual: Config<TConfigSchema, TPresets>) {
    this.actual = actual;
  }

  withPresets<TNewPresets extends Preset<TConfigSchema>[]>(
    callback: (params: { schema: TConfigSchema }) => TNewPresets
  ): ConfigBuilder<TConfigSchema, [...TPresets, ...TNewPresets]> {
    const newPresets = callback({ schema: this.actual.schema });
    return new ConfigBuilder({
      ...this.actual,
      presets: [...this.actual.presets, ...newPresets] as [
        ...TPresets,
        ...TNewPresets
      ],
    });
  }

  build(): Config<TConfigSchema, TPresets> {
    return this.actual;
  }
}

export const buildConfig = <TConfigSchema extends ConfigSettingsSchema>({
  id,
  label,
  schema,
  Component,
}: Omit<Config<TConfigSchema, []>, "presets">) => {
  return new ConfigBuilder({
    id,
    label,
    schema,
    Component,
    presets: [],
  });
};

interface BuildConfigWithDefaultPresetParams<
  TConfigSchema extends ConfigSettingsSchema
> extends Omit<Config<TConfigSchema, []>, "presets"> {
  profile: Profile;
}
export const buildConfigWithDefaultPreset = <
  TConfigSchema extends ConfigSettingsSchema
>({
  id,
  label,
  schema,
  Component,
  profile,
}: BuildConfigWithDefaultPresetParams<TConfigSchema>) => {
  const defaultPreset = buildPreset({
    profile,
    schema,
  })
    .addValue(schema.parse({}))
    .build();

  return new ConfigBuilder({
    id,
    label,
    schema,
    Component,
    presets: [defaultPreset],
  });
};

export const buildConfigGroup = <
  TConfigs extends Config<
    ConfigSettingsSchema,
    Preset<ConfigSettingsSchema>[]
  >[]
>({
  configs,
  HandlerVisibleConfigComponent,
}: CreateConfigGroupParams<TConfigs>) => {
  type UnionToIntersection<U> =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (U extends any ? (x: U) => void : never) extends (x: infer I) => void
      ? I
      : never;

  const newSchema = configs.reduce((acc, config) => {
    return acc.merge(config.schema);
  }, z.object({})) as z.ZodObject<
    UnionToIntersection<typeof configs[number]["schema"]["shape"]> &
      ConfigSettingsSchema["shape"]
  >;

  const id = configs.map((config) => config.id).join("__");
  const configsWithComponent = configs.filter((config) => !!config.Component);

  const label = configsWithComponent.map((config) => config.label).join(" & ");

  const allPresets = configs.map((config) => config.presets).flat();
  const newPresets = mergePresetsByProfile({
    schema: newSchema,
    presets: allPresets as Preset<typeof newSchema>[],
  });

  const configBuilder = buildConfig({
    id,
    label,
    schema: newSchema,
    Component: (props) => {
      const [active, setActive] = useState(configsWithComponent[0]?.id || null);
      return (
        <ConfigsGrid>
          {HandlerVisibleConfigComponent ? (
            <HandlerVisibleConfigComponent
              active={active}
              setActive={setActive}
              configs={configsWithComponent.map((config) => ({
                id: config.id,
                label: config.label,
              }))}
            />
          ) : null}
          {configsWithComponent
            .filter((config) => config.id === active)
            .map((config, index) => {
              const Component =
                config.Component as ConfigComponent<ConfigSettingsSchema>;

              return (
                <Component
                  key={index}
                  {...(props as ConfigComponentProps<ConfigSettingsSchema>)}
                />
              );
            })}
        </ConfigsGrid>
      );
    },
  }).withPresets(() => newPresets);

  return configBuilder;
};
