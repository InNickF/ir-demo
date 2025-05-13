import { z } from "zod";
import { Profile } from "../../profiles/types";
import { IdAndLabel } from "../../types";
import { ConfigSettingsSchema } from "../types";

export interface Preset<TConfigSettingsSchema extends ConfigSettingsSchema>
  extends IdAndLabel {
  app: IdAndLabel;
  module: IdAndLabel;
  profile: Pick<Profile, "id" | "label" | "description">;
  schema: TConfigSettingsSchema;
  settings: Partial<z.infer<TConfigSettingsSchema>>;
}
