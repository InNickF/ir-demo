import { EntitiesRegistry } from "../entities/types";
import { ProfileRegister } from "../profiles/types";
import { ResourceFiltersRegistry } from "../resources/filters/types";
import { IdAndLabel } from "../types";

export interface ModuleRegistry {
  readonly modules: Module[];
  readonly registerModule: (params: { eiModule: Module }) => void;
}

export interface App extends ModuleRegistry, IdAndLabel {}

export interface Module
  extends EntitiesRegistry,
    ResourceFiltersRegistry,
    ProfileRegister,
    IdAndLabel {
  readonly app: IdAndLabel;
}
