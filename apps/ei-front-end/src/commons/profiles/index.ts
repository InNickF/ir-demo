import { buildProfile } from "../model-in/profiles";
import { commonsModule } from "../registries/modules/commons";

export const defaultProfile = buildProfile({
  id: "default",
  label: "Default",
  module: commonsModule,
}).build();
