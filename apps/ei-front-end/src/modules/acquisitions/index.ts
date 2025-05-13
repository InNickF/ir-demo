import { createModuleRegistry } from "@/commons/model-in";
import { eiApp } from "@/commons/registries/app";

export const acqModuleRegistry = createModuleRegistry({
  app: eiApp,
  id: "acq",
  label: "Acquisition",
});
