import { createModuleRegistry } from "@/commons/model-in";
import { eiApp } from "@/commons/registries/app";

export const insightModuleRegistry = createModuleRegistry({
  app: eiApp,
  id: "insight",
  label: "Insight",
});
