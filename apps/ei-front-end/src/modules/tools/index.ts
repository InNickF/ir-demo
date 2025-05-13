import { createModuleRegistry } from "@/commons/model-in";
import { eiApp } from "@/commons/registries/app";

export const toolsModuleRegistry = createModuleRegistry({
  app: eiApp,
  id: "tools",
  label: "Tools",
});
