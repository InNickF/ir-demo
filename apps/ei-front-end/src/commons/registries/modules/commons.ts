import { createModuleRegistry } from "@/commons/model-in";
import { eiApp } from "../app";

export const commonsModule = createModuleRegistry({
  id: "commons",
  label: "Commons",
  app: eiApp,
});
