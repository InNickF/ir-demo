import { createModuleRegistry } from "@/commons/model-in";
import { eiApp } from "@/commons/registries/app";

export const assetsModuleRegistry = createModuleRegistry({
  app: eiApp,
  id: "assets",
  label: "Assets",
});
