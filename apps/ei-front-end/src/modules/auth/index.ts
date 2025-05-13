import { createModuleRegistry } from "@/commons/model-in";
import { eiApp } from "@/commons/registries/app";

export const authModuleRegistry = createModuleRegistry({
  app: eiApp,
  id: "auth",
  label: "Auth",
});
