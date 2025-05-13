/* eslint-disable @typescript-eslint/no-explicit-any */
import { Preset } from "./presets/types";
import { AppContext, ConfigSettingsSchema } from "./types";

export const getCurrentModuleAndPage = (): AppContext => {
  // Construct a URL from the current window location
  const fullUrl = new URL(window.location.href);

  // Extract the pathname and remove trailing slashes
  const trimmedPath = fullUrl.pathname.replace(/^\/+|\/+$/g, "");

  // Split the path by "/" into segments
  const segments = trimmedPath ? trimmedPath.split("/") : [];

  // Handle the root case: no segments
  if (segments.length === 0) {
    return { module: "root", view: "root" };
  }

  // Handle single-segment case: module only
  if (segments.length === 1) {
    return { module: segments[0], view: "root" };
  }

  // Otherwise, first segment is the module, the rest form the view
  const [module, ...rest] = segments;
  const view = rest.join("/");

  return { module, view };
};
export const mergePresetsByProfile = <T extends ConfigSettingsSchema>(params: {
  presets: Preset<T>[];
  schema: T;
}): Preset<T>[] => {
  // Group presets by profile id.
  const grouped = params.presets.reduce((acc, preset) => {
    const profileId = preset.profile.id;
    if (acc[profileId]) {
      acc[profileId].schema = params.schema;
      acc[profileId].settings = {
        ...acc[profileId].settings,
        ...preset.settings,
      };
    }
    if (!acc[profileId]) acc[profileId] = { ...preset, schema: params.schema };
    return acc;
  }, {} as Record<string, Preset<T>>);

  return Object.values(grouped).map((preset) => preset);
};
