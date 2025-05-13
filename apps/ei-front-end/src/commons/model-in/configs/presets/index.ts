import { z } from "zod";
import { Profile } from "../../profiles/types";
import { BuildStep } from "../../types";
import { ConfigSettingsSchema } from "../types";
import { Preset } from "./types";

interface BuildPresetParams<
  TProfile extends Profile,
  TSchema extends ConfigSettingsSchema
> {
  profile: TProfile;
  schema: TSchema;
}
type AddPresetValueFn<TSchema extends ConfigSettingsSchema> = (
  value: z.infer<TSchema>
) => BuildStep<Preset<TSchema>>;

interface AddPresetValueStep<TSchema extends ConfigSettingsSchema> {
  addValue: AddPresetValueFn<TSchema>;
}

export const buildPreset = <
  TProfile extends Profile,
  TSchema extends ConfigSettingsSchema
>(
  params: BuildPresetParams<TProfile, TSchema>
): AddPresetValueStep<TSchema> => {
  const ids = [
    params.profile.id,
    params.profile.app.id,
    params.profile.module.id,
  ];
  const separator = "__";
  const preset: Omit<Preset<TSchema>, "settings"> = {
    id: ids.join(separator),
    label: params.profile.label,
    app: {
      id: params.profile.app.id,
      label: params.profile.app.label,
    },
    module: {
      id: params.profile.module.id,
      label: params.profile.module.label,
    },
    profile: {
      id: params.profile.id,
      label: params.profile.label,
      description: params.profile.description,
    },
    schema: params.schema,
  };
  return {
    addValue(value: z.infer<TSchema>) {
      return {
        build() {
          return {
            ...preset,
            settings: value,
          };
        },
      };
    },
  };
};

interface CreateBulkPresetsParams<TSchema extends ConfigSettingsSchema> {
  schema: TSchema;
  presets: {
    settings: Pick<Preset<TSchema>, "settings">;
    profile: Profile;
  }[];
}

export const createBulkPresets = <TSchema extends ConfigSettingsSchema>(
  params: CreateBulkPresetsParams<TSchema>
): BuildStep<Preset<TSchema>[]> => {
  const buildSteps = params.presets.map((preset) => {
    const buildPresetParams: BuildPresetParams<Profile, TSchema> = {
      profile: preset.profile,
      schema: params.schema,
    };
    return buildPreset(buildPresetParams).addValue(preset.settings);
  });
  return {
    build() {
      return buildSteps.map((step) => step.build());
    },
  };
};
