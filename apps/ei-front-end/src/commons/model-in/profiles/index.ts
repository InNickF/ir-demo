import { Module } from "../registries/types";
import { BuildStep } from "../types";
import { Profile } from "./types";

export interface CreateProfileParams extends Omit<Profile, "app" | "module"> {
  module: Module;
}
export const buildProfile = (
  params: CreateProfileParams
): BuildStep<Profile> => {
  const profile: Profile = {
    ...params,
    app: {
      id: params.module.app.id,
      label: params.module.app.label,
    },
    module: {
      id: params.module.id,
      label: params.module.label,
    },
  };
  params.module.registerProfile({ profile });
  return {
    build() {
      return profile;
    },
  };
};
