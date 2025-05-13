import { createModuleRegistry } from "@/commons/model-in";
import { eiApp } from "@/commons/registries/app";

export const labModuleRegistry = createModuleRegistry({
  app: eiApp,
  id: "lab",
  label: "Lab",
});
