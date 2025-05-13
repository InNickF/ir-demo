import { createModuleRegistry } from "@/commons/model-in";
import { eiApp } from "@/commons/registries/app";

export const debtModuleRegistry = createModuleRegistry({
  app: eiApp,
  id: "debt",
  label: "Debt",
});
