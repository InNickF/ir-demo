import { createModuleRegistry } from "@/commons/model-in";
import { eiApp } from "@/commons/registries/app";

export const investorModuleRegistry = createModuleRegistry({
  app: eiApp,
  id: "investor",
  label: "Investor",
});
