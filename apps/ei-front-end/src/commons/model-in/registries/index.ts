import { IdAndLabel } from "../types";
import { App, Module } from "./types";
import { addOrReplaceInRegistry } from "./utils";

export const createAppRegistry = ({
  id,
  label,
}: Pick<App, "id" | "label">): App => {
  const app: App = {
    id,
    label,
    modules: [],
    registerModule({ eiModule }) {
      addOrReplaceInRegistry(app.modules, eiModule);
    },
  };
  return app;
};

interface CreateModuleRegistryParams extends IdAndLabel {
  app?: App;
}
export const createModuleRegistry = ({
  id,
  label,
  app,
}: CreateModuleRegistryParams): Module => {
  const eiModule: Module = {
    id,
    label,
    app: {
      id: app.id,
      label: app.label,
    },
    entities: [],
    registerEntity({ entity }) {
      addOrReplaceInRegistry(eiModule.entities, entity);
    },
    filters: [],
    registerFilter({ filter }) {
      addOrReplaceInRegistry(eiModule.filters, filter);
    },
    profiles: [],
    registerProfile({ profile }) {
      addOrReplaceInRegistry(eiModule.profiles, profile);
    },
  };
  app?.registerModule({ eiModule });
  return eiModule;
};
