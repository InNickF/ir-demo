import { createModuleRegistry } from "@/commons/model-in";
import { eiApp } from "@/commons/registries/app";

export const dispositionsModuleRegistry = createModuleRegistry({
  app: eiApp,
  id: "dispositions",
  label: "Dispositions",
});
